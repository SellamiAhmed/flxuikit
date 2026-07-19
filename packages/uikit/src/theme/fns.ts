// eslint-disable-next-line no-restricted-imports
import { defaultVariantColorsResolver, MantineTheme, parseThemeColor, VariantColorsResolver } from '@mantine/core'

import { getToken, tokenToCssVar, type TokenName } from './tokens/index.js'
export type { TokenName } from './tokens/index.js'

// ═══════════════════════════════════════════════════════
// SEMANTIC TOKEN HELPERS
// ═══════════════════════════════════════════════════════

/**
 * Returns a CSS `var(--ds-...)` reference for semantic tokens.
 * Use in inline styles or CSS-in-JS.
 *
 * @example
 * token('color.text.subtle')        // 'var(--ds-color-text-subtle)'
 * token('elevation.surface.raised') // 'var(--ds-elevation-surface-raised)'
 */
export function token(name: TokenName): string {
  return tokenToCssVar(name)
}

/**
 * Get raw hex value of a semantic token (for canvas, charts, etc.)
 */
export function tokenHex(name: TokenName, mode: 'light' | 'dark' = 'light'): string {
  return getToken(name, mode)
}

export function rem(px: number): string {
  return `${px / 16}rem`
}

// ═══════════════════════════════════════════════════════
// LEGACY PALETTE HELPERS
// ═══════════════════════════════════════════════════════
// Kept only for any remaining Mantine-scale (0-9 shade array) consumers.
// Prefer token() for anything with a --ds-* semantic equivalent — these
// values are NOT dark-mode aware on their own; token() is, via CSS
// custom property swapping in tokens.css.

export function themeColor(theme: MantineTheme, color: string, shade: number): string {
  const colors = theme.colors[color as keyof typeof theme.colors]
  if (colors && colors[shade] !== undefined) {
    return `var(--mantine-color-${color}-${shade})`
  }
  return color
}

export function themeColorHex(theme: MantineTheme, color: string, shade: number): string {
  const colors = theme.colors[color as keyof typeof theme.colors]
  if (colors && colors[shade] !== undefined) {
    return colors[shade]
  }
  return color
}

// ═══════════════════════════════════════════════════════
// VARIANT COLOR RESOLVER
// ═══════════════════════════════════════════════════════
// Drives native Mantine <Button>, <ActionIcon variant>, etc. Sources colors
// from the real design tokens (--ds-*) instead of a disconnected palette,
// so anything using Mantine's built-in variant system matches your actual
// brand/danger/success/neutral colors rather than an unrelated hue.

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolved = defaultVariantColorsResolver(input)
  const { variant, theme, color: inputColor } = input

  const parsedColor = parseThemeColor({
    color: inputColor || theme.primaryColor,
    theme
  })

  // Don't override custom/non-theme colors
  if (!parsedColor.isThemeColor) {
    return defaultResolved
  }

  const colorName = parsedColor.color

  // ── BRAND ──
  if (colorName === 'brand') {
    if (variant === 'filled') {
      return {
        background: token('color.background.brand.bold'),
        hover: token('color.background.brand.bold.hovered'),
        color: token('color.text.inverse'),
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: token('color.background.brand.subtlest'),
        hover: token('color.background.brand.subtlest.hovered'),
        color: token('color.text.brand'),
        border: 'none'
      }
    }
    if (variant === 'outline') {
      return {
        background: 'transparent',
        hover: token('color.background.brand.subtlest'),
        color: token('color.text.brand'),
        border: `1px solid ${token('color.border.brand')}`
      }
    }
    if (variant === 'subtle') {
      return {
        background: 'transparent',
        hover: token('color.background.brand.subtlest'),
        color: token('color.text.brand'),
        border: 'none'
      }
    }
    if (variant === 'transparent') {
      return {
        background: 'transparent',
        hover: 'transparent',
        color: token('color.text.brand'),
        border: 'none'
      }
    }
  }

  // ── DARK / NEUTRAL SURFACE ──
  if (colorName === 'dark') {
    if (variant === 'filled') {
      return {
        background: token('color.background.neutral.bold'),
        hover: token('color.background.neutral.bold.hovered'),
        color: token('color.text.inverse'),
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: 'transparent',
        hover: token('elevation.surface.raised.hovered'),
        color: token('color.text'),
        border: 'none'
      }
    }
    if (variant === 'outline') {
      return {
        background: 'transparent',
        hover: token('elevation.surface.raised.hovered'),
        color: token('color.text'),
        border: `1px solid ${token('color.border')}`
      }
    }
    if (variant === 'subtle') {
      return {
        background: 'transparent',
        hover: token('elevation.surface.raised.hovered'),
        color: token('color.text.subtle'),
        border: 'none'
      }
    }
    if (variant === 'default') {
      return {
        background: token('elevation.surface.raised'),
        hover: token('elevation.surface.raised.hovered'),
        color: token('color.text'),
        border: `1px solid ${token('color.border')}`
      }
    }
    if (variant === 'transparent') {
      return {
        background: 'transparent',
        hover: 'transparent',
        color: token('color.text.subtle'),
        border: 'none'
      }
    }
  }

  // ── SUCCESS ──
  if (colorName === 'success') {
    const base = {
      color: token('color.text.success'),
      border: 'none'
    }
    if (variant === 'filled') {
      return {
        ...base,
        background: token('color.background.success.bold'),
        hover: token('color.background.success.bold.hovered'),
        color: token('color.text.inverse')
      }
    }
    if (variant === 'light') {
      return {
        ...base,
        background: token('color.background.success'),
        hover: token('color.background.success.hovered')
      }
    }
    if (variant === 'outline') {
      return {
        ...base,
        background: 'transparent',
        hover: token('color.background.success'),
        border: `1px solid ${token('color.border.success')}`
      }
    }
    if (variant === 'subtle') {
      return { ...base, background: 'transparent', hover: token('color.background.success') }
    }
  }

  // ── DANGER ──
  if (colorName === 'danger') {
    const base = {
      color: token('color.text.danger'),
      border: 'none'
    }
    if (variant === 'filled') {
      return {
        ...base,
        background: token('color.background.danger.bold'),
        hover: token('color.background.danger.bold.hovered'),
        color: token('color.text.inverse')
      }
    }
    if (variant === 'light') {
      return { ...base, background: token('color.background.danger'), hover: token('color.background.danger.hovered') }
    }
    if (variant === 'outline') {
      return {
        ...base,
        background: 'transparent',
        hover: token('color.background.danger'),
        border: `1px solid ${token('color.border.danger')}`
      }
    }
    if (variant === 'subtle') {
      return { ...base, background: 'transparent', hover: token('color.background.danger') }
    }
  }

  // ── NEUTRAL ──
  if (colorName === 'neutral') {
    const base = {
      color: token('color.text'),
      border: 'none'
    }
    if (variant === 'filled') {
      return {
        ...base,
        background: token('color.background.neutral.bold'),
        hover: token('color.background.neutral.bold.hovered'),
        color: token('color.text.inverse')
      }
    }
    if (variant === 'light') {
      return { ...base, background: 'transparent', hover: token('color.background.neutral.subtle.hovered') }
    }
    if (variant === 'outline') {
      return {
        ...base,
        background: 'transparent',
        hover: token('color.background.neutral.subtle.hovered'),
        border: `1px solid ${token('color.border')}`
      }
    }
  }

  return defaultResolved
}
