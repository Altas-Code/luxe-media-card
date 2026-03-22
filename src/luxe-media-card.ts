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
    const playPauseIcon = state === 'playing' ? 'mdi:pause' : 'mdi:play';

    return html`
      <ha-card>
        <div class="card ${HEIGHT_CLASS_MAP[this._config.height]}" data-state=${state}>
          <div class="artwork-shell" data-testid="artwork-shell">
            ${artwork
              ? html`<img data-testid="artwork" class="artwork" src="${artwork}" alt="Album artwork" />`
              : html`<div data-testid="placeholder" class="placeholder" aria-label="No artwork available">
                  <span class="placeholder-icon">♪</span>
                </div>`}
          </div>

          <div class="content">
            <div class="meta">
              <div class="eyebrow">${this.#formatState(state)}</div>
              <div data-testid="title" class="title" title=${title}>${title}</div>
              <div data-testid="artist" class="artist" title=${artist}>${artist}</div>
            </div>

            <div class="controls" data-testid="controls">
              ${canShowSkip && hasPrevious
                ? html`<button data-testid="previous-button" class="icon-button" @click=${() => this.#callMediaService('media_previous_track')} aria-label="Previous track" title="Previous track"><ha-icon icon="mdi:skip-previous"></ha-icon></button>`
                : nothing}
              <button data-testid="play-pause-button" class="icon-button primary" @click=${() => this.#callMediaService('media_play_pause')} aria-label=${playPauseLabel} title=${playPauseLabel}><ha-icon icon=${playPauseIcon}></ha-icon></button>
              ${canShowSkip && hasNext
                ? html`<button data-testid="next-button" class="icon-button" @click=${() => this.#callMediaService('media_next_track')} aria-label="Next track" title="Next track"><ha-icon icon="mdi:skip-next"></ha-icon></button>`
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

  #formatState(state: string): string {
    return state.replace(/_/g, ' ');
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 20px;
      background: var(--ha-card-background, var(--card-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .card {
      --card-padding: 18px;
      --luxe-surface: color-mix(in srgb, var(--card-background-color, #1c1c1c) 92%, var(--primary-background-color, #111) 8%);
      --luxe-surface-playing: color-mix(in srgb, var(--card-background-color, #1c1c1c) 82%, var(--state-icon-active-color, var(--primary-color, #03a9f4)) 18%);
      --luxe-artwork-fallback: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 86%, var(--primary-color, #03a9f4) 14%);
      display: grid;
      grid-template-columns: clamp(108px, 32%, 168px) minmax(0, 1fr);
      gap: 0;
      min-width: 0;
      background:
        radial-gradient(circle at top left, color-mix(in srgb, var(--primary-text-color, #fff) 10%, transparent), transparent 42%),
        linear-gradient(135deg, var(--luxe-surface), color-mix(in srgb, var(--luxe-surface) 88%, var(--secondary-background-color, #000) 12%));
      color: var(--primary-text-color);
    }

    .card[data-state='playing'] {
      background:
        radial-gradient(circle at top left, color-mix(in srgb, var(--state-icon-active-color, var(--primary-color, #03a9f4)) 18%, transparent), transparent 40%),
        linear-gradient(135deg, var(--luxe-surface-playing), color-mix(in srgb, var(--luxe-surface-playing) 88%, var(--secondary-background-color, #000) 12%));
    }

    .height-flat { min-height: 120px; }
    .height-compact { min-height: 156px; }
    .height-comfortable { min-height: 196px; }
    .height-tall { min-height: 244px; }

    .artwork-shell {
      position: relative;
      min-height: 100%;
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 92%, var(--primary-text-color, #fff) 8%);
      overflow: hidden;
    }

    .artwork-shell::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent 70%, rgba(0, 0, 0, 0.18));
      pointer-events: none;
    }

    .artwork,
    .placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      object-fit: cover;
      min-height: inherit;
    }

    .placeholder {
      background:
        radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--primary-text-color, #fff) 16%, transparent), transparent 20%),
        linear-gradient(135deg, color-mix(in srgb, var(--luxe-artwork-fallback) 86%, var(--primary-text-color, #fff) 14%), var(--luxe-artwork-fallback));
      color: var(--primary-text-color);
    }

    .placeholder-icon {
      font-size: clamp(2rem, 4vw, 3.2rem);
      line-height: 1;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      padding: var(--card-padding) var(--card-padding) 14px var(--card-padding);
      gap: 14px;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      margin-top: auto;
    }

    .eyebrow {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--secondary-text-color);
      opacity: 0.92;
    }

    .title,
    .artist {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }

    .title {
      font-size: clamp(1rem, 2.2vw, 1.2rem);
      font-weight: 700;
      line-height: 1.2;
      -webkit-line-clamp: 2;
    }

    .artist {
      font-size: clamp(0.9rem, 1.8vw, 1rem);
      color: var(--secondary-text-color);
      line-height: 1.25;
      -webkit-line-clamp: 2;
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: auto;
    }

    .icon-button {
      border: 0;
      border-radius: 999px;
      width: 42px;
      height: 42px;
      cursor: pointer;
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 78%, var(--primary-text-color, #fff) 22%);
      color: var(--primary-text-color);
      font-size: 1.1rem;
      backdrop-filter: blur(8px);
      transition: transform 120ms ease, background 120ms ease, opacity 120ms ease;
    }

    .icon-button:hover {
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 68%, var(--primary-text-color, #fff) 32%);
      transform: translateY(-1px);
    }

    .icon-button:active {
      transform: translateY(0);
    }

    .icon-button:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.72);
      outline-offset: 2px;
    }

    .icon-button.primary {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 22%, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 78%);
      width: 48px;
      height: 48px;
      font-size: 1.2rem;
    }

    .icon-button ha-icon {
      display: inline-flex;
      --mdc-icon-size: 22px;
      color: currentColor;
    }

    .icon-button.primary ha-icon {
      --mdc-icon-size: 24px;
    }

    .missing {
      padding: 16px;
      color: var(--secondary-text-color);
    }

    @media (max-width: 420px) {
      .card {
        grid-template-columns: 112px minmax(0, 1fr);
      }

      .content {
        --card-padding: 14px;
        gap: 10px;
      }

      .icon-button {
        width: 38px;
        height: 38px;
      }

      .icon-button.primary {
        width: 44px;
        height: 44px;
      }
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
