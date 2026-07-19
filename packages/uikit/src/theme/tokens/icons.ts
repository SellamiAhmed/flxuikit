/**
 * Semantic Icon Tokens — Light Mode (Shadcn mapping)
 */

export const iconColors = {
  /* ── Neutral hierarchy ── */
  'color.icon': '#09090B',
  'color.icon.subtle': '#71717A',
  'color.icon.subtlest': '#A1A1AA',
  'color.icon.inverse': '#FFFFFF',
  'color.icon.disabled': '#A1A1AA',

  /* ── Interactive / Brand ── */
  'color.icon.selected': '#2E2E2E',
  'color.icon.brand': '#2E2E2E',

  /* ── Semantic status ── */
  'color.icon.danger': '#DC2626',
  'color.icon.warning': '#92400E',
  'color.icon.warning.inverse': '#FFFFFF',
  'color.icon.success': '#16A34A',
  'color.icon.discovery': '#7C3AED',
  'color.icon.information': '#3730A3',

  /* ── Accent ── */
  'color.icon.accent.lime': '#65A30D',
  'color.icon.accent.red': '#DC2626',
  'color.icon.accent.orange': '#F97316',
  'color.icon.accent.yellow': '#EAB308',
  'color.icon.accent.green': '#16A34A',
  'color.icon.accent.teal': '#0D9488',
  'color.icon.accent.blue': '#0EA5E9',
  'color.icon.accent.purple': '#8B5CF6',
  'color.icon.accent.magenta': '#EC4899',
  'color.icon.accent.gray': '#71717A'
} as const

export type IconColorToken = keyof typeof iconColors
