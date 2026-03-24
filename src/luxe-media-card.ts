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
      show_skip_controls: true,
      text_overflow: 'truncate'
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
    const overflowMode = this._config.text_overflow;

    return html`
      <ha-card>
        <div class="card ${HEIGHT_CLASS_MAP[this._config.height]} ${overflowMode === 'scroll' ? 'text-scroll' : 'text-truncate'}" data-state=${state}>
          <div class="artwork-shell" data-testid="artwork-shell">
            ${artwork
              ? html`<img data-testid="artwork" class="artwork" src="${artwork}" alt="Album artwork" />`
              : html`<div data-testid="placeholder" class="placeholder" aria-label="No artwork available">
                  <span class="placeholder-icon">♪</span>
                </div>`}
          </div>

          <div class="content">
            <div class="meta">
              <div class="text-row title-row" data-testid="title-row">
                <div data-testid="title" class="title ${overflowMode === 'scroll' ? 'marquee' : 'truncate'}" title=${title}>
                  <span>${title}</span>
                </div>
              </div>
              ${artist && artist !== title
                ? html`<div class="text-row artist-row" data-testid="artist-row">
                    <div data-testid="artist" class="artist ${overflowMode === 'scroll' ? 'marquee' : 'truncate'}" title=${artist}>
                      <span>${artist}</span>
                    </div>
                  </div>`
                : nothing}
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
    return (entity.attributes.media_artist as string | undefined | null) || '';
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--ha-card-background, var(--card-background-color));
      box-shadow: var(--ha-card-box-shadow, var(--shadow-elevation-2dp_-_box-shadow));
      border: var(--ha-card-border-width, 1px) solid var(--divider-color, rgba(127, 127, 127, 0.16));
    }

    .card {
      --card-padding: 16px;
      --luxe-surface: var(--ha-card-background, var(--card-background-color));
      --luxe-artwork-fallback: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color, #2b2b2b)) 96%, var(--primary-text-color, #fff) 4%);
      --artwork-size: 156px;
      display: grid;
      grid-template-columns: var(--artwork-size) minmax(0, 1fr);
      gap: 0;
      min-width: 0;
      background: var(--luxe-surface);
      color: var(--primary-text-color);
    }

    .height-flat {
      --artwork-size: 120px;
      min-height: 120px;
    }

    .height-compact {
      --artwork-size: 156px;
      min-height: 156px;
    }

    .height-comfortable {
      --artwork-size: 196px;
      min-height: 196px;
    }

    .height-tall {
      --artwork-size: 244px;
      min-height: 244px;
    }

    .artwork-shell {
      position: relative;
      width: var(--artwork-size);
      height: var(--artwork-size);
      background: var(--secondary-background-color, var(--card-background-color));
      overflow: hidden;
      border-inline-end: 1px solid var(--divider-color, rgba(127, 127, 127, 0.16));
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
    }

    .placeholder {
      background: var(--luxe-artwork-fallback);
      color: var(--secondary-text-color);
    }

    .placeholder-icon {
      font-size: clamp(2rem, 4vw, 3.2rem);
      line-height: 1;
    }

    .content {
      display: grid;
      grid-template-rows: 1fr auto;
      min-width: 0;
      padding: var(--card-padding);
      gap: 10px;
      align-items: stretch;
    }

    .meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      justify-content: center;
      min-height: 0;
    }

    .text-row {
      position: relative;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
    }

    .title,
    .artist {
      display: inline-block;
      min-width: 0;
      max-width: 100%;
      text-align: left;
      vertical-align: top;
    }

    .truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .marquee {
      overflow: hidden;
      white-space: nowrap;
    }

    .marquee > span {
      display: inline-block;
      padding-inline-end: 2rem;
      animation: luxe-marquee 12s linear infinite;
    }

    .marquee:hover > span {
      animation-play-state: paused;
    }

    .title {
      font-size: clamp(1.05rem, 2.3vw, 1.28rem);
      font-weight: 700;
      line-height: 1.18;
    }

    .artist {
      font-size: clamp(0.88rem, 1.7vw, 0.98rem);
      color: var(--secondary-text-color);
      line-height: 1.22;
    }

    .controls {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      align-self: end;
    }

    .icon-button {
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.22));
      border-radius: 10px;
      width: 42px;
      height: 42px;
      cursor: pointer;
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color)) 96%, var(--primary-text-color) 4%);
      color: var(--primary-text-color);
      font-size: 1.1rem;
      transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
    }

    .icon-button:hover {
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color)) 92%, var(--primary-text-color) 8%);
      border-color: color-mix(in srgb, var(--divider-color, rgba(127, 127, 127, 0.22)) 70%, var(--primary-text-color) 30%);
      transform: translateY(-1px);
    }

    .icon-button:active {
      transform: translateY(0);
    }

    .icon-button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .icon-button.primary {
      background: color-mix(in srgb, var(--secondary-background-color, var(--card-background-color)) 94%, var(--primary-text-color) 6%);
      border-color: var(--divider-color, rgba(127, 127, 127, 0.22));
      width: 46px;
      height: 46px;
      font-size: 1.2rem;
    }

    .icon-button ha-icon {
      display: inline-flex;
      --mdc-icon-size: 21px;
      color: currentColor;
    }

    .icon-button.primary ha-icon {
      --mdc-icon-size: 23px;
    }

    .missing {
      padding: 16px;
      color: var(--secondary-text-color);
    }

    @keyframes luxe-marquee {
      0%, 10% {
        transform: translateX(0);
      }
      90%, 100% {
        transform: translateX(calc(-100% + var(--artwork-size) * 0));
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .marquee > span {
        animation: none;
      }
    }

    @media (max-width: 420px) {
      .card {
        --artwork-size: 112px;
      }

      .content {
        --card-padding: 14px;
        gap: 8px;
      }

      .meta {
        gap: 1px;
      }

      .icon-button {
        width: 38px;
        height: 38px;
      }

      .icon-button.primary {
        width: 42px;
        height: 42px;
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
