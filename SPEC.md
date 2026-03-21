# Luxe Media Card Spec v0.1

## Goal
A HACS-installable Lovelace custom card that shows the currently playing media for a single Home Assistant `media_player` entity in a wide layout.

## Layout
- Artwork on the left, spanning the full card height.
- Metadata and controls on the right.
- Title above artist, both left-aligned near the artwork edge.
- Transport controls aligned to the bottom-right.
- Aspect should feel wide by default; height is configurable.

## Configuration
- `entity` (required): a single `media_player` entity.
- `height` (optional): one of `flat`, `compact`, `comfortable`, `tall`.
- `show_skip_controls` (optional, default `true`): show previous/next controls when supported.

## Behavior
- Display media title and artist when available.
- If no artwork is available, show a visual placeholder.
- If idle/off/unavailable, show entity friendly name and current state.
- Play/pause button toggles based on current playback state.
- Previous/next buttons should be hidden if config disables them or the entity does not support the relevant features.
- GUI editor should support entity selection, height selection, and skip-toggle.

## Quality bar
- Test-first workflow.
- Unit tests for config normalization and support detection.
- Component rendering tests for artwork, metadata, fallback state, and control visibility.
- Interaction tests for transport button service calls.
