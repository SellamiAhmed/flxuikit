/**
 * Elevation Shadow Tokens — Light Mode (Shadcn mapping)
 */

export const shadowTokens = {
  'elevation.shadow.overflow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'elevation.shadow.overflow.perimeter': 'rgb(0 0 0 / 0.05)',
  'elevation.shadow.overflow.spread': 'rgb(0 0 0 / 0.08)',
  'elevation.shadow.overlay': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
  'elevation.shadow.raised': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)'
} as const

export type ShadowToken = keyof typeof shadowTokens
