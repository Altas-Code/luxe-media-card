# Luxe Media Card

Elegant now-playing Lovelace card for Home Assistant with artwork, metadata, and transport controls in a wide layout.

## Features

- HACS-installable custom card
- Single `media_player` entity per card
- Artwork on the left, metadata and controls on the right
- Title and artist text left-aligned
- Play/pause button always shown
- Previous/next buttons shown only when enabled **and** supported by the device
- Height presets: `flat`, `compact`, `comfortable`, `tall`
- GUI editor for entity, height, and skip controls

## Installation

### HACS

1. Add this repository as a custom frontend repository in HACS.
2. Install **Luxe Media Card**.
3. Reload Home Assistant.
4. Add the card in Lovelace.

### Manual

1. Copy `dist/luxe-media-card.js` to your Home Assistant `www/` folder.
2. Add it as a Lovelace resource.

## Example configuration

```yaml
 type: custom:luxe-media-card
 entity: media_player.living_room
 height: compact
 show_skip_controls: true
```

## Options

| Option | Type | Required | Default | Description |
|---|---|---:|---|---|
| `entity` | string | yes | - | Target `media_player` entity |
| `height` | `flat` \| `compact` \| `comfortable` \| `tall` | no | `compact` | Visual height preset |
| `show_skip_controls` | boolean | no | `true` | Allow previous/next buttons when supported |

## Development

```bash
npm install
npm test
npm run check
npm run build
```

## Quality

The project is set up test-first and currently includes:

- config normalization tests
- control support logic tests
- rendering tests for active and fallback states
- interaction test for media service calls
- GUI editor tests for entity filtering and config updates
