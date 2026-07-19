/**
 * Link Tokens — Light Mode (Shadcn mapping)
 */

export const linkColors = {
  'color.link': '#2E2E2E',
  'color.link.pressed': '#1A1A1A',
  'color.link.visited': '#7C3AED',
  'color.link.visited.pressed': '#6D28D9'
} as const

export type LinkColorToken = keyof typeof linkColors
