# Luxe Media Card

Elegant now-playing Lovelace card for Home Assistant with artwork, metadata, and transport controls in a wide layout.

## Features

- HACS-installable custom card
- Single `media_player` entity per card
- Artwork on the left in a square, full-height panel
- Title and optional artist text left-aligned on the right, always in a single line
- Material Design transport icons with play/pause always shown
- Previous/next buttons shown only when enabled **and** supported by the device
- Height presets: `flat`, `compact`, `comfortable`, `tall`
- GUI editor for entity, height, text overflow mode, and skip controls
- Local demo preview for quick visual regression checks

## Preview

### Playing / compact

![Luxe Media Card playing compact](./screenshots/luxe-media-card-playing-compact.png)

### Paused / tall

![Luxe Media Card paused tall](./screenshots/luxe-media-card-paused-tall.png)

## Install with HACS

1. Open **HACS**.
2. Go to **⋮ → Custom repositories**.
3. Add this repository URL:
   - `https://github.com/Altas-Code/luxe-media-card`
4. Choose category **Dashboard**.
5. Save.
6. Search for **Luxe Media Card** in HACS and install it.
7. Reload Home Assistant.
8. Add the card from the Lovelace card picker, or use `type: custom:luxe-media-card` manually.

## Manual install

1. Copy `dist/luxe-media-card.js` to your Home Assistant `www/` folder.
2. Add `/local/luxe-media-card.js` as a Lovelace resource.
3. Reload the browser.

## Example configuration

```yaml
type: custom:luxe-media-card
entity: media_player.living_room
height: compact
text_overflow: truncate
show_skip_controls: true
```

## Options

| Option | Type | Required | Default | Description |
|---|---|---:|---|---|
| `entity` | string | yes | - | Target `media_player` entity |
| `height` | `flat` \| `compact` \| `comfortable` \| `tall` | no | `compact` | Visual height preset |
| `text_overflow` | `truncate` \| `scroll` | no | `truncate` | Cut long text off or let it scroll |
| `show_skip_controls` | boolean | no | `true` | Allow previous/next buttons when supported |

## Behaviour notes

- If playback artwork is missing, the card shows a styled placeholder.
- If title/artist metadata is missing, the card falls back to the entity name.
- If a second media field like artist is unavailable, the card shows only the title line.
- Title and artist are always rendered as a single line each.
- Long text can either be cut off or shown as scrolling text via `text_overflow`.
- Skip buttons hide automatically when the selected player does not support them.
- The main transport button toggles play/pause depending on the player state.

## Development

```bash
npm install
npm test
npm run check
npm run build
npm run dev:demo
```

## Quality

The project is set up test-first and currently includes:

- config normalization and validation tests
- control support logic tests
- rendering tests for active, paused, fallback, and missing-entity states
- interaction tests for transport service calls
- GUI editor tests for entity filtering and config updates
- snapshot-style structure sanity checks for visual regressions

## Release flow

Current hosting target is **GitHub**.

Recommended release flow:
- run `npm run release:check`
- create/update the committed `dist/` build locally
- create and push a tag like `v0.1.1`
- GitHub Actions builds the card and attaches the JS bundle plus metadata files to the release automatically

## Local visual demo

A small demo app lives in `demo/` so the card can be checked visually without a full Home Assistant instance.
