/**
 * Spacing Tokens — Theme Agnostic
 *
 * Base unit: space.100 = 8px = 0.5rem
 * All tokens are multiples of the 8px base unit.
 */

export const spacingTokens = {
  /* ── Positive scale ── */
  'space.0': '0rem', // 0px
  'space.025': '0.125rem', // 2px
  'space.050': '0.25rem', // 4px
  'space.075': '0.375rem', // 6px
  'space.100': '0.5rem', // 8px  ← base unit
  'space.150': '0.75rem', // 12px
  'space.200': '1rem', // 16px
  'space.250': '1.25rem', // 20px
  'space.300': '1.5rem', // 24px
  'space.400': '2rem', // 32px
  'space.500': '2.5rem', // 40px
  'space.600': '3rem', // 48px
  'space.800': '4rem', // 64px
  'space.1000': '5rem', // 80px

  /* ── Negative scale (for overlapping, pull-out effects) ── */
  'space.negative.025': '-0.125rem', // -2px
  'space.negative.050': '-0.25rem', // -4px
  'space.negative.075': '-0.375rem', // -6px
  'space.negative.100': '-0.5rem', // -8px
  'space.negative.150': '-0.75rem', // -12px
  'space.negative.200': '-1rem', // -16px
  'space.negative.250': '-1.25rem', // -20px
  'space.negative.300': '-1.5rem', // -24px
  'space.negative.400': '-2rem' // -32px
} as const

export type SpacingToken = keyof typeof spacingTokens

/**
 * Usage ranges (from Atlassian docs):
 *
 * Small  (0–8px):   space.0 to space.100
 *   → icon+text gaps, badge padding, button groups, input padding,
 *   → card internal spacing, dropdown trigger gap
 *
 * Medium (12–24px): space.150 to space.300
 *   → button padding, avatar+content gap, card element spacing,
 *   → list item spacing in larger components
 *
 * Large  (32–80px): space.400 to space.1000
 *   → section spacing, page layout gaps, form section breaks,
 *   → sidebar content padding
 */
