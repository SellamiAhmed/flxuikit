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

export const tokens = {
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

export type TokenName = keyof typeof tokens.light

export function getToken(name: TokenName, mode: 'light' | 'dark' = 'light'): string {
  const resolvedMode = mode === 'light' || mode === 'dark' ? mode : 'light'
  return tokens[resolvedMode][name]
}

export function tokenToCssVar(name: TokenName): string {
  const cssName = name.replace(/\./g, '-')
  return `var(--ds-${cssName})`
}
