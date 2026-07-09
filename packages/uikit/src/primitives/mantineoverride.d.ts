// packages/uikit/src/primitives/mantineoverride.d.ts

import type { MantineColorsTuple } from '@mantine/core'

import type { ShadingColor } from '../theme/colors.js'
import type { Color } from '../theme/theme.js'

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<Color | (string & {}), ShadingColor>
  }
}
