import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { normalizeConfig, shouldShowSkipControls, type LuxeMediaCardConfig, type NormalizedLuxeMediaCardConfig } from './config';
import './luxe-media-card-editor';
import {
  MEDIA_PLAYER_SUPPORT_NEXT_TRACK,
  MEDIA_PLAYER_SUPPORT_PREVIOUS_TRACK
} from './media-player-support';
import type { HassEntity, HomeAssistant } from './types';

const HEIGHT_CLASS_MAP: Record<NormalizedLuxeMediaCardConfig['height'], string> = {
  flat: 'height-flat',
  compact: 'height-compact',
  comfortable: 'height-comfortable',
  tall: 'height-tall'
};

@customElement('luxe-media-card')
export class LuxeMediaCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: NormalizedLuxeMediaCardConfig;

  public setConfig(config: LuxeMediaCardConfig): void {
    this._config = normalizeConfig(config);
  }

  public getCardSize(): number {
    if (!this._config) return 3;
    return this._config.height === 'flat' ? 2 : this._config.height === 'compact' ? 3 : this._config.height === 'comfortable' ? 4 : 5;
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement('luxe-media-card-editor');
  }

  public static getStubConfig(): LuxeMediaCardConfig {
    return {
      entity: 'media_player.example',
      height: 'compact',
      show_skip_controls: true
    };
  }

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    const entity = this.hass.states[this._config.entity];
    if (!entity) {
      return html`<ha-card><div class="missing">Entity not found: ${this._config.entity}</div></ha-card>`;
    }

    const title = this.#getTitle(entity);
    const artist = this.#getArtist(entity);
    const artwork = entity.attributes.entity_picture as string | undefined | null;
    const state = entity.state;
    const supportedFeatures = Number(entity.attributes.supported_features ?? 0);
    const canShowSkip = shouldShowSkipControls(this._config.show_skip_controls, supportedFeatures);
    const hasPrevious = (supportedFeatures & MEDIA_PLAYER_SUPPORT_PREVIOUS_TRACK) !== 0;
    const hasNext = (supportedFeatures & MEDIA_PLAYER_SUPPORT_NEXT_TRACK) !== 0;
    const playPauseLabel = state === 'playing' ? 'Pause' : 'Play';

    return html`
      <ha-card>
        <div class="card ${HEIGHT_CLASS_MAP[this._config.height]}">
          <div class="artwork-shell" data-testid="artwork-shell">
            ${artwork
              ? html`<img data-testid="artwork" class="artwork" src="${artwork}" alt="Album artwork" />`
              : html`<div data-testid="placeholder" class="placeholder" aria-label="No artwork available">♪</div>`}
          </div>

          <div class="content">
            <div class="meta">
              <div data-testid="title" class="title">${title}</div>
              <div data-testid="artist" class="artist">${artist}</div>
            </div>

            <div class="controls">
              ${canShowSkip && hasPrevious
                ? html`<button data-testid="previous-button" class="icon-button" @click=${() => this.#callMediaService('media_previous_track')} aria-label="Previous track">⏮</button>`
                : nothing}
              <button data-testid="play-pause-button" class="icon-button primary" @click=${() => this.#callMediaService('media_play_pause')} aria-label=${playPauseLabel}>${state === 'playing' ? '⏸' : '▶'}</button>
              ${canShowSkip && hasNext
                ? html`<button data-testid="next-button" class="icon-button" @click=${() => this.#callMediaService('media_next_track')} aria-label="Next track">⏭</button>`
                : nothing}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  #callMediaService(service: string): void {
    if (!this.hass || !this._config) {
      return;
    }

    this.hass.callService('media_player', service, {
      entity_id: this._config.entity
    });
  }

  #getTitle(entity: HassEntity): string {
    return (entity.attributes.media_title as string | undefined | null) || (entity.attributes.friendly_name as string) || entity.entity_id;
  }

  #getArtist(entity: HassEntity): string {
    return (entity.attributes.media_artist as string | undefined | null) || entity.state;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 20px;
    }

    .card {
      display: grid;
      grid-template-columns: minmax(96px, 34%) 1fr;
      gap: 0;
      background: linear-gradient(135deg, rgba(20, 24, 32, 0.92), rgba(36, 44, 58, 0.95));
      color: white;
    }

    .height-flat { min-height: 120px; }
    .height-compact { min-height: 156px; }
    .height-comfortable { min-height: 192px; }
    .height-tall { min-height: 240px; }

    .artwork-shell {
      min-height: 100%;
      background: rgba(255, 255, 255, 0.08);
    }

    .artwork,
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      min-height: inherit;
    }

    .placeholder {
      font-size: 2.5rem;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.18));
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 18px 18px 14px 18px;
      gap: 12px;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
      justify-content: end;
      min-height: 0;
      margin-top: auto;
    }

    .title,
    .artist {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 700;
      -webkit-line-clamp: 2;
    }

    .artist {
      font-size: 0.95rem;
      opacity: 0.78;
      -webkit-line-clamp: 2;
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      margin-top: auto;
    }

    .icon-button {
      border: 0;
      border-radius: 999px;
      width: 42px;
      height: 42px;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.14);
      color: inherit;
      font-size: 1.1rem;
    }

    .icon-button.primary {
      background: rgba(255, 255, 255, 0.24);
      width: 48px;
      height: 48px;
      font-size: 1.2rem;
    }

    .missing {
      padding: 16px;
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'luxe-media-card',
  name: 'Luxe Media Card',
  description: 'Elegant now-playing card with artwork, metadata, and transport controls.'
});

declare global {
  interface HTMLElementTagNameMap {
    'luxe-media-card': LuxeMediaCard;
  }
}
