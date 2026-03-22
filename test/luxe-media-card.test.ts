import { fixture, html, expect } from '@open-wc/testing';
import { vi } from 'vitest';
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

  it('falls back to compact for invalid height values', () => {
    expect(normalizeConfig({ entity: 'media_player.living_room', height: 'wild' as never })).to.deep.equal({
      entity: 'media_player.living_room',
      height: 'compact',
      show_skip_controls: true
    });
  });

  it('rejects non-media-player entities', () => {
    expect(() => normalizeConfig({ entity: 'light.desk' as never })).to.throw(
      'Luxe Media Card requires a media_player entity.'
    );
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
    expect(root.querySelector('[data-testid="play-pause-button"]')?.getAttribute('aria-label')).to.equal('Pause');
    expect(root.querySelector('[data-testid="play-pause-button"] ha-icon')?.getAttribute('icon')).to.equal('mdi:pause');
  });

  it('renders fallback name without status text when media is not active', async () => {
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
    expect(root.querySelector('[data-testid="artist"]')).to.not.exist;
    expect(root.querySelector('[data-testid="placeholder"]')).to.exist;
  });

  it('shows play label when paused', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = createHass('paused') as any;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[data-testid="play-pause-button"]')?.getAttribute('aria-label')).to.equal('Play');
    expect(el.shadowRoot!.querySelector('[data-testid="play-pause-button"] ha-icon')?.getAttribute('icon')).to.equal('mdi:play');
  });

  it('hides skip controls when disabled in config', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room', show_skip_controls: false });
    el.hass = createHass('playing') as any;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[data-testid="next-button"]')).to.not.exist;
    expect(el.shadowRoot!.querySelector('[data-testid="previous-button"]')).to.not.exist;
  });

  it('hides skip controls when not supported', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room', show_skip_controls: true });
    el.hass = createHass('playing', { supported_features: 0 }) as any;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[data-testid="next-button"]')).to.not.exist;
    expect(el.shadowRoot!.querySelector('[data-testid="previous-button"]')).to.not.exist;
  });

  it('supports one-sided skip capabilities', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room', show_skip_controls: true });
    el.hass = createHass('playing', { supported_features: MEDIA_PLAYER_SUPPORT_NEXT_TRACK }) as any;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[data-testid="next-button"]')).to.exist;
    expect(el.shadowRoot!.querySelector('[data-testid="next-button"] ha-icon')?.getAttribute('icon')).to.equal('mdi:skip-next');
    expect(el.shadowRoot!.querySelector('[data-testid="previous-button"]')).to.not.exist;
  });

  it('calls media_play_pause when pressing the main button', async () => {
    const hass = createHass('playing');
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = hass as any;
    await el.updateComplete;

    (el.shadowRoot!.querySelector('[data-testid="play-pause-button"]') as HTMLButtonElement).click();

    expect(hass.callService.mock.calls).to.deep.equal([[
      'media_player',
      'media_play_pause',
      { entity_id: 'media_player.living_room' }
    ]]);
  });

  it('calls next-track service when next is pressed', async () => {
    const hass = createHass('playing', { supported_features: MEDIA_PLAYER_SUPPORT_NEXT_TRACK });
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = hass as any;
    await el.updateComplete;

    (el.shadowRoot!.querySelector('[data-testid="next-button"]') as HTMLButtonElement).click();

    expect(hass.callService.mock.calls).to.deep.equal([[
      'media_player',
      'media_next_track',
      { entity_id: 'media_player.living_room' }
    ]]);
  });

  it('renders a friendly missing-entity state', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.unknown' });
    el.hass = { states: {}, callService: vi.fn() } as any;
    await el.updateComplete;

    expect(el.shadowRoot!.textContent).to.contain('Entity not found');
  });

  it('does not render a second line when no artist is available', async () => {
    const el = await fixture<LuxeMediaCard>(html`<luxe-media-card></luxe-media-card>`);
    el.setConfig({ entity: 'media_player.living_room' });
    el.hass = createHass('standby_mode', {
      media_title: 'Living Room Speaker',
      media_artist: null,
      entity_picture: null
    }) as any;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('[data-testid="artist"]')).to.not.exist;
  });
});
