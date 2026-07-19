export interface FontConfig {
  sans?: string
  mono?: string
  display?: string
}

/**
 * Default font stack prioritizes native feel:
 * 1. System fonts (SF Pro, Segoe UI, Roboto) — instant, no download
 * 2. CSS variable escape hatch for consumers
 *
 * The consumer controls font loading via:
 * - CSS: :root { --font-sans: "Plus Jakarta Sans", sans-serif; }
 * - Theme prop: <ThemeProvider font={{ sans: '...' }} />
 */
const defaultSans = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
const defaultMono = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace'
const defaultDisplay = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

export const createFontFamily = (overrides?: FontConfig) => ({
  sans: overrides?.sans ?? `var(--font-sans, ${defaultSans})`,
  mono: overrides?.mono ?? `var(--font-mono, ${defaultMono})`,
  display: overrides?.display ?? `var(--font-display, ${defaultDisplay})`
})

export const FONT_SIZE = {
  'display-xl': '5rem', // 80px
  'display-lg': '3.5rem', // 56px
  'display-md': '2.5rem', // 40px
  headline: '1.75rem', // 28px
  'card-title': '1.375rem', // 22px
  subhead: '1.25rem', // 20px
  'body-lg': '1.125rem', // 18px
  body: '1rem', // 16px
  'body-sm': '0.875rem', // 14px
  caption: '0.75rem', // 12px
  button: '0.875rem', // 14px
  eyebrow: '0.8125rem', // 13px
  mono: '0.8125rem' // 13px
} as const

export const LINE_HEIGHT = {
  'display-xl': '1.05',
  'display-lg': '1.10',
  'display-md': '1.15',
  headline: '1.20',
  'card-title': '1.25',
  subhead: '1.40',
  'body-lg': '1.50',
  body: '1.50',
  'body-sm': '1.50',
  caption: '1.40',
  button: '1.20',
  eyebrow: '1.30',
  mono: '1.50'
} as const

export const LETTER_SPACING = {
  'display-xl': '-0.1875rem',
  'display-lg': '-0.1125rem',
  'display-md': '-0.0625rem',
  headline: '-0.0375rem',
  'card-title': '-0.025rem',
  subhead: '-0.0125rem',
  'body-lg': '-0.00625rem',
  body: '-0.003125rem',
  'body-sm': '0',
  caption: '0',
  button: '0',
  eyebrow: '0.025rem',
  mono: '0'
} as const

export const FONT_WEIGHT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const
