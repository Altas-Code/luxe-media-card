import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from './types';
import type { LuxeMediaCardConfig } from './config';

@customElement('luxe-media-card')
export class LuxeMediaCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  public setConfig(_config: LuxeMediaCardConfig): void {
    throw new Error('Not implemented');
  }

  protected render() {
    return html`${nothing}`;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    'luxe-media-card': LuxeMediaCard;
  }
}
