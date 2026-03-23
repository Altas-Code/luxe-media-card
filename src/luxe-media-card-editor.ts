import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from './types';
import type { LuxeMediaCardConfig, LuxeMediaCardHeight, LuxeMediaCardTextOverflow } from './config';

@customElement('luxe-media-card-editor')
export class LuxeMediaCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config: LuxeMediaCardConfig = { entity: '' };

  public setConfig(config: LuxeMediaCardConfig): void {
    this._config = config;
  }

  protected render() {
    const entities = Object.values(this.hass?.states ?? {}).filter((state) =>
      state.entity_id.startsWith('media_player.')
    );

    return html`
      <div class="editor">
        <label>
          Entity
          <select data-testid="entity-select" .value=${this._config.entity ?? ''} @change=${this.#onEntityChange}>
            <option value="">Select media player</option>
            ${entities.map(
              (entity) => html`<option value=${entity.entity_id}>${entity.attributes.friendly_name ?? entity.entity_id}</option>`
            )}
          </select>
        </label>

        <label>
          Height
          <select data-testid="height-select" .value=${this._config.height ?? 'compact'} @change=${this.#onHeightChange}>
            <option value="flat">Flat</option>
            <option value="compact">Compact</option>
            <option value="comfortable">Comfortable</option>
            <option value="tall">Tall</option>
          </select>
        </label>

        <label>
          Long text
          <select data-testid="text-overflow-select" .value=${this._config.text_overflow ?? 'truncate'} @change=${this.#onTextOverflowChange}>
            <option value="truncate">Cut off</option>
            <option value="scroll">Scroll</option>
          </select>
        </label>

        <label class="checkbox">
          <input
            data-testid="skip-toggle"
            type="checkbox"
            .checked=${this._config.show_skip_controls ?? true}
            @change=${this.#onSkipToggle}
          />
          Show previous/next buttons when supported
        </label>
      </div>
    `;
  }

  #onEntityChange(event: Event): void {
    this.#emitConfig({ entity: (event.target as HTMLSelectElement).value });
  }

  #onHeightChange(event: Event): void {
    this.#emitConfig({ height: (event.target as HTMLSelectElement).value as LuxeMediaCardHeight });
  }

  #onTextOverflowChange(event: Event): void {
    this.#emitConfig({ text_overflow: (event.target as HTMLSelectElement).value as LuxeMediaCardTextOverflow });
  }

  #onSkipToggle(event: Event): void {
    this.#emitConfig({ show_skip_controls: (event.target as HTMLInputElement).checked });
  }

  #emitConfig(patch: Partial<LuxeMediaCardConfig>): void {
    this._config = {
      ...this._config,
      ...patch
    };

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      })
    );
  }

  static styles = css`
    .editor {
      display: grid;
      gap: 12px;
      padding: 8px 0;
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.95rem;
    }

    select,
    input[type='checkbox'] {
      font: inherit;
    }

    .checkbox {
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'luxe-media-card-editor': LuxeMediaCardEditor;
  }
}
