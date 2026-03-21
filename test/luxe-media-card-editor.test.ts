import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../src/luxe-media-card-editor';
import type { LuxeMediaCardEditor } from '../src/luxe-media-card-editor';

const hass = {
  states: {
    'media_player.office': {
      entity_id: 'media_player.office',
      state: 'idle',
      attributes: {
        friendly_name: 'Office Speaker'
      }
    },
    'light.desk': {
      entity_id: 'light.desk',
      state: 'on',
      attributes: {
        friendly_name: 'Desk Light'
      }
    }
  },
  callService: () => undefined
};

describe('luxe-media-card-editor', () => {
  it('shows only media_player entities in the selector', async () => {
    const el = await fixture<LuxeMediaCardEditor>(html`<luxe-media-card-editor></luxe-media-card-editor>`);
    el.hass = hass as any;
    el.setConfig({ entity: 'media_player.office' });
    await el.updateComplete;

    const options = Array.from(el.shadowRoot!.querySelectorAll('option')).map((option) => option.value);
    expect(options).to.include('media_player.office');
    expect(options).to.not.include('light.desk');
  });

  it('emits config-changed when height changes', async () => {
    const el = await fixture<LuxeMediaCardEditor>(html`<luxe-media-card-editor></luxe-media-card-editor>`);
    el.hass = hass as any;
    el.setConfig({ entity: 'media_player.office', height: 'compact', show_skip_controls: true });
    await el.updateComplete;

    const listener = oneEvent(el, 'config-changed');
    const select = el.shadowRoot!.querySelector('[data-testid="height-select"]') as HTMLSelectElement;
    select.value = 'tall';
    select.dispatchEvent(new Event('change'));

    const event = (await listener) as CustomEvent;
    expect(event.detail.config).to.deep.equal({
      entity: 'media_player.office',
      height: 'tall',
      show_skip_controls: true
    });
  });
});
