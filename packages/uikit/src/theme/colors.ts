// src/theme/colors.ts
// eslint-disable-next-line no-restricted-imports
import type { MantineColorsTuple } from '@mantine/core'

export type ShadingColor = MantineColorsTuple

// ═══════════════════════════════════════════════════════
// LIGHT MODE RAW PALETTES
// Inverted convention: 0 = ink (darkest), 9 = canvas (lightest)
// ═══════════════════════════════════════════════════════

/** Brand lavender-blue — primary CTA, focus rings, links */
export const brand: ShadingColor = [
  '#f0f1ff', // 0 — subtlest tint
  '#e0e2ff', // 1 — subtler tint
  '#c8ccff', // 2 — subtle tint
  '#a8aeff', // 3
  '#8b93ff', // 4
  '#6b75e6', // 5 — bold
  '#5e6ad2', // 6 — boldest (primary anchor)
  '#4a529e', // 7 — primary-focus
  '#363a6a', // 8
  '#222444' // 9 — darkest shade
]

/** Success green — status pills, success indicators */
export const success: ShadingColor = [
  '#e6f7eb', // 0
  '#c2ebd0', // 1
  '#9ddfae', // 2
  '#79d38c', // 3
  '#55c76a', // 4
  '#27a644', // 5 — bold
  '#1f8536', // 6
  '#176427', // 7
  '#0f4318', // 8
  '#072209' // 9
]

/** Danger red — errors, destructive actions */
export const danger: ShadingColor = [
  '#fff0f0', // 0
  '#ffd9d9', // 1
  '#ffb3b3', // 2
  '#ff8a8a', // 3
  '#ff5656', // 4
  '#e34935', // 5 — bold
  '#bf2600', // 6
  '#9e1b00', // 7
  '#7a1500', // 8
  '#5c1000' // 9
]

/** Warning amber — alerts, cautions */
export const warning: ShadingColor = [
  '#fffbf0', // 0
  '#fff2d9', // 1
  '#ffe8b3', // 2
  '#ffdc8a', // 3
  '#ffce56', // 4
  '#ffab00', // 5 — bold
  '#d98c00', // 6
  '#b37200', // 7
  '#8a5900', // 8
  '#664200' // 9
]

/**
 * Dark scale — semantic ladder for text, borders, and surfaces (light mode).
 * 0-3: ink (text) | 4-6: hairlines (borders) | 7-9: canvas (surfaces)
 */
export const dark: ShadingColor = [
  '#08090a', // 0 — ink (primary text)
  '#3c3e44', // 1 — ink-muted (secondary text)
  '#62666d', // 2 — ink-subtle (muted text)
  '#8a8f98', // 3 — ink-tertiary (disabled text)
  '#d0d6e0', // 4 — hairline-strong (strong border)
  '#e2e4e7', // 5 — hairline (default border)
  '#ebecee', // 6 — hairline-subtle (subtle border)
  '#f7f8f8', // 7 — surface-sunken (sunken bg)
  '#fbfbfc', // 8 — surface-raised (raised bg)
  '#ffffff' // 9 — canvas (page bg)
]

/** Neutral gray — secondary surfaces, disabled states */
export const neutral: ShadingColor = [
  '#1d1f22', // 0 — ink
  '#2c2e32', // 1 — ink-muted
  '#3e4145', // 2 — ink-subtle
  '#55585c', // 3 — ink-tertiary
  '#6b6e72', // 4 — hairline-strong
  '#8a8d91', // 5 — hairline
  '#b3b5b8', // 6 — hairline-subtle
  '#d1d3d5', // 7 — surface
  '#e8e9ea', // 8 — surface-subtle
  '#f5f6f6' // 9 — surface-subtlest
]
