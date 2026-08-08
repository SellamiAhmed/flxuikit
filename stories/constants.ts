import type { MantineSize } from '@flex/uikit'
import { Colors } from '@flex/uikit/theme'

export const COLOR_LIST = Colors
export const VARIANT_LIST = ['filled', 'light', 'outline', 'subtle', 'default', 'transparent', 'white'] as const
export const SIZE_LIST: MantineSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
