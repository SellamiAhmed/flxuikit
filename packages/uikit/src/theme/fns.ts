// eslint-disable-next-line no-restricted-imports
import {
  defaultVariantColorsResolver,
  getPrimaryShade,
  MantineTheme,
  parseThemeColor,
  VariantColorsResolver
} from '@mantine/core'

/** Resolve a theme color + shade to its CSS variable or hex value */
export function themeColor(theme: MantineTheme, color: string, shade: number): string {
  const parsed = parseThemeColor({ color, theme })
  if (parsed.isThemeColor && parsed.color !== undefined) {
    return `var(--mantine-color-${parsed.color}-${shade})`
  }
  return color
}

/** Custom variant resolver for Linear dark-canvas aesthetic */
export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolved = defaultVariantColorsResolver(input)
  const { variant, theme, color: inputColor } = input

  const parsedColor = parseThemeColor({
    color: inputColor || theme.primaryColor,
    theme
  })

  const colorName = parsedColor.isThemeColor ? parsedColor.color : theme.primaryColor

  // ── BRAND (lavender) ──
  if (colorName === 'brand') {
    if (variant === 'filled') {
      return {
        background: themeColor(theme, 'brand', 6),
        hover: themeColor(theme, 'brand', 5),
        color: '#ffffff',
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: 'transparent',
        hover: 'rgba(94, 106, 210, 0.12)',
        color: themeColor(theme, 'brand', 6),
        border: 'none'
      }
    }
    if (variant === 'outline') {
      return {
        background: 'transparent',
        hover: 'rgba(94, 106, 210, 0.08)',
        color: themeColor(theme, 'brand', 6),
        border: `1px solid ${themeColor(theme, 'brand', 7)}`
      }
    }
    if (variant === 'subtle') {
      return {
        background: 'transparent',
        hover: 'rgba(94, 106, 210, 0.08)',
        color: themeColor(theme, 'brand', 6),
        border: 'none'
      }
    }
    if (variant === 'transparent') {
      return {
        background: 'transparent',
        hover: 'transparent',
        color: themeColor(theme, 'brand', 6),
        border: 'none'
      }
    }
  }

  // ── DARK (charcoal surface / ink ladder) ──
  if (colorName === 'dark') {
    if (variant === 'filled') {
      return {
        background: themeColor(theme, 'dark', 8),
        hover: themeColor(theme, 'dark', 7),
        color: themeColor(theme, 'dark', 0),
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: 'transparent',
        hover: themeColor(theme, 'dark', 8),
        color: themeColor(theme, 'dark', 0),
        border: 'none'
      }
    }
    if (variant === 'outline') {
      return {
        background: 'transparent',
        hover: themeColor(theme, 'dark', 8),
        color: themeColor(theme, 'dark', 0),
        border: `1px solid ${themeColor(theme, 'dark', 6)}`
      }
    }
    if (variant === 'subtle') {
      return {
        background: 'transparent',
        hover: themeColor(theme, 'dark', 8),
        color: themeColor(theme, 'dark', 1),
        border: 'none'
      }
    }
    if (variant === 'default') {
      return {
        background: themeColor(theme, 'dark', 2),
        hover: themeColor(theme, 'dark', 3),
        color: themeColor(theme, 'dark', 0),
        border: `1px solid ${themeColor(theme, 'dark', 6)}`
      }
    }
    if (variant === 'transparent') {
      return {
        background: 'transparent',
        hover: 'transparent',
        color: themeColor(theme, 'dark', 1),
        border: 'none'
      }
    }
  }

  // ── SUCCESS ──
  if (colorName === 'success') {
    if (variant === 'filled') {
      return {
        background: themeColor(theme, 'success', 5),
        hover: themeColor(theme, 'success', 4),
        color: '#ffffff',
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: 'transparent',
        hover: 'rgba(39, 166, 68, 0.12)',
        color: themeColor(theme, 'success', 5),
        border: 'none'
      }
    }
    if (variant === 'outline') {
      return {
        background: 'transparent',
        hover: 'rgba(39, 166, 68, 0.08)',
        color: themeColor(theme, 'success', 5),
        border: `1px solid ${themeColor(theme, 'success', 5)}`
      }
    }
  }

  // ── DANGER ──
  if (colorName === 'danger') {
    if (variant === 'filled') {
      return {
        background: themeColor(theme, 'danger', 5),
        hover: themeColor(theme, 'danger', 4),
        color: '#ffffff',
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: 'transparent',
        hover: 'rgba(227, 73, 53, 0.12)',
        color: themeColor(theme, 'danger', 5),
        border: 'none'
      }
    }
  }

  // ── NEUTRAL ──
  if (colorName === 'neutral') {
    if (variant === 'filled') {
      return {
        background: themeColor(theme, 'neutral', 6),
        hover: themeColor(theme, 'neutral', 5),
        color: '#ffffff',
        border: 'none'
      }
    }
    if (variant === 'light') {
      return {
        background: 'transparent',
        hover: themeColor(theme, 'neutral', 2),
        color: themeColor(theme, 'neutral', 6),
        border: 'none'
      }
    }
  }

  return defaultResolved
}

/** Rem helper — converts px number to rem string */
export function rem(px: number): string {
  return `${px / 16}rem`
}
