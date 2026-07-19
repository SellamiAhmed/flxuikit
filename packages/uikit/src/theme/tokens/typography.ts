/**
 * Typography Tokens (Shadcn-aligned)
 *
 * Font family: Inter for UI text.
 */

/* ── Font Families ── */
export const fontFamily = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
} as const

/* ── Font Weights ── */
export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 600
} as const

/* ── Font Sizes (rem) ── */
export const fontSize = {
  'font.size.100': '0.75rem',
  'font.size.200': '0.875rem',
  'font.size.300': '1rem',
  'font.size.400': '1.25rem',
  'font.size.500': '1.5rem',
  'font.size.600': '2rem',
  'font.size.700': '2.25rem'
} as const

/* ── Line Heights (rem) ── */
export const lineHeight = {
  'font.lineHeight.100': '1rem',
  'font.lineHeight.200': '1.25rem',
  'font.lineHeight.300': '1.5rem',
  'font.lineHeight.400': '1.75rem',
  'font.lineHeight.500': '2rem',
  'font.lineHeight.600': '2.5rem'
} as const

/* ── Composite Heading Tokens ── */
export const headingTokens = {
  'font.heading.xxlarge': {
    fontSize: '2.25rem',
    lineHeight: '2.5rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.heading.xlarge': {
    fontSize: '2rem',
    lineHeight: '2.25rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.heading.large': {
    fontSize: '1.5rem',
    lineHeight: '1.875rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.heading.medium': {
    fontSize: '1.25rem',
    lineHeight: '1.625rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.heading.small': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.heading.xsmall': {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.heading.xxsmall': {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  }
} as const

/* ── Composite Body Tokens ── */
export const bodyTokens = {
  'font.body.large': {
    fontSize: '1rem',
    lineHeight: '1.625rem',
    fontWeight: 400,
    fontFamily: fontFamily.sans,
    paragraphSpacing: '1rem'
  },
  'font.body': {
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    fontWeight: 400,
    fontFamily: fontFamily.sans,
    paragraphSpacing: '0.75rem'
  },
  'font.body.small': {
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    fontWeight: 400,
    fontFamily: fontFamily.sans,
    paragraphSpacing: '0.5rem'
  }
} as const

/* ── Composite Metric Tokens ── */
export const metricTokens = {
  'font.metric.large': {
    fontSize: '1.75rem',
    lineHeight: '2rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.metric.medium': {
    fontSize: '1.5rem',
    lineHeight: '1.75rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  },
  'font.metric.small': {
    fontSize: '1rem',
    lineHeight: '1.25rem',
    fontWeight: 600,
    fontFamily: fontFamily.sans
  }
} as const

/* ── Composite Code Token ── */
export const codeTokens = {
  'font.code': {
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    fontWeight: 400,
    fontFamily: fontFamily.mono
  }
} as const

export type HeadingToken = keyof typeof headingTokens
export type BodyToken = keyof typeof bodyTokens
export type MetricToken = keyof typeof metricTokens
export type CodeToken = keyof typeof codeTokens
export type TypographyToken = HeadingToken | BodyToken | MetricToken | CodeToken

export function getFontShorthand(token: TypographyToken): string {
  const all = { ...headingTokens, ...bodyTokens, ...metricTokens, ...codeTokens }
  const t = all[token]
  return `${t.fontWeight} ${t.fontSize}/${t.lineHeight} ${t.fontFamily}`
}

export function getTypographyVars(token: TypographyToken): Record<string, string> {
  const all = { ...headingTokens, ...bodyTokens, ...metricTokens, ...codeTokens }
  const t = all[token]
  return {
    '--ds-font-size': t.fontSize,
    '--ds-line-height': t.lineHeight,
    '--ds-font-weight': String(t.fontWeight),
    '--ds-font-family': t.fontFamily
  }
}
