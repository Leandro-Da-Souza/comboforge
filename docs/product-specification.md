# ComboForge

## Product Specification

### Version

0.1 Draft

---

# Overview

ComboForge is a mobile-first striking training application designed for martial artists.

The application combines a round timer, combo engine, text-to-speech coaching, and customizable training sessions to help users practice boxing, kickboxing, and Muay Thai techniques.

Users can train entirely offline without creating an account.

The application follows a local-first philosophy where user data belongs to the user and synchronization is optional.

---

# Problem Statement

Shadowboxing and solo striking practice often lack variety and structure.

Athletes frequently:

- Repeat the same combinations
- Lose focus during rounds
- Lack training partners to call combinations
- Need lightweight tools that work without subscriptions or accounts

ComboForge aims to provide an always-available virtual striking coach.

---

# Goals

## Goal 1 — Improve Solo Training

Provide dynamic combo callouts during training sessions.

The application should function as a virtual coach that guides users through combinations and reactions.

---

## Goal 2 — Support Multiple Striking Disciplines

The application should support:

- Boxing
- Kickboxing
- Muay Thai

Each discipline may expose different techniques and default combinations.

---

## Goal 3 — Mobile First

The primary experience should be optimized for mobile devices.

Users should be able to:

- Start a session quickly
- Operate the application with minimal interaction
- Read callouts clearly during training

---

## Goal 4 — Local First

Users should be able to use ComboForge without creating an account.

All core functionality should work offline.

User-created content should remain available locally.

---

# User Identity & Data Philosophy

## Core Principle

Users should not need an identity to use ComboForge.

Identity should only exist when it provides a direct benefit to the user.

Data should only be stored when it provides value to the user.

---

## Guest First

Users should be able to:

- Train
- Create custom combos
- Save settings
- View history

without creating an account.

---

## Optional Accounts

Future account functionality should exist solely for:

- Synchronization
- Backup
- Multi-device usage

Accounts should never be required for core functionality.

---

## Data Collection

ComboForge should avoid collecting:

- Real names
- Email addresses
- Phone numbers
- Physical locations
- Birth dates
- Advertising profiles

unless a future feature explicitly requires them.

---

# Core Concepts

## Discipline

A discipline determines available techniques.

Supported disciplines:

- Boxing
- Kickboxing
- Muay Thai

---

## Stance

Supported stances:

- Orthodox
- Southpaw

The application should avoid left/right terminology and instead use:

- Lead
- Rear

Examples:

- Lead Jab
- Rear Cross
- Lead Hook
- Rear Kick

---

## Combo

A combo is an ordered list of actions.

Example:

Lead Jab → Rear Cross → Lead Hook

---

## Interruption

An interruption is a special event inserted during a combo.

Interruptions are planned for a future version and are not part of the v1 MVP.

Examples:

- Slip
- Block
- Check
- Teep

Interruptions may be:

- Offensive
- Defensive

---

# Features

## Training Session

Users can:

- Start a session
- Pause a session
- End a session

A session contains:

- Rounds
- Rest periods
- Difficulty settings
- Combo sources

---

## Round Timer

Users should be able to configure:

- Number of rounds
- Round duration
- Rest duration

Preset configurations should be provided.

Examples:

- 3 x 3 min
- 5 x 3 min
- 5 x 5 min

---

## Countdown

Before each session:

3
2
1
Fight

---

## Text To Speech

The application should read:

- Combos
- Round transitions

using browser text-to-speech.

Future versions may also read interruptions.

---

## Background Music

The application should support optional bundled retro-inspired background music.

Background music is planned for a future version and is not part of the v1 MVP.

Examples:

- Chiptune
- Game Boy inspired
- PS1 inspired

---

## Combo Library

Users should be able to:

- Create combos
- Edit combos
- Delete combos

The application should include starter combos for:

- Boxing
- Kickboxing
- Muay Thai

---

## Difficulty Presets

For v1, difficulty presets control combo callout pace.

### Easy

- Slow pace

### Normal

- Medium pace

### Hard

- Fast pace

Future versions may also map difficulty presets to interruption frequency.

---

## Custom Difficulty

Users should be able to configure:

- Pace
- Interruption frequency
- Offensive interruptions
- Defensive interruptions
- Combo sources

Custom difficulty is planned for a future version. For v1, ComboForge should
ship with fixed difficulty presets.

---

## Session History

The application should store:

- Date
- Duration
- Number of rounds
- Discipline
- Difficulty
- Combos used

---

## Statistics

The application should display:

- Sessions completed
- Total training time
- Total rounds completed

---

# Navigation

## Train

Primary training experience.

---

## Combos

Combo management and creation.

---

## History

Past training sessions.

---

## Settings

Application settings and preferences.

---

# User Interface

## Training Screen

Display:

- Remaining time
- Current combo
- Upcoming combo preview
- Round information

The current combo should be visually emphasized.

Upcoming combo previews should use reduced opacity and smaller typography.

---

# Storage

## Local Storage

Initial versions should use a local-first approach.

Potential implementation:

- IndexedDB
- Dexie

---

## Export / Import

Users should be able to:

- Export data as JSON
- Import data from JSON

---

## Future Synchronization

Future versions may support synchronization through PocketBase.

Synchronization should remain optional.

---

# Architecture

## Frontend

- React
- TypeScript
- Vite

---

## Data Layer

Local-first architecture.

Local storage should remain the primary source of truth.

---

# MVP Scope

Included in v1:

- Round timer
- Text-to-speech
- Combo engine
- Custom combos
- Difficulty presets for combo callout pace
- Session history
- Statistics
- Local storage
- JSON export/import

---

# Deferred From v1

The following features are intentionally excluded from the v1 MVP to keep the
first release focused and shippable:

- Interruptions during combos
- Interruption frequency controls
- Offensive and defensive interruption configuration
- Custom difficulty settings
- Background music

These features remain compatible with the long-term product direction and may
be revisited for v2.

---

# Future Enhancements

## v2

- Interruptions
- Custom difficulty settings
- Background music
- Favorites
- Combo lists
- Calendar view
- Weekly goals
- Monthly goals
- Synchronization

---

## v3

- Smartwatch integration
- Heart-rate integration
- Activity tracking
- Advanced coaching

---

# Non-Goals

The initial version should not include:

- Social features
- Competitive leaderboards
- Advertising
- Mandatory accounts
- AI coaching
- Subscription requirements
