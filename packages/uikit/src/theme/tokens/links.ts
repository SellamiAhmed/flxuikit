/**
 * Link Tokens — Light Mode (Shadcn mapping)
 */

export const linkColors = {
  'color.link': '#1163A6',
  'color.link.pressed': '#0F5894',
  'color.link.visited': '#7C3AED',
  'color.link.visited.pressed': '#6D28D9'
} as const

export type LinkColorToken = keyof typeof linkColors
