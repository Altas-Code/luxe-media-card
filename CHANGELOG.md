# Changelog

## 0.1.3
- Updated the card chrome to feel closer to standard Home Assistant cards.
- Switched transport controls from emoji buttons to Material Design icons.
- Moved the color treatment closer to Home Assistant theme colors for light and dark mode.
- Kept the artwork square across all height presets while preserving full card height.
- Removed status text from the metadata area so only media information is shown.
- Updated metadata layout so the title sits larger on top and the second line only appears when available.
- Refreshed screenshots and README content to match the current UI.

## 0.1.2
- Fixed `hacs.json` Home Assistant version metadata so HACS can compare it correctly during downloads.
- Restored a working HACS install path by publishing a corrected release.

## 0.1.1
- Restored automated GitHub release asset publishing via GitHub Actions.
- Published release assets for HACS consumption from GitHub releases.

## 0.1.0
- Initial public scaffold for Luxe Media Card.
- Added HACS metadata and build setup.
- Added GUI editor for entity, height, and skip controls.
- Added artwork-left now-playing layout with fallback states.
- Added transport controls with feature-aware skip handling.
- Added test-first implementation with unit and rendering coverage.
