// eslint-disable-next-line no-restricted-imports
import {
  AccordionProps,
  DEFAULT_THEME,
  MantineTheme,
  MantineThemeOverride,
  NumberInputProps,
  PaginationProps,
  PasswordInputProps,
  createTheme,
  mergeMantineTheme
} from '@mantine/core'
import {
  ActionIconProps,
  AlertProps,
  BadgeProps,
  ButtonProps,
  CheckboxProps,
  InputProps,
  MultiSelectProps,
  NavLinkProps,
  PaperProps,
  RadioProps,
  SelectProps,
  SkeletonProps,
  StepperProps,
  SwitchProps,
  TableProps,
  TabsProps
} from '@mantine/core'

import { token, tokenHex, rem, type TokenName } from './fns.js'
import { createFontFamily, FONT_SIZE, LINE_HEIGHT, LETTER_SPACING } from './font.js'
import type { FontConfig } from './font.js'

// ═══════════════════════════════════════════════════════
// COLOR NAMES
// ═══════════════════════════════════════════════════════
// The six semantic color families your tokens/Button component use.
// Mantine still requires each to exist as a real 10-shade tuple in
// theme.colors — for `primaryColor: 'brand'` to validate, and for
// parseThemeColor()/isThemeColor checks in fns.ts's variantColorResolver
// to actually match (without this, every custom color silently falls
// through to Mantine's default resolver, never reaching the token()
// logic there).
//
// These tuples are built from real --ds-* token hex values (via
// tokenHex, not the old disconnected Linear palette), so they stay
// visually consistent with the rest of the design system. They're
// intentionally NOT used by any styles() function above/below — those
// all read live CSS var() references via token(), which stay dark-mode
// accurate without needing a rebuild. This tuple only exists to satisfy
// Mantine's own internal color-shade API surface.
export type Color = 'brand' | 'danger' | 'warning' | 'success' | 'discovery' | 'neutral'
export type ColorMap = Record<Color, [string, string, string, string, string, string, string, string, string, string]>
export const Colors: Color[] = ['brand', 'danger', 'warning', 'success', 'discovery', 'neutral']

function buildColorTuple(color: Color, mode: 'light' | 'dark'): ColorMap[Color] {
  const hex = (name: TokenName) => tokenHex(name, mode)
  const border = hex(`color.border.${color}` as TokenName)
  const text = hex(`color.text.${color}` as TokenName)
  const bold = hex(`color.background.${color}.bold` as TokenName)
  const boldHovered = hex(`color.background.${color}.bold.hovered` as TokenName)
  const boldPressed = hex(`color.background.${color}.bold.pressed` as TokenName)

  // Shade 6 = primaryShade (see createAppTheme below) → the actual bold
  // fill color. Shades 0-5 use border/text as reasonable stand-ins since
  // most of your color families don't expose a full 10-step ramp.
  return [border, border, border, border, border, text, bold, boldHovered, boldPressed, boldPressed]
}

export function buildColorMap(mode: 'light' | 'dark'): ColorMap {
  return Colors.reduce((acc, color) => {
    acc[color] = buildColorTuple(color, mode)
    return acc
  }, {} as ColorMap)
}

// ═══════════════════════════════════════════════════════
// Input size scale
// ═══════════════════════════════════════════════════════
const InputSizes = {
  xl: 48,
  lg: 44,
  md: 40,
  sm: 32,
  xs: 28
}

const InputFontSizes = {
  xl: 16,
  lg: 14,
  md: 14,
  sm: 13,
  xs: 12
}

// ═══════════════════════════════════════════════════════
// Input styles helper
// ═══════════════════════════════════════════════════════
// Input styles helper
// ═══════════════════════════════════════════════════════
function getInputStyles(theme: MantineTheme, props: Pick<InputProps, 'size' | 'variant'>, component?: string) {
  const size = InputSizes[(props.size as keyof typeof InputSizes) ?? 'md']
  const inputFontSize = InputFontSizes[(props.size as keyof typeof InputFontSizes) ?? 'md']

  const inputSize = size
    ? {
        '--input-size': `${size}px`,
        '--input-height': `${size}px`,
        '--input-line-height': `${size - 2}px`,
        '--input-fz': `${inputFontSize}px`
      }
    : {}

  const withInputSize = {
    '&:not(.mantine-Textarea-input)': {
      ...inputSize
    }
  }

  // Components whose sections (steppers, chevrons, toggles) sit flush
  // inside a single bounding box — border/bg live on the wrapper, not the input
  const wrapperOwnsBorder = ['NumberInput', 'PasswordInput'].includes(component ?? '')

  if (props.variant === 'unstyled') {
    return {
      input: {
        ...withInputSize,
        '&::placeholder': {
          color: 'var(--ds-color-text-subtlest) !important'
        }
      }
    }
  }

  if (props.variant === 'filled') {
    return {
      input: {
        '--input-bg': token('color.background.input'),
        '--input-bd-focus': token('color.border.brand'),
        ...withInputSize,
        '&::placeholder': {
          color: 'var(--ds-color-text-subtlest) !important'
        }
      }
    }
  }

  return {
    label: {
      color: token('color.text.subtle'),
      marginBottom: 6,
      lineHeight: '20px',
      fontSize: 14,
      fontWeight: 500
    },
    description: {
      color: token('color.text.subtlest'),
      fontSize: 12
    },
    // ────────────────────────────────────────────────
    // INPUT
    // TextInput: CSS module (.input) already defines
    //   :hover -> var(--ds-color-border-bold)
    //   :focus -> var(--ds-color-border-brand)
    // so we only need to supply the DEFAULT state here
    // (border, background, radius, placeholder).
    // PasswordInput/NumberInput: input itself is borderless/
    // transparent — the wrapper (below) owns all chrome.
    // ────────────────────────────────────────────────
    input: wrapperOwnsBorder
      ? {
          width: '100%',
          color: token('color.text'),
          border: 'none',
          backgroundColor: 'transparent',
          ...withInputSize,
          '&::placeholder': {
            color: 'var(--ds-color-text-subtlest) !important'
          }
        }
      : {
          width: '100%',
          color: token('color.text'),
          border: '1px solid var(--ds-color-border)',
          backgroundColor: 'var(--ds-color-background-neutral)',
          borderRadius: 'var(--ds-space-050, 8px)',
          ...withInputSize,
          '&:disabled': {
            borderColor: token('color.border.disabled'),
            backgroundColor: token('color.background.disabled'),
            color: token('color.text.disabled'),
            opacity: 1
          },
          '&::placeholder': {
            color: 'var(--ds-color-text-subtlest) !important'
          }
        },
    error: {
      color: token('color.text.danger')
    },
    // ────────────────────────────────────────────────
    // WRAPPER
    // PasswordInput's CSS module (.root) defines no border/
    // background/hover/focus at all, so the FULL set is
    // supplied here — matching Phone Number's .section /
    // .input default + hover + focus rules 1:1 via the
    // same --ds-color-* variables.
    // ────────────────────────────────────────────────
    wrapper: wrapperOwnsBorder
      ? {
          width: '100%',
          display: 'flex',
          alignItems: 'stretch',
          position: 'relative',
          ...inputSize, // ← define --input-height/--input-fz on wrapper itself
          border: '1px solid var(--ds-color-border)',
          borderRadius: 'var(--ds-space-050, 8px)',
          backgroundColor: 'var(--ds-color-background-neutral)',
          overflow: 'hidden',
          '&:hover': {
            borderColor: 'var(--ds-color-border-bold)'
          },
          '&:focus-within': {
            borderColor: 'var(--ds-color-border-brand)',
            outline: '2px solid var(--ds-color-border-focused)',
            outlineOffset: '-1px'
          },
          '&[data-disabled]': {
            borderColor: token('color.border.disabled'),
            backgroundColor: token('color.background.disabled'),
            '.mantine-Input-input, .mantine-Select-input': {
              color: token('color.text.disabled')
            }
          },
          '&[data-error]': {
            borderColor: token('color.border.danger'),
            '.mantine-Input-input, .mantine-Select-input': {
              color: token('color.text.danger'),
              '&::placeholder': {
                color: 'var(--ds-color-text-subtlest) !important'
              }
            }
          }
        }
      : {
          width: '100%',
          '&[data-error]': {
            '.mantine-Input-input, .mantine-TextInput-input': {
              color: token('color.text.danger'),
              borderColor: token('color.border.danger'),
              '&:hover': {
                borderColor: token('color.border.danger')
              },
              '&:focus, &:focus-within': {
                borderColor: token('color.border.danger')
              },
              '&::placeholder': {
                color: 'var(--ds-color-text-subtlest) !important'
              }
            }
          }
        },
    section: {
      overflow: 'hidden'
    }
  }
}

// ═══════════════════════════════════════════════════════
// THEME CONFIGURATION
// ═══════════════════════════════════════════════════════

export function createAppTheme(colorScheme: 'light' | 'dark', fontConfig?: FontConfig) {
  const font = createFontFamily(fontConfig)

  return createTheme({
    primaryColor: 'brand',
    primaryShade: 6,
    defaultRadius: 8,
    cursorType: 'pointer',
    fontFamily: font.sans,
    fontFamilyMonospace: font.mono,
    colors: buildColorMap(colorScheme),

    breakpoints: {
      xs: '36em',
      sm: '48em',
      md: '60em',
      lg: '75em',
      xl: '90em'
    },

    shadows: {
      xs: '0 1px rgb(0 0 0 / 0.05)',
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
      lg: '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)',
      xl: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)'
    },

    fontSizes: {
      xs: FONT_SIZE.caption,
      sm: FONT_SIZE['body-sm'],
      md: FONT_SIZE.body,
      lg: FONT_SIZE['body-lg'],
      xl: FONT_SIZE.subhead
    },

    spacing: {
      xxs: rem(4),
      xs: rem(8),
      sm: rem(12),
      md: rem(16),
      lg: rem(24),
      xl: rem(32),
      xxl: rem(48),
      section: rem(96)
    },

    radius: {
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '8px',
      xl: '12px',
      xxl: '9999px'
    },

    headings: {
      fontFamily: font.display,
      sizes: {
        h1: { fontSize: FONT_SIZE['display-lg'], lineHeight: LINE_HEIGHT['display-lg'] },
        h2: { fontSize: FONT_SIZE['display-md'], lineHeight: LINE_HEIGHT['display-md'] },
        h3: { fontSize: FONT_SIZE.headline, lineHeight: LINE_HEIGHT.headline },
        h4: { fontSize: FONT_SIZE['card-title'], lineHeight: LINE_HEIGHT['card-title'] },
        h5: { fontSize: FONT_SIZE.subhead, lineHeight: LINE_HEIGHT.subhead },
        h6: { fontSize: FONT_SIZE['body-lg'], lineHeight: LINE_HEIGHT['body-lg'] }
      }
    },
    // ═══════════════════════════════════════════════════════
    // COMPONENT DEFAULTS
    // ═══════════════════════════════════════════════════════
    components: {
      // ── Loader ──
      Loader: {
        defaultProps: {
          color: undefined // inherits currentColor; set via CSS `color` on parent instead of a fixed shade
        }
      },

      // ── Skeleton ──
      Skeleton: {
        styles: (theme: MantineTheme, props: SkeletonProps) => {
          const c1 = token('elevation.surface.raised')
          const c2 = token('color.border.bold')
          return {
            root: {
              backgroundColor: token('color.skeleton'),
              '&::after': {
                background: `linear-gradient(90deg, ${c1}, ${c2}, ${c1}, ${c2})`,
                backgroundSize: '400% 100%',
                animation: props.animate ? 'mantine-skeleton-shimmer 2000ms ease-in-out infinite' : 'none'
              }
            }
          }
        }
      },

      // ── Tabs ──
      Tabs: {
        styles: (theme: MantineTheme, props: TabsProps) => {
          const variant = props.variant || 'default'

          if (variant === 'default') {
            return {
              list: {
                '--tab-border-color': 'transparent',
                gap: props.orientation === 'vertical' ? 8 : 32,
                border: 0
              },
              tab: {
                color: token('color.text.subtlest'),
                fontWeight: 600,
                paddingLeft: 0,
                paddingRight: props.orientation === 'vertical' ? 8 : 0,
                '&[data-active]': {
                  color: token('color.text')
                },
                '&:hover': {
                  color: token('color.text'),
                  backgroundColor: 'transparent'
                }
              }
            }
          }

          if (variant === 'outline') {
            return {
              list: {
                '--tab-border-color': token('color.border')
              }
            }
          }

          if (variant === 'pills') {
            return {
              list: {
                gap: 4,
                backgroundColor: token('elevation.surface.sunken'),
                padding: 4,
                borderRadius: '9999px'
              },
              tab: {
                borderRadius: '9999px',
                padding: '6px 14px',
                color: token('color.text.subtlest'),
                fontSize: 14,
                fontWeight: 500,
                '&[data-active]': {
                  color: token('color.text'),
                  backgroundColor: token('elevation.surface.raised')
                },
                '&:hover:not([data-active])': {
                  color: token('color.text.subtle'),
                  backgroundColor: token('elevation.surface.raised')
                }
              }
            }
          }

          return {}
        }
      },

      // ── Notification ──
      Notification: {
        styles: (theme: MantineTheme) => {
          return {
            root: {
              padding: 8,
              paddingLeft: 28,
              backgroundColor: token('elevation.surface.raised'),
              border: `1px solid ${token('color.border')}`,
              borderRadius: '12px',

              '&:before': {
                top: 8,
                bottom: 8,
                left: 8,
                width: 4
              }
            },
            body: {
              marginRight: 8,
              lineHeight: 20,
              fontSize: 14
            },
            title: {
              fontWeight: 600,
              color: token('color.text')
            },
            description: {
              color: token('color.text.subtle')
            }
          }
        }
      },

      // ── Menu ──
      Menu: {
        styles: (theme: MantineTheme) => {
          return {
            dropdown: {
              boxShadow: theme.shadows.md,
              backgroundColor: token('elevation.surface.overlay'),
              border: `1px solid ${token('color.border')}`,
              borderRadius: '8px'
            },
            item: {
              color: token('color.text'),
              fontSize: 14,
              transition: 'background 150ms ease-in-out',
              '&:hover, &[data-hovered]': {
                backgroundColor: token('elevation.surface.raised.hovered')
              },
              '&:active, &[data-active]': {
                backgroundColor: token('elevation.surface.raised.pressed')
              }
            }
          }
        }
      },

      // ── NavLink ──
      NavLink: {
        defaultProps: {
          px: 8,
          py: 4,
          lh: 1.5,
          fw: 500,
          variant: 'light',
          component: 'button'
        },
        styles: (theme: MantineTheme, props: NavLinkProps) => {
          const rootStyles = {
            light: {
              color: token('color.text'),
              '&:hover': {
                color: token('color.text'),
                backgroundColor: token('elevation.surface.raised.hovered')
              },
              '&:active': {
                color: token('color.text'),
                backgroundColor: token('elevation.surface.raised.pressed')
              },
              '&[data-active]': {
                color: token('color.text'),
                backgroundColor: token('color.background.selected'),
                '&:hover': {
                  backgroundColor: token('color.background.selected.hovered')
                },
                '&:active': {
                  backgroundColor: token('color.background.selected.pressed')
                }
              }
            }
          }

          // @ts-ignore
          const matchedStyle = rootStyles[props.variant] || {}

          return {
            root: {
              ...matchedStyle,
              borderRadius: '8px',
              transition: 'background 150ms ease-in-out'
            },
            label: {
              lineHeight: '24px',
              fontSize: 14
            },
            section: {
              '&:where([data-position="left"])': {
                marginInlineEnd: 8
              },
              '&:where([data-position="right"])': {
                marginInlineStart: 8
              }
            },
            collapse: {
              position: 'relative',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 16,
                top: 0,
                width: 1,
                height: '100%',
                backgroundColor: token('color.border')
              }
            }
          }
        }
      },

      // ── Stepper ──
      Stepper: {
        styles: (theme: MantineTheme, props: StepperProps) => {
          return {
            stepIcon: {
              backgroundColor: token('elevation.surface.raised'),
              borderColor: token('color.border'),
              color: token('color.text.subtlest'),
              '&[data-progress]': {
                backgroundColor: token('color.background.brand.bold'),
                color: token('color.text.inverse'),
                borderColor: token('color.background.brand.bold')
              },
              '&[data-completed]': {
                backgroundColor: token('color.background.brand.subtlest'),
                color: token('color.text.brand'),
                borderColor: token('color.background.brand.bold')
              }
            },
            stepCompletedIcon: {
              color: token('color.text.brand'),
              '& > svg': {
                width: '14px !important',
                height: '14px !important'
              }
            },
            separator: {
              backgroundColor: token('color.border'),
              '&[data-active]': {
                backgroundColor: token('color.background.brand.bold')
              }
            },
            verticalSeparator: {
              borderColor: token('color.border'),
              '&[data-active]': {
                borderColor: token('color.background.brand.bold')
              }
            }
          }
        }
      },

      // ── Alert ──
      Alert: {
        defaultProps: {
          color: 'brand'
        },
        styles: (theme: MantineTheme, props: AlertProps) => {
          return {
            root: {
              borderRadius: '8px',
              border: 'none',
              borderLeft: `2px solid ${token('color.border.brand')}`,
              color: token('color.text'),
              backgroundColor: token('elevation.surface.raised')
            },
            title: {
              color: 'inherit',
              fontWeight: 600
            },
            icon: {
              color: 'inherit',
              marginRight: 4
            },
            message: {
              color: token('color.text.subtle')
            }
          }
        }
      },

      Select: {
        defaultProps: {
          size: 'md',
          withCheckIcon: true,
          checkIconPosition: 'right',
          allowDeselect: false
        },
        styles: (theme: MantineTheme, props: SelectProps) => {
          return {
            label: {
              lineHeight: '20px',
              marginBottom: 6,
              color: token('color.text.subtle'),
              fontWeight: 500
            },
            description: {
              color: token('color.text.subtlest')
            },
            section: {
              '& > svg': {
                color: `${token('color.text.subtlest')} !important`
              }
            }
            // input, option, dropdown removed — module owns these fully now
          }
        }
      },

      // ── MultiSelect ──
      MultiSelect: {
        defaultProps: {
          size: 'md',
          withCheckIcon: true,
          checkIconPosition: 'right'
        },
        styles: (theme: MantineTheme, props: MultiSelectProps) => {
          return {
            label: {
              lineHeight: '20px',
              marginBottom: 6,
              color: token('color.text.subtle'),
              fontWeight: 500
            },
            description: {
              color: token('color.text.subtlest')
            },
            section: {
              '& > svg': {
                color: `${token('color.text.subtlest')} !important`
              }
            },
            pill: {
              borderRadius: '6px',
              backgroundColor: token('elevation.surface.raised.hovered'),
              color: token('color.text')
            },
            inputField: {
              '&::placeholder': {
                color: `${token('color.text.subtlest')} !important`
              }
            }
          }
        }
      },

      // ── Inputs ──
      Input: {
        defaultProps: { size: 'md' },
        styles: getInputStyles
      },
      TextInput: {
        defaultProps: {
          size: 'md',
          inputWrapperOrder: ['label', 'input', 'description', 'error']
        },
        styles: getInputStyles
      },
      NumberInput: {
        defaultProps: { size: 'md' },
        styles: (theme: MantineTheme, props: NumberInputProps) => getInputStyles(theme, props, 'NumberInput')
      },
      PasswordInput: {
        defaultProps: { size: 'md' },
        styles: (theme: MantineTheme, props: PasswordInputProps) => getInputStyles(theme, props, 'PasswordInput')
      },
      Textarea: {
        styles: getInputStyles
      },

      // ── Badge ──
      Badge: {
        defaultProps: {
          color: 'brand',
          size: 'md',
          variant: 'light'
        },
        styles: (theme: MantineTheme, props: BadgeProps) => {
          const color = (props.color ?? theme.primaryColor) as string
          const sizes = { xs: 11, sm: 12, md: 13, lg: 14, xl: 16 }
          // @ts-ignore
          const fontSize = sizes[props.size]

          // Explicit per-color token lookup — background/border/text token
          // suffixes aren't uniform across families (only brand/selected/
          // information/discovery have a `.subtlest` bg, for example), so
          // this avoids guessing a token name that may not exist.
          type BadgeTokens = {
            bold: TokenName
            boldText: TokenName
            lightBg: TokenName
            lightBgHover: TokenName
            text: TokenName
            border: TokenName
          }
          const byColor: Record<string, BadgeTokens> = {
            brand: {
              bold: 'color.background.brand.bold',
              boldText: 'color.text.inverse',
              lightBg: 'color.background.brand.subtlest',
              lightBgHover: 'color.background.brand.subtlest.hovered',
              text: 'color.text.brand',
              border: 'color.border.brand'
            },
            danger: {
              bold: 'color.background.danger.bold',
              boldText: 'color.text.inverse',
              lightBg: 'color.background.danger',
              lightBgHover: 'color.background.danger.hovered',
              text: 'color.text.danger',
              border: 'color.border.danger'
            },
            warning: {
              bold: 'color.background.warning.bold',
              boldText: 'color.text.warning.inverse', // yellow bg needs dark text
              lightBg: 'color.background.warning',
              lightBgHover: 'color.background.warning.hovered',
              text: 'color.text.warning',
              border: 'color.border.warning'
            },
            success: {
              bold: 'color.background.success.bold',
              boldText: 'color.text.inverse',
              lightBg: 'color.background.success',
              lightBgHover: 'color.background.success.hovered',
              text: 'color.text.success',
              border: 'color.border.success'
            },
            discovery: {
              bold: 'color.background.discovery.bold',
              boldText: 'color.text.inverse',
              lightBg: 'color.background.discovery.subtle',
              lightBgHover: 'color.background.discovery.subtler.hovered',
              text: 'color.text.discovery',
              border: 'color.border.discovery'
            },
            neutral: {
              bold: 'color.background.neutral.bold',
              boldText: 'color.text.inverse',
              lightBg: 'color.background.neutral.subtle',
              lightBgHover: 'color.background.neutral.subtle.hovered',
              text: 'color.text',
              border: 'color.border'
            }
          }
          const t = byColor[color] ?? byColor.brand

          const styles = {
            dot: {
              border: 'none',
              textTransform: 'capitalize',
              fontWeight: 400,
              fontSize,
              backgroundColor: 'transparent',
              color: token('color.text.subtle'),
              padding: 0,
              borderRadius: 0,
              '&:before': {
                backgroundColor: token(t.bold)
              }
            },
            outline: {
              color: token(t.text),
              borderColor: token(t.border),
              backgroundColor: 'transparent'
            },
            light: {
              backgroundColor: token(t.lightBg),
              color: token(t.text),
              border: 'none'
            },
            filled: {
              backgroundColor: token(t.bold),
              color: token(t.boldText)
            }
          }

          return {
            root: {
              borderRadius: '9999px',
              padding: '2px 8px',
              letterSpacing: '0',
              textTransform: 'none',
              // @ts-ignore
              ...styles[props.variant]
            }
          }
        }
      },
      // ── Divider ──
      Divider: {
        defaultProps: {
          color: undefined // let default CSS var (--ds-color-border) apply
        }
      },

      // ── Card ──
      Card: {
        defaultProps: {
          shadow: 'none',
          withBorder: true
        },
        styles: (theme: MantineTheme) => {
          return {
            root: {
              backgroundColor: token('elevation.surface.raised'),
              borderColor: token('color.border'),
              borderRadius: '12px'
            },
            section: {
              borderColor: token('color.border')
            }
          }
        }
      },

      // ── Paper ──
      Paper: {
        defaultProps: {
          shadow: 'none',
          withBorder: false
        },
        styles: (theme: MantineTheme, props: PaperProps) => {
          return {
            root: {
              backgroundColor: token('elevation.surface.raised'),
              borderColor: props.withBorder ? token('color.border') : 'transparent',
              borderRadius: '12px'
            }
          }
        }
      },

      // ── Drawer ──
      Drawer: {
        defaultProps: () => ({
          overlayProps: {
            backgroundOpacity: 0.85,
            blur: 3,
            color: '#000000'
          }
        }),
        styles: () => ({
          content: {
            backgroundColor: token('elevation.surface.overlay'),
            border: `1px solid ${token('color.border')}`
          },
          header: {
            backgroundColor: token('elevation.surface.overlay'),
            borderBottom: `1px solid ${token('color.border')}`
          },
          body: {
            backgroundColor: token('elevation.surface.overlay')
          }
        })
      },

      // ── Modal ──
      Modal: {
        defaultProps: () => ({
          shadow: 'xl',
          padding: 0,
          centered: true,
          transitionProps: {
            duration: 200,
            transition: 'fade-down'
          },
          overlayProps: {
            backgroundOpacity: 0.85,
            blur: 3,
            color: '#000000'
          }
        }),
        styles: () => ({
          content: {
            border: `1px solid ${token('color.border')} !important`,
            backgroundColor: token('elevation.surface.overlay'),
            borderRadius: '12px'
          },
          header: {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            padding: '16px 16px 16px 24px',
            margin: 0,
            backgroundColor: token('elevation.surface.overlay'),
            borderBottom: `1px solid ${token('color.border')}`
          },
          title: {
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 1.5,
            color: token('color.text')
          },
          body: {
            padding: 24,
            backgroundColor: token('elevation.surface.overlay'),
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px'
          }
        })
      },

      // ── Table ──
      Table: {
        styles: (theme: MantineTheme, props: TableProps) => {
          const borderStyles = props.withTableBorder
            ? {
                borderCollapse: 'separate',
                borderSpacing: 0,
                borderRadius: '8px',
                'thead tr:first-of-type th:first-of-type': {
                  borderTopLeftRadius: '8px'
                },
                'thead tr:first-of-type th:last-of-type': {
                  borderTopRightRadius: '8px'
                }
              }
            : {}

          return {
            table: {
              ...borderStyles,
              '--table-border-color': token('color.border')
            },
            thead: {
              backgroundColor: token('elevation.surface.raised')
            },
            th: {
              color: token('color.text'),
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 16px',
              borderBottom: `2px solid ${token('color.border')}`
            },
            td: {
              color: token('color.text.subtle'),
              fontSize: 14,
              padding: '12px 16px',
              borderBottom: `1px solid ${token('color.border')}`
            },
            tr: {
              '&:where([data-with-row-border]):not(:last-of-type)': {
                td: {
                  borderBottom: `1px solid ${token('color.border')} !important`
                }
              },
              '&:hover': {
                backgroundColor: token('elevation.surface.raised.hovered')
              }
            }
          }
        }
      },

      Switch: {
        vars: (theme: MantineTheme, props: SwitchProps) => {
          return {
            root: {
              '--switch-color': token('color.background.brand.bold'),
              '--switch-bg': token('color.border.bold'),
              '--switch-thumb-bg': token('color.text.inverse'),
              '--switch-off-thumb-bg': token('elevation.surface'), // ← fixed, no 'color.' prefix
              '--switch-label-color': token('color.text')
            }
          }
        },
        styles: (theme: MantineTheme, props: SwitchProps) => ({
          trackLabel: {
            color: token('color.text.subtlest')
          }
        })
      },

      Checkbox: {
        vars: (theme: MantineTheme, props: CheckboxProps) => {
          const sizes = { xs: 14, sm: 16, md: 20, lg: 24, xl: 30 }
          const iconSizes = { xs: 6, sm: 8, md: 10, lg: 12, xl: 14 }

          const sizeKey = (props.size ?? 'sm') as keyof typeof sizes
          const size = sizes[sizeKey]
          const iconSize = iconSizes[sizeKey]

          return {
            root: {
              '--checkbox-size': rem(size),
              '--checkbox-icon-size': rem(iconSize),
              '--checkbox-color': token('color.background.brand.bold'),
              '--checkbox-icon-color':
                props.variant === 'outline' ? token('color.text.brand') : token('color.text.inverse'),
              '--checkbox-error-color': token('color.border.danger')
            }
          }
        },
        styles: (theme: MantineTheme, props: CheckboxProps) => ({
          label: {
            color: token('color.text'),
            '&[data-disabled]': {
              color: token('color.text.disabled')
            }
          },
          input: {
            borderColor: token('color.border.input'),
            '&:disabled:not(:checked)': {
              background: token('color.background.disabled'),
              borderColor: token('color.border.disabled'),
              cursor: 'not-allowed'
            },
            '&:disabled:checked': {
              color: token('color.text.disabled'),
              background: token('color.background.disabled'),
              borderColor: token('color.border.disabled'),
              cursor: 'not-allowed'
            }
          }
        })
      },
      Radio: {
        vars: (theme: MantineTheme, props: RadioProps) => {
          const sizes = { xs: 14, sm: 16, md: 20, lg: 24, xl: 30 }
          const iconSizes = { xs: 5, sm: 6, md: 8, lg: 10, xl: 12 }

          const sizeKey = (props.size ?? 'sm') as keyof typeof sizes
          const size = sizes[sizeKey]
          const iconSize = iconSizes[sizeKey]

          return {
            root: {
              '--radio-size': rem(size),
              '--radio-icon-size': rem(iconSize),
              '--radio-color': token('color.background.brand.bold'),
              '--radio-icon-color':
                props.variant === 'outline' ? token('color.text.brand') : token('color.text.inverse')
            }
          }
        },
        styles: (theme: MantineTheme, props: RadioProps) => {
          const sizes = { xs: 14, sm: 16, md: 20, lg: 24, xl: 30 }
          const sizeKey = (props.size ?? 'sm') as keyof typeof sizes
          const size = sizes[sizeKey]

          return {
            label: {
              lineHeight: `${size}px`,
              color: token('color.text'),
              '&[data-disabled]': {
                color: token('color.text.disabled')
              }
            },
            icon: {
              transform: 'var(--radio-icon-transform, scale(0.2))'
            },
            radio: {
              borderColor: token('color.border.input'),
              '&:disabled:not(:checked)': {
                background: token('color.background.disabled'),
                borderColor: token('color.border.disabled'),
                cursor: 'not-allowed'
              },
              '&:disabled:checked': {
                color: token('color.text.disabled'),
                background: token('color.background.disabled'),
                borderColor: token('color.border.disabled'),
                cursor: 'not-allowed'
              }
            }
          }
        }
      },

      // ── SegmentedControl ──
      SegmentedControl: {
        styles: (theme: MantineTheme) => {
          return {
            root: {
              backgroundColor: token('elevation.surface.sunken'),
              borderRadius: '9999px',
              padding: 2
            },
            indicator: {
              backgroundColor: token('elevation.surface.raised'),
              borderRadius: '9999px'
            },
            label: {
              color: token('color.text.subtlest') + ' !important',
              fontSize: 14,
              fontWeight: 500,
              '&[data-active]': {
                color: token('color.text') + ' !important'
              },
              '&[data-disabled]': {
                color: token('color.text.disabled') + ' !important'
              }
            },
            control: {
              '--separator-color': token('color.border')
            }
          }
        }
      },

      // ── Tooltip ──
      Tooltip: {
        defaultProps: {
          withArrow: true
        },
        styles: (theme: MantineTheme) => {
          return {
            tooltip: {
              backgroundColor: token('elevation.surface.overlay'),
              color: token('color.text'),
              border: `1px solid ${token('color.border')}`,
              borderRadius: '6px',
              fontSize: 12,
              padding: '6px 10px'
            }
          }
        }
      },

      // ── ActionIcon ──
      ActionIcon: {
        defaultProps: {
          variant: 'subtle',
          color: 'neutral',
          size: 'md'
        },
        styles: (theme: MantineTheme, props: ActionIconProps) => {
          const variantStyles = {
            default: {
              backgroundColor: token('color.background.input'),
              borderColor: token('color.border.input'),
              color: token('color.text'),
              '&:hover': {
                backgroundColor: token('color.background.input.hovered'),
                borderColor: token('color.border.bold'),
                color: token('color.text')
              },
              '&:active': {
                backgroundColor: token('elevation.surface.raised.pressed'),
                borderColor: token('color.border.bold'),
                color: token('color.text')
              },
              '&:disabled': {
                backgroundColor: token('color.background.disabled'),
                borderColor: token('color.border.disabled'),
                color: token('color.text.disabled')
              }
            },
            transparent: {
              backgroundColor: 'transparent',
              color: token('color.text.subtle'),
              '&:hover': {
                color: token('color.text')
              }
            },
            subtle: {
              backgroundColor: 'transparent',
              color: token('color.text'),
              borderColor: 'transparent',
              '&:hover': {
                backgroundColor: token('elevation.surface.raised.hovered'),
                color: token('color.text')
              },
              '&:active': {
                backgroundColor: token('elevation.surface.raised.pressed')
              },
              '&:disabled': {
                color: token('color.text.disabled'),
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                cursor: 'not-allowed'
              }
            },
            outline: {
              backgroundColor: 'transparent',
              color: token('color.text.brand'),
              border: `1px solid ${token('color.border.brand')}`,
              '&:hover': {
                backgroundColor: token('color.background.brand.subtlest'),
                color: token('color.text.brand')
              }
            },
            filled: {
              backgroundColor: token('color.background.brand.bold'),
              color: token('color.text.inverse'),
              '&:hover': {
                backgroundColor: token('color.background.brand.bold.hovered'),
                color: token('color.text.inverse')
              }
            },
            light: {
              backgroundColor: token('color.background.brand.subtlest'),
              color: token('color.text.brand'),
              '&:hover': {
                backgroundColor: token('color.background.brand.subtlest.hovered'),
                color: token('color.text.brand')
              },
              '&:active': {
                backgroundColor: token('color.background.brand.subtlest.pressed')
              }
            }
          }

          const sizes = { xs: 16, sm: 20, md: 28, lg: 32, xl: 40 }
          // @ts-ignore
          const size = sizes[props.size ?? 'md']
          // @ts-ignore
          const variantStyle = variantStyles[props.variant ?? 'default']

          return {
            root: {
              ...variantStyle,
              '--ai-size': size,
              borderRadius: '8px'
            }
          }
        }
      },

      // ── Anchor ──
      Anchor: {
        styles: () => ({
          root: {
            color: token('color.link'),
            textDecoration: 'none',
            '&:hover': {
              color: token('color.link.pressed'),
              textDecoration: 'underline'
            }
          }
        })
      },

      // ── Progress ──
      Progress: {
        styles: () => {
          return {
            root: {
              backgroundColor: token('elevation.surface.sunken')
            },
            section: {
              '&:where(:first-of-type)': {
                borderStartStartRadius: 'var(--progress-radius) !important',
                borderEndStartRadius: 'var(--progress-radius) !important'
              },
              '&:where(:last-of-type)': {
                borderStartEndRadius: 'var(--progress-radius) !important',
                borderEndEndRadius: 'var(--progress-radius) !important'
              }
            }
          }
        }
      },

      // ── HoverCard ──
      HoverCard: {
        defaultProps: {
          withArrow: true,
          shadow: 'md'
        }
      },

      // ── Popover ──
      Popover: {
        defaultProps: {
          withArrow: true,
          shadow: 'md'
        },
        styles: () => ({
          dropdown: {
            backgroundColor: token('elevation.surface.overlay'),
            border: `1px solid ${token('color.border')}`
          }
        })
      },

      // ── Accordion ──
      Accordion: {
        styles: (theme: MantineTheme, props: AccordionProps) => {
          if (props.variant === 'contained') {
            return {
              item: {
                '--item-border-color': token('color.border'),
                '--item-filled-color': 'inherit',
                backgroundColor: token('elevation.surface.raised')
              },
              control: {
                color: token('color.text'),
                '&:hover': {
                  backgroundColor: token('elevation.surface.raised.hovered')
                }
              },
              panel: {
                color: token('color.text.subtle')
              }
            }
          }
          return {
            control: {
              color: token('color.text'),
              '&:hover': {
                backgroundColor: token('elevation.surface.raised.hovered')
              }
            },
            panel: {
              color: token('color.text.subtle')
            }
          }
        }
      },

      // ── Pill ──
      Pill: {
        styles: () => {
          return {
            root: {
              backgroundColor: token('elevation.surface.raised.hovered'),
              color: token('color.text'),
              borderRadius: '6px'
            }
          }
        }
      },

      // ── Pagination ──
      Pagination: {
        styles: () => {
          return {
            control: {
              border: 'none',
              color: token('color.text'),
              borderRadius: '8px',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: token('elevation.surface.raised.hovered')
              },
              '&[data-active]': {
                color: token('color.text.inverse'),
                backgroundColor: token('color.background.brand.bold'),
                '&:hover': {
                  backgroundColor: token('color.background.brand.bold.hovered')
                }
              }
            }
          }
        }
      },

      // ── ScrollArea ──
      ScrollArea: {
        styles: () => ({
          scrollbar: {
            backgroundColor: 'transparent'
          },
          thumb: {
            backgroundColor: token('color.border.bold'),
            borderRadius: '4px'
          }
        })
      }
    }
  })
}

// ═══════════════════════════════════════════════════════
// useTheme hook
// ═══════════════════════════════════════════════════════
// No more isLight/colorScheme branching or palette-swapping here — every
// style above resolves through token(), which returns a `var(--ds-*)`
// reference. That reference is already dark-mode-safe: tokens.css swaps
// its value automatically based on the `data-mantine-color-scheme`
// attribute Mantine sets on <html>. One less place for light/dark to
// desync. `colorScheme` is accepted for API compatibility / caching keys
// but no longer drives which palette object gets merged in.
export type Theme = MantineTheme

export function useTheme(colorScheme: 'light' | 'dark', fontConfig?: FontConfig): Theme {
  const appTheme = createAppTheme(colorScheme, fontConfig)
  const mergedTheme = mergeMantineTheme(DEFAULT_THEME, appTheme)
  return mergedTheme as Theme
}
export type { MantineThemeOverride }
