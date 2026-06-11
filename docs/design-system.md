# ComboForge Design System

## Design Philosophy

ComboForge is a combat sports training application.

The design should feel like a tool used inside a boxing gym, Muay Thai camp, or fight venue rather than a generic fitness application.

The interface should be:

- mobile-first
- bold
- high contrast
- fast to read during training
- focused and distraction-free
- tactile and energetic
- inspired by combat sports culture

Training is always the primary focus.

Visual styling must never reduce readability or usability during active rounds.

---

## Core Design Principles

### Readability Under Stress

Users may be:

- moving
- sweating
- breathing heavily
- glancing at the screen for less than a second

Important information must be immediately recognizable.

Prioritize:

- large timers
- strong contrast
- clear visual hierarchy
- oversized touch targets

### Training First

ComboForge is a training tool before it is a lifestyle product.

Avoid:

- social media patterns
- excessive animations
- unnecessary decoration
- dashboard clutter

### Combat Sports Identity

The application should embrace combat sports aesthetics while remaining modern and usable.

Visual inspiration:

- boxing gyms
- Muay Thai stadiums
- fight posters
- combat sports branding
- gym signage
- round timers

Avoid:

- cyberpunk styling
- military aesthetics
- anime influences
- generic fitness app design

---

# Theme A — Brutalist (Default)

## Mood

- fight gym
- industrial
- hard work
- focused
- aggressive
- modern

## Visual Characteristics

- dark neutral surfaces
- bold red accents
- strong typography
- minimal decoration
- practical training-tool feel

## Typography

Display:

- Bebas Neue

Body:

- Inter

Monospace:

- JetBrains Mono

## Use Case

Primary default theme.

Represents the core ComboForge identity.

---

# Theme B — Muay Thai

## Mood

- heritage
- respect
- ritual
- tradition
- craftsmanship

## Visual Characteristics

- warm brown surfaces
- gold accents
- subtle atmospheric glow
- refined presentation

## Typography

Display:

- Cinzel
- Cormorant Garamond

Body:

- Inter

Monospace:

- JetBrains Mono

## Use Case

Alternative theme for users who prefer a traditional martial arts aesthetic.

---

# Theme C — Fight Night

## Mood

- fight night
- main event
- hype
- promotion
- spectacle

## Visual Characteristics

- bold editorial layouts
- strong yellow accents
- sharp corners
- poster-inspired typography
- high energy

## Typography

Display:

- Anton
- Druk
- League Gothic

Body:

- Inter

Monospace:

- JetBrains Mono

## Use Case

Alternative theme focused on excitement and event energy.

---

# Shared UI Traits

All themes should maintain:

- large hero typography
- oversized timers
- strong call-to-action buttons
- clear visual hierarchy
- mobile-first spacing
- accessible contrast ratios
- consistent component structure

Themes should alter personality, not functionality.

Users should be able to switch themes without relearning the interface.

---

# Implementation Notes

Use CSS custom properties for all theme tokens.

Example:

```css
:root {
  --background: #0a0a0a;
  --surface: #161616;
  --foreground: #f5f5f5;
  --primary: #e63946;
  --border: #2a2a2a;
}
```

Theme switching should primarily occur through token replacement rather than component-specific styling.

---

# Default Theme

Brutalist is the default ComboForge experience.

It best represents the application's identity as a focused combat sports training tool while remaining highly readable during active training sessions.
