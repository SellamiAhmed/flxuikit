/**
 * Blanket (Modal Overlay) Tokens — Light Mode
 *
 * Used for screen overlays, selection overlays, and danger overlays.
 * All values are 8-digit hex (alpha + RGB).
 */

export const blanketColors = {
  'color.blanket': '#091E424D',
  'color.blanket.selected': '#388BFF14',
  'color.blanket.danger': '#EF5C4814'
} as const

export type BlanketColorToken = keyof typeof blanketColors
