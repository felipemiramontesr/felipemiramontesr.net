# Changelog

All notable changes to this project will be documented in this file.

## [V172] - 2026-01-29

### Changed

- **Icon Homogenization**: Migrated ALL remaining skills (PHP, Node.js, YAML, HTML, CSS, Gulp.js, Trello) to local SVGs.
- **System**: Logic is now uniform; no external icon dependencies for skills.

## [V171] - 2026-01-29

### Changed

- **Skill Icons**:
  - Replaced SASS, Chart.js, Drupal, Odoo, and Apache external icons with local optimized SVGs.
  - Applied aggressive "zoom" (viewBox trimming) to all updated icons for better visibility.
- **Moodle**: Verified 30% padding adjustment.

## [V170] - 2026-01-26

### Fixed

- **Skill Icons**: Replaced broken/incorrect Twig and Drush icons with official localized SVGs.
- **Skill Cards**: Restored "Sticker" aesthetic (1px flat border, Cyan hover) strictly stripping all extra effects.
- **Regression**: Fixed `skills-grid` ID mismatch preventing the section from rendering.

## [V169] - 2026-01-25

### Added

- **Visual E2E Tests**: Implemented Playwright testing suite for visual regression (transparency/color checks).
- **Watermark**: Added massive "Massive Bold" years indicator behind skills.
- **Cookies Page**: Replicated floating pills layout (Protocolo L).

### Changed

- **Skills Redesign**:
  - Dark Mode: "Sticker" aesthetic (Flat 1px border, no shadow, no glow).
  - Light Mode: High contrast text and darker empty stars (0.65 opacity).
  - Icon: Simplified 1px border with White Background (#F1F5F9) in Dark Mode.
- **Cookies Banner**:
  - Refactored CSS to use unified variables (Removed `!important` hacks).
  - Tuned Light Mode transparency to 0.35 (Ice Glass).
  - Forced "Got it!" button text to Black in Light Mode.
- **Refactor**: Consolidated Light/Dark logic in `style.css`.

### Fixed

- Restored glassmorphism effect on Cookie Banner for Light Theme.

## [V134] - 2026-01-25

### Changed

- Standardized professional title to "Senior Fullstack Drupal Developer" site-wide (Meta keywords, JSON-LD, Chips, and SEO tests).

## [V133] - 2026-01-25

### Added

- `tests/styles.test.js`: Suite of regression tests for CSS consistency.
- `README.md`: Architecture diagram and instructions.
- `CHANGELOG.md`: Project history tracking.

### Changed

- Refined professional titles to match contact information (Font weight, tracking, interlineado).
- Enforced strict single-line constraint (`nowrap`) in all cards.
- Renamed "Senior Fullstack Drupal Developer" to "Senior Drupal Developer".

## [V132] - 2026-01-25

### Added

- Unified professionals chips font-size with contact values.

## [V131] - 2026-01-25

### Fixed

- Floating download menu visual glow and positioning.

## [V119] - 2026-01-24

### Fixed

- Cookie banner contrast and "God Mode" glow implementation.

## [V90] - 2026-01-24

### Fixed

- CSS Shadow optimization (removal of `.glass::before` glow artifacts).

## [V34] - 2026-01-23

### Fixed

- Mobile theme button persistence using `position: sticky`.
- Structure refactor (moved `.top-controls` to the beginning of `<body>`).

## [V26] - 2026-01-23

### Added

- Modularization of JavaScript (ES Modules logic).
- JSDoc standard documentation.
- Initial suite of 7 unit tests.

## [V17] - 2026-01-22

### Added

- Initial layout harmony and tablet breakout implementation.
