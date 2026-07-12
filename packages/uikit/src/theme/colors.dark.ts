// src/theme/colors.dark.ts
// eslint-disable-next-line no-restricted-imports
import type { ShadingColor } from './colors.js'

// Brand, success, neutral, danger, warning are identical in both modes
export { brand, success, neutral, danger, warning } from './colors.js'

// ═══════════════════════════════════════════════════════
// DARK MODE PALETTE
// Same inverted convention: 0 = ink (lightest on dark), 9 = canvas (darkest)
// ═══════════════════════════════════════════════════════

/** Dark scale = semantic ladder for dark mode.
 *  0-3: ink (text, lightest on dark bg) | 4-6: hairlines | 7-9: surfaces (darkest)
 */
export const dark: ShadingColor = [
  '#f7f8f8', // 0 — ink (primary text on dark)
  '#d0d6e0', // 1 — ink-muted
  '#8a8f98', // 2 — ink-subtle
  '#62666d', // 3 — ink-tertiary
  '#3e3e44', // 4 — hairline-tertiary
  '#34343a', // 5 — hairline-strong
  '#23252a', // 6 — hairline
  '#18191a', // 7 — surface-3
  '#141516', // 8 — surface-2
  '#010102' // 9 — canvas (page background, deepest dark)
]
