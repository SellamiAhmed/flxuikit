import type { FactoryPayload } from '@mantine/core'

import type { ShadingColor } from '../theme/colors.js'
import type { Color } from '../theme/theme.js'

declare module '@mantine/core' {
  // Override Mantine's color system with your custom palette
  interface MantineThemeColorsOverride {
    colors: Record<Color | (string & {}), ShadingColor>
  }

  // Optional: Override styles prop to accept your custom type
  // Remove this if you don't have a custom styles type
  interface StylesApiPropsOverride<Payload extends FactoryPayload> {
    styles?: Partial<Record<string, React.CSSProperties>>
  }
  export interface TextInputProps {
    classNames?: Partial<Record<'wrapper' | 'input' | 'section' | string, string>>
  }
}
