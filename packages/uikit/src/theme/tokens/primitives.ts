/**
 * Primitive Color Scales (Shadcn-aligned)
 *
 * Keep using semantic tokens in component code.
 */

export const neutral = {
  N0: '#FFFFFF',
  N100: '#FAFAFA',
  N200: '#F4F4F5',
  N300: '#E4E4E7',
  N400: '#D4D4D8',
  N500: '#A1A1AA',
  N600: '#71717A',
  N700: '#52525B',
  N800: '#3F3F46',
  N900: '#27272A',
  N1000: '#18181B',
  N1100: '#09090B'
} as const

export const darkNeutral = {
  DN0: '#09090B',
  DN100: '#18181B',
  DN200: '#27272A',
  DN300: '#3F3F46',
  DN400: '#52525B',
  DN500: '#71717A',
  DN600: '#A1A1AA',
  DN700: '#D4D4D4',
  DN800: '#E5E5E5',
  DN900: '#F4F4F5',
  DN1000: '#FAFAFA',
  DN1100: '#FFFFFF'
} as const

export const neutralA = {
  N400A: 'rgba(161, 161, 170, 0.5)'
} as const

export const darkNeutralA = {
  DN400A: 'rgba(82, 82, 91, 0.65)'
} as const

export const red = {
  R100: '#FEF2F2',
  R200: '#FEE2E2',
  R300: '#FECACA',
  R400: '#FCA5A5',
  R500: '#EF4444',
  R600: '#DC2626',
  R700: '#B91C1C',
  R800: '#991B1B',
  R900: '#7F1D1D'
} as const

export const orange = {
  O100: '#FFF7ED',
  O200: '#FFEDD5',
  O300: '#FED7AA',
  O400: '#FDBA74',
  O500: '#FB923C',
  O600: '#F97316',
  O700: '#EA580C',
  O800: '#C2410C',
  O900: '#9A3412'
} as const

export const yellow = {
  Y100: '#FEFCE8',
  Y200: '#FEF9C3',
  Y300: '#FEF08A',
  Y400: '#FDE047',
  Y500: '#FACC15',
  Y600: '#EAB308',
  Y700: '#CA8A04',
  Y800: '#A16207',
  Y900: '#854D0E'
} as const

export const lime = {
  L100: '#F7FEE7',
  L200: '#ECFCCB',
  L300: '#D9F99D',
  L400: '#BEF264',
  L500: '#A3E635',
  L600: '#84CC16',
  L700: '#65A30D',
  L800: '#4D7C0F',
  L900: '#3F6212'
} as const

export const green = {
  G100: '#F0FDF4',
  G200: '#DCFCE7',
  G300: '#BBF7D0',
  G400: '#86EFAC',
  G500: '#4ADE80',
  G600: '#22C55E',
  G700: '#16A34A',
  G800: '#15803D',
  G900: '#14532D'
} as const

export const teal = {
  T100: '#F0FDFA',
  T200: '#CCFBF1',
  T300: '#99F6E4',
  T400: '#5EEAD4',
  T500: '#2DD4BF',
  T600: '#14B8A6',
  T700: '#0D9488',
  T800: '#0F766E',
  T900: '#134E4A'
} as const

export const blue = {
  B100: '#F0F9FF',
  B200: '#E0F2FE',
  B300: '#BAE6FD',
  B400: '#7DD3FC',
  B500: '#38BDF8',
  B600: '#0EA5E9',
  B700: '#0284C7',
  B800: '#0369A1',
  B900: '#0C4A6E'
} as const

export const purple = {
  P100: '#F5F3FF',
  P200: '#EDE9FE',
  P300: '#DDD6FE',
  P400: '#C4B5FD',
  P500: '#A78BFA',
  P600: '#8B5CF6',
  P700: '#7C3AED',
  P800: '#6D28D9',
  P900: '#4C1D95'
} as const

export const magenta = {
  M100: '#FDF2F8',
  M200: '#FCE7F3',
  M300: '#FBCFE8',
  M400: '#F9A8D4',
  M500: '#F472B6',
  M600: '#EC4899',
  M700: '#DB2777',
  M800: '#BE185D',
  M900: '#831843'
} as const

export type PrimitiveColor =
  | keyof typeof neutral
  | keyof typeof darkNeutral
  | keyof typeof red
  | keyof typeof orange
  | keyof typeof yellow
  | keyof typeof lime
  | keyof typeof green
  | keyof typeof teal
  | keyof typeof blue
  | keyof typeof purple
  | keyof typeof magenta
