/**
 * Semantic Color Tokens — Light Mode (Shadcn mapping)
 */

export const textColors = {
  // Base text hierarchy
  'color.text': '#09090B',
  'color.text.subtle': '#71717A',
  'color.text.subtlest': '#A1A1AA',
  'color.text.inverse': '#FFFFFF',
  'color.text.disabled': '#A1A1AA',

  // Interactive / Brand
  'color.text.selected': '#FFFFFF',
  'color.text.brand': '#1163A6',

  // Status
  'color.text.danger': '#DC2626',
  'color.text.danger.bolder': '#B91C1C',
  'color.text.warning': '#92400E',
  'color.text.warning.bolder': '#D97706',
  'color.text.warning.inverse': '#09090B',
  'color.text.success': '#16A34A',
  'color.text.success.bolder': '#15803D',
  'color.text.discovery': '#7C3AED',
  'color.text.discovery.bolder': '#6D28D9',
  'color.text.information': '#3730A3',
  'color.text.information.bolder': '#312E81',

  // Accent text (decorative)
  'color.text.accent.red': '#DC2626',
  'color.text.accent.red.bolder': '#B91C1C',
  'color.text.accent.orange': '#F97316',
  'color.text.accent.orange.bolder': '#EA580C',
  'color.text.accent.yellow': '#EAB308',
  'color.text.accent.yellow.bolder': '#CA8A04',
  'color.text.accent.lime': '#65A30D',
  'color.text.accent.lime.bolder': '#4D7C0F',
  'color.text.accent.green': '#16A34A',
  'color.text.accent.green.bolder': '#15803D',
  'color.text.accent.teal': '#0D9488',
  'color.text.accent.teal.bolder': '#0F766E',
  'color.text.accent.blue': '#0EA5E9',
  'color.text.accent.blue.bolder': '#0284C7',
  'color.text.accent.purple': '#8B5CF6',
  'color.text.accent.purple.bolder': '#7C3AED',
  'color.text.accent.magenta': '#EC4899',
  'color.text.accent.magenta.bolder': '#DB2777',
  'color.text.accent.gray': '#52525B',
  'color.text.accent.gray.bolder': '#3F3F46'
} as const

export type TextColorToken = keyof typeof textColors
