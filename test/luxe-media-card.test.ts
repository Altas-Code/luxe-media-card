import { fixture, html, expect } from '@open-wc/testing';
import '../src/luxe-media-card';
import type { LuxeMediaCard } from '../src/luxe-media-card';
import { normalizeConfig, shouldShowSkipControls } from '../src/config';
import { MEDIA_PLAYER_SUPPORT_NEXT_TRACK, MEDIA_PLAYER_SUPPORT_PREVIOUS_TRACK } from '../src/media-player-support';

const createHass = (state: string, overrides: Record<string, unknown> = {}) => ({
  states: {
    'media_player.living_room': {
      entity_id: 'media_player.living_room',
      state,
      attributes: {
        friendly_name: 'Living Room Speaker',
        media_title: 'Nightcall',
        media_artist: 'Kavinsky',
        entity_picture: '/api/media_player_proxy/media_player.living_room',
        supported_features: MEDIA_PLAYER_SUPPORT_NEXT_TRACK | MEDIA_PLAYER_SUPPORT_PREVIOUS_TRACK,
        ...overrides
      }
    }
  },
  callService: vi.fn()
});

describe('config helpers', () => {
  it('normalizes optional config with defaults', () => {
    expect(normalizeConfig({ entity: 'media_player.living_room' })).to.deep.equal({
      entity: 'media_player.living_room',
      height: 'compact',
      show_skip_controls: true
    });
  });

  it('hides skip controls when support is missing', () => {
    expect(shouldShowSkipControls(true, 0)).to.equal(false);
  });
});

describe('luxe-media-card', () => {
  it('renders artwork, title and artist for playing media', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = createHass('playing') as any;
    await el.updateComplete;

    const root = el.shadowRoot!;
    expect(root.querySelector('[data-testid="artwork"]')).to.exist;
    expect(root.querySelector('[data-testid="title"]')?.textContent).to.contain('Nightcall');
    expect(root.querySelector('[data-testid="artist"]')?.textContent).to.contain('Kavinsky');
  });

  it('renders fallback name and state when media is not active', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = createHass('idle', {
      media_title: null,
      media_artist: null,
      entity_picture: null
    }) as any;
    await el.updateComplete;

    const root = el.shadowRoot!;
    expect(root.querySelector('[data-testid="title"]')?.textContent).to.contain('Living Room Speaker');
    expect(root.querySelector('[data-testid="artist"]')?.textContent).to.contain('idle');
    expect(root.querySelector('[data-testid="placeholder"]')).to.exist;
  });

  it('hides skip controls when not supported', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room', show_skip_controls: true });
    el.hass = createHass('playing', { supported_features: 0 }) as any;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[data-testid="next-button"]')).to.not.exist;
    expect(el.shadowRoot!.querySelector('[data-testid="previous-button"]')).to.not.exist;
  });

  it('calls media_play_pause when pressing the main button', async () => {
    const hass = createHass('playing');
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = hass as any;
    await el.updateComplete;

    (el.shadowRoot!.querySelector('[data-testid="play-pause-button"]') as HTMLButtonElement).click();

    expect(hass.callService).to.have.been.calledWith('media_player', 'media_play_pause', {
      entity_id: 'media_player.living_room'
    });
  });
});
