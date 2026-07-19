/**
 * Semantic Border Tokens — Light Mode (Shadcn mapping)
 */

export const borderColors = {
  /* ── Neutral ── */
  'color.border': '#E4E4E7',
  'color.border.bold': '#D4D4D8',
  'color.border.inverse': '#FFFFFF',
  'color.border.disabled': '#E4E4E7',
  'color.border.focused': '#D4D4D4',
  'color.border.selected': '#2E2E2E',
  'color.border.input': '#E4E4E7',
  'color.border.brand': '#2E2E2E',

  /* ── Semantic ── */
  'color.border.danger': '#DC2626',
  'color.border.warning': '#D97706',
  'color.border.success': '#16A34A',
  'color.border.discovery': '#8B5CF6',
  'color.border.information': '#4F46E5',

  /* ── Accent (pass 3:1) ── */
  'color.border.accent.lime': '#65A30D',
  'color.border.accent.red': '#DC2626',
  'color.border.accent.orange': '#F97316',
  'color.border.accent.yellow': '#EAB308',
  'color.border.accent.green': '#16A34A',
  'color.border.accent.teal': '#0D9488',
  'color.border.accent.blue': '#0EA5E9',
  'color.border.accent.purple': '#8B5CF6',
  'color.border.accent.magenta': '#EC4899',
  'color.border.accent.gray': '#71717A',

  /* ── Accent Subtle (decorative, <3:1) ── */
  'color.border.accent.lime.subtle': '#BEF264',
  'color.border.accent.red.subtle': '#FCA5A5',
  'color.border.accent.orange.subtle': '#FDBA74',
  'color.border.accent.yellow.subtle': '#FDE047',
  'color.border.accent.green.subtle': '#86EFAC',
  'color.border.accent.teal.subtle': '#5EEAD4',
  'color.border.accent.blue.subtle': '#7DD3FC',
  'color.border.accent.purple.subtle': '#C4B5FD',
  'color.border.accent.magenta.subtle': '#F9A8D4',
  'color.border.accent.gray.subtle': '#D4D4D8'
} as const

export type BorderColorToken = keyof typeof borderColors
