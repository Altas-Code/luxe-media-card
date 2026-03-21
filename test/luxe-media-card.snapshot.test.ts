import { fixture, html, expect } from '@open-wc/testing';
import '../src/luxe-media-card';
import type { LuxeMediaCard } from '../src/luxe-media-card';

const hass = {
  states: {
    'media_player.demo': {
      entity_id: 'media_player.demo',
      state: 'playing',
      attributes: {
        friendly_name: 'Demo Speaker',
        media_title: 'Snapshot Song',
        media_artist: 'Snapshot Artist',
        entity_picture: null,
        supported_features: 48
      }
    }
  },
  callService: () => undefined
};

describe('luxe-media-card snapshot structure', () => {
  it('renders the expected shell for visual sanity checks', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.demo', height: 'comfortable', show_skip_controls: true });
    el.hass = hass as any;
    await el.updateComplete;

    const normalized = el.shadowRoot!.innerHTML
      .replace(/<!--\?lit\$[^>]*-->/g, '')
      .replace(/<!--.*?-->/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    expect(normalized).to.contain('data-testid="placeholder"');
    expect(normalized).to.contain('data-testid="title"');
    expect(normalized).to.contain('data-testid="artist"');
    expect(normalized).to.contain('data-testid="previous-button"');
    expect(normalized).to.contain('data-testid="play-pause-button"');
    expect(normalized).to.contain('data-testid="next-button"');
    expect(normalized).to.contain('class="card height-comfortable"');
  });
});
