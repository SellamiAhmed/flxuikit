// src/theme/colors.ts
// eslint-disable-next-line no-restricted-imports
import type { MantineColorsTuple } from '@mantine/core'

export type ShadingColor = MantineColorsTuple

// ═══════════════════════════════════════════════════════
// LIGHT MODE PALETTE
// Inverted convention: 0 = ink (darkest), 9 = canvas (lightest)
// This mirrors TiDBCloud's semantic ladder pattern
// ═══════════════════════════════════════════════════════

/** Brand lavender-blue — primary CTA, focus rings, links */
export const brand: ShadingColor = [
  '#f0f1ff', // 0 — lightest tint
  '#e0e2ff',
  '#c8ccff',
  '#a8aeff',
  '#8b93ff', // 4
  '#6b75e6', // 5 — primary-hover
  '#5e6ad2', // 6 — primary (anchor)
  '#4a529e', // 7 — primary-focus
  '#363a6a',
  '#222444' // 9 — darkest shade
]

/** Success green — status pills, success indicators */
export const success: ShadingColor = [
  '#e6f7eb',
  '#c2ebd0',
  '#9ddfae',
  '#79d38c',
  '#55c76a',
  '#27a644', // 5 — semantic-success
  '#1f8536',
  '#176427',
  '#0f4318',
  '#072209'
]

/** Dark scale = semantic ladder for light mode.
 *  0-3: ink (text, darkest) | 4-6: hairlines | 7-9: surfaces (lightest)
 */
export const dark: ShadingColor = [
  '#111111', // 0 — ink (primary text)
  '#333333', // 1 — ink-muted
  '#555555', // 2 — ink-subtle
  '#777777', // 3 — ink-tertiary
  '#e5e5e5', // 4 — hairline-tertiary
  '#d4d4d4', // 5 — hairline-strong
  '#c4c4c4', // 6 — hairline
  '#f5f5f5', // 7 — surface-3
  '#fafafa', // 8 — surface-2
  '#ffffff' // 9 — canvas (page background)
]

/** Neutral gray — secondary UI, disabled states */
export const neutral: ShadingColor = [
  '#f5f6f6',
  '#e6e7e8',
  '#d1d3d5',
  '#b3b5b8',
  '#8a8d91',
  '#6b6e72',
  '#55585c',
  '#3e4145',
  '#2c2e32',
  '#1d1f22'
]

/** Danger red — errors, destructive actions */
export const danger: ShadingColor = [
  '#fff0f0',
  '#ffd9d9',
  '#ffb3b3',
  '#ff8a8a',
  '#ff5656',
  '#e34935',
  '#bf2600',
  '#9e1b00',
  '#7a1500',
  '#5c1000'
]

/** Warning amber — alerts, cautions */
export const warning: ShadingColor = [
  '#fffbf0',
  '#fff2d9',
  '#ffe8b3',
  '#ffdc8a',
  '#ffce56',
  '#ffab00',
  '#d98c00',
  '#b37200',
  '#8a5900',
  '#664200'
]
