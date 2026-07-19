export * from './primitives.js'

export * from './colors.js'
export * from './colors.dark.js'
export * from './backgrounds.js'
export * from './backgrounds.dark.js'
export * from './borders.js'
export * from './borders.dark.js'
export * from './icons.js'
export * from './icons.dark.js'
export * from './links.js'
export * from './links.dark.js'
export * from './interactions.js'
export * from './interactions.dark.js'
export * from './blankets.js'
export * from './blankets.dark.js'
export * from './charts.js'
export * from './charts.dark.js'
export * from './skeletons.js'
export * from './skeletons.dark.js'
export * from './surfaces.js'
export * from './surfaces.dark.js'
export * from './shadows.js'
export * from './shadows.dark.js'
export * from './typography.js'

// ── Runtime token map ──
import { backgroundColorsDark } from './backgrounds.dark.js'
import { backgroundColors } from './backgrounds.js'
import { blanketColorsDark } from './blankets.dark.js'
import { blanketColors } from './blankets.js'
import { borderColorsDark } from './borders.dark.js'
import { borderColors } from './borders.js'
import { chartColorsDark } from './charts.dark.js'
import { chartColors } from './charts.js'
import { textColorsDark } from './colors.dark.js'
import { textColors } from './colors.js'
import { iconColorsDark } from './icons.dark.js'
import { iconColors } from './icons.js'
import { interactionColorsDark } from './interactions.dark.js'
import { interactionColors } from './interactions.js'
import { linkColorsDark } from './links.dark.js'
import { linkColors } from './links.js'
import { shadowTokensDark } from './shadows.dark.js'
import { shadowTokens } from './shadows.js'
import { skeletonColorsDark } from './skeletons.dark.js'
import { skeletonColors } from './skeletons.js'
import { surfaceColorsDark } from './surfaces.dark.js'
import { surfaceColors } from './surfaces.js'

export const tokenMap = {
  light: {
    ...textColors,
    ...backgroundColors,
    ...borderColors,
    ...iconColors,
    ...linkColors,
    ...interactionColors,
    ...blanketColors,
    ...chartColors,
    ...skeletonColors,
    ...surfaceColors,
    ...shadowTokens
  },
  dark: {
    ...textColorsDark,
    ...backgroundColorsDark,
    ...borderColorsDark,
    ...iconColorsDark,
    ...linkColorsDark,
    ...interactionColorsDark,
    ...blanketColorsDark,
    ...chartColorsDark,
    ...skeletonColorsDark,
    ...surfaceColorsDark,
    ...shadowTokensDark
  }
} as const

export type TokenName = keyof typeof tokenMap.light

/** Get raw hex value at runtime (for JS logic, canvas, etc.) */
export function getToken(name: TokenName, mode: 'light' | 'dark' = 'light'): string {
  return tokenMap[mode][name]
}

/** Convert dot-notation token to CSS custom property string */
export function tokenToCssVar(name: TokenName): string {
  const cssName = name.replace(/\./g, '-')
  return `var(--ds-${cssName})`
}
