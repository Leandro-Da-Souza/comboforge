# ComboForge Design System

## Direction

ComboForge should feel like a clean modern training app with retro fight-game energy.

The interface should be:

- mobile-first
- bold
- high contrast
- fast to read during training
- slightly arcade-inspired without becoming childish

## Theme A — Classic Forge

Based on the darker red/brown screenshot.

Mood:

- premium
- warm
- old fight-poster
- parchment/gold accents

Use for:

- refined/default theme candidate
- calmer premium feel

## Theme B — Arcade Corner

Based on the black/yellow screenshot.

Mood:

- bold
- modern
- arcade
- energetic
- high-contrast

Use for:

- alternate theme
- more game-like experience

## Shared UI Traits

- large hero typography
- strong call-to-action buttons
- rounded cards
- compact preset cards
- uppercase labels
- mobile-first spacing
- clear hierarchy

## Implementation Notes

Prefer CSS custom properties for theme tokens.

Example:

```css
:root {
  --color-background: #090807;
  --color-surface: #15110d;
  --color-primary: #ffd43b;
  --color-text: #fff5df;
  --color-muted: #9c845d;
}
```
