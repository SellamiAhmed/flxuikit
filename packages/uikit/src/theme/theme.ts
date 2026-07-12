// eslint-disable-next-line no-restricted-imports
import {
  AccordionProps,
  DEFAULT_THEME,
  MantineTheme,
  MantineThemeOverride,
  PaginationProps,
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

// NOTE: inverted naming — `light` var holds light-mode palette, `dark` var holds dark-mode palette
import * as darkPalette from './colors.dark.js'
import * as lightPalette from './colors.js'
import { themeColor, rem } from './fns.js'
import { createFontFamily, FONT_SIZE, LINE_HEIGHT, LETTER_SPACING } from './font.js'
import type { FontConfig } from './font.js'

export type ColorMap = typeof lightPalette
export type Color = keyof ColorMap
export const Colors = Object.keys(lightPalette) as Color[]

// ═══════════════════════════════════════════════════════
// Input size scale (Linear compact spec)
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
function getInputStyles(theme: MantineTheme, props: Pick<InputProps, 'size' | 'variant'>) {
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

  const passwordInnerInputSize = size
    ? {
        height: size - 2,
        minHeight: size - 2,
        lineHeight: `${size - 2}px`,
        fontSize: inputFontSize
      }
    : {}

  if (props.variant === 'unstyled') {
    return {
      input: {
        ...withInputSize,
        '& .mantine-PasswordInput-innerInput': {
          ...passwordInnerInputSize
        },
        '&::placeholder': {
          color: `${themeColor(theme, 'dark', 2)} !important`
        }
      }
    }
  }

  if (props.variant === 'filled') {
    return {
      input: {
        '--input-bg': themeColor(theme, 'dark', 8),
        '--input-bd-focus': themeColor(theme, 'brand', 7),
        ...withInputSize,
        '& .mantine-PasswordInput-innerInput': {
          ...passwordInnerInputSize
        },
        '&::placeholder': {
          color: `${themeColor(theme, 'dark', 2)} !important`
        }
      }
    }
  }

  return {
    label: {
      color: themeColor(theme, 'dark', 1),
      marginBottom: 6,
      lineHeight: '20px',
      fontSize: 14,
      fontWeight: 500
    },
    description: {
      color: themeColor(theme, 'dark', 2),
      fontSize: 12
    },
    input: {
      color: themeColor(theme, 'dark', 0),
      border: `1px solid ${themeColor(theme, 'dark', 6)}`,
      backgroundColor: themeColor(theme, 'dark', 8),
      borderRadius: '8px',

      ...withInputSize,

      '&:hover': {
        borderColor: themeColor(theme, 'dark', 5)
      },
      '&:focus, &:focus-within': {
        borderColor: themeColor(theme, 'brand', 7),
        outline: `2px solid rgba(94, 105, 209, 0.5)`,
        outlineOffset: '-1px'
      },
      '&:disabled': {
        borderColor: themeColor(theme, 'dark', 6),
        backgroundColor: themeColor(theme, 'dark', 7),
        color: themeColor(theme, 'dark', 2),
        opacity: 1
      },
      '&::placeholder': {
        color: `${themeColor(theme, 'dark', 2)} !important`
      },

      '& .mantine-PasswordInput-innerInput': {
        ...passwordInnerInputSize,
        '&::placeholder': {
          color: `${themeColor(theme, 'dark', 2)} !important`
        }
      }
    },
    error: {
      color: themeColor(theme, 'danger', 5)
    },
    wrapper: {
      '&[data-error]': {
        '.mantine-Input-input, .mantine-TextInput-input, .mantine-PasswordInput-innerInput': {
          color: themeColor(theme, 'danger', 5),
          borderColor: themeColor(theme, 'danger', 4),

          '& .mantine-PasswordInput-innerInput': {
            borderColor: 'transparent'
          },
          '&:hover': {
            borderColor: themeColor(theme, 'danger', 4)
          },
          '&:focus, &:focus-within': {
            borderColor: themeColor(theme, 'danger', 4)
          },
          '&::placeholder': {
            color: `${themeColor(theme, 'dark', 2)} !important`
          }
        }
      }
    },
    section: {
      overflow: 'hidden',
      '& .mantine-PasswordInput-visibilityToggle svg': {
        color: themeColor(theme, 'dark', 2)
      }
    }
  }
}

// ═══════════════════════════════════════════════════════
// THEME CONFIGURATION
// ═══════════════════════════════════════════════════════

export function createAppTheme(fontConfig?: FontConfig) {
  const font = createFontFamily(fontConfig)

  return createTheme({
    primaryColor: 'brand',
    primaryShade: 6,
    defaultRadius: 8,
    cursorType: 'pointer',
    fontFamily: font.sans,
    fontFamilyMonospace: font.mono,

    breakpoints: {
      xs: '36em',
      sm: '48em',
      md: '60em',
      lg: '75em',
      xl: '90em'
    },

    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.05)',
      sm: '0 1px 3px rgba(0,0,0,0.1)',
      md: '0 4px 8px -2px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)',
      lg: '0 8px 16px -4px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)',
      xl: '0 12px 24px -6px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)'
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
      lg: '12px',
      xl: '16px',
      xxl: '24px'
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
      // In your theme.ts components section
      Button: {
        defaultProps: {
          size: 'sm',
          variant: 'filled'
        },
        styles: (theme: MantineTheme, props: ButtonProps) => {
          const color = props.color || theme.primaryColor
          const isBrand = color === 'brand'

          // Linear uses pill shape for ALL buttons
          const isPill = true

          // Size scale (Linear compact)
          const sizeMap = {
            xs: { height: 24, padding: '0 8px', fontSize: 12 },
            sm: { height: 28, padding: '0 12px', fontSize: 13 },
            md: { height: 32, padding: '0 16px', fontSize: 13 },
            lg: { height: 40, padding: '0 20px', fontSize: 14 }
          }
          const s = sizeMap[props.size as keyof typeof sizeMap] || sizeMap.sm

          // Base: pill shape, no lift, subtle transitions
          const base = {
            height: s.height,
            padding: s.padding,
            fontSize: s.fontSize,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            borderRadius: isPill ? '9999px' : '6px',
            transition: 'background-color 100ms ease, opacity 100ms ease',
            '&:active': {
              transform: 'scale(0.98)'
            },
            '&:disabled, &[data-disabled]': {
              opacity: 0.5,
              cursor: 'not-allowed'
            }
          }

          // ── FILLED (Lavender) ──
          if (props.variant === 'filled') {
            if (isBrand) {
              return {
                root: {
                  ...base,
                  background: 'linear-gradient(180deg, #8b93ff 0%, #6b75e6 100%)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                  '&:hover': {
                    background: 'linear-gradient(180deg, #7a82f0 0%, #5e68d4 100%)'
                  },
                  '&:active': {
                    background: 'linear-gradient(180deg, #6b75e6 0%, #5a63c7 100%)',
                    transform: 'scale(0.98)'
                  }
                },
                label: { fontWeight: 500 }
              }
            }

            // Non-brand filled (rare in Linear)
            return {
              root: {
                ...base,
                backgroundColor: themeColor(theme, color, 6),
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: themeColor(theme, color, 5)
                }
              }
            }
          }

          // ── DEFAULT / OUTLINE (Secondary) ──
          if (props.variant === 'default' || props.variant === 'outline') {
            return {
              root: {
                ...base,
                backgroundColor: 'transparent',
                border: `1px solid ${themeColor(theme, 'dark', 6)}`,
                color: themeColor(theme, 'dark', 2),
                '&:hover': {
                  backgroundColor: themeColor(theme, 'dark', 8),
                  borderColor: themeColor(theme, 'dark', 5),
                  color: themeColor(theme, 'dark', 1)
                },
                '&:active': {
                  backgroundColor: themeColor(theme, 'dark', 7)
                }
              }
            }
          }

          // ── SUBTLE (Tertiary) ──
          if (props.variant === 'subtle') {
            return {
              root: {
                ...base,
                backgroundColor: 'transparent',
                border: 'none',
                color: themeColor(theme, 'dark', 2),
                '&:hover': {
                  backgroundColor: themeColor(theme, 'dark', 8),
                  color: themeColor(theme, 'dark', 2)
                }
              }
            }
          }

          // ── LIGHT ──
          if (props.variant === 'light') {
            return {
              root: {
                ...base,
                backgroundColor: 'rgba(94,106,210,0.1)',
                border: 'none',
                color: themeColor(theme, 'brand', 5),
                '&:hover': {
                  backgroundColor: 'rgba(94,106,210,0.15)'
                }
              }
            }
          }

          return { root: base }
        }
      },

      // ── Loader ──
      Loader: {
        defaultProps: {
          color: 'dark.5'
        }
      },

      // ── Skeleton ──
      Skeleton: {
        styles: (theme: MantineTheme, props: SkeletonProps) => {
          const c1 = themeColor(theme, 'dark', 7) // surface-3
          const c2 = themeColor(theme, 'dark', 5) // hairline-strong
          return {
            root: {
              backgroundColor: themeColor(theme, 'dark', 8),
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
                color: themeColor(theme, 'dark', 2), // ink-subtle
                fontWeight: 600,
                paddingLeft: 0,
                paddingRight: props.orientation === 'vertical' ? 8 : 0,
                '&[data-active]': {
                  color: themeColor(theme, 'dark', 0) // ink
                },
                '&:hover': {
                  color: themeColor(theme, 'dark', 0),
                  backgroundColor: 'transparent'
                }
              }
            }
          }

          if (variant === 'outline') {
            return {
              list: {
                '--tab-border-color': themeColor(theme, 'dark', 6)
              }
            }
          }

          if (variant === 'pills') {
            // Linear pricing-tab style: pill toggle
            return {
              list: {
                gap: 4,
                backgroundColor: themeColor(theme, 'dark', 9), // canvas
                padding: 4,
                borderRadius: '9999px'
              },
              tab: {
                borderRadius: '9999px',
                padding: '6px 14px',
                color: themeColor(theme, 'dark', 2), // ink-subtle
                fontSize: 14,
                fontWeight: 500,
                '&[data-active]': {
                  color: themeColor(theme, 'dark', 0), // ink
                  backgroundColor: themeColor(theme, 'dark', 8) // surface-2
                },
                '&:hover:not([data-active])': {
                  color: themeColor(theme, 'dark', 1), // ink-muted
                  backgroundColor: themeColor(theme, 'dark', 8)
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
              backgroundColor: themeColor(theme, 'dark', 8), // surface-2
              border: `1px solid ${themeColor(theme, 'dark', 6)}`,
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
              color: themeColor(theme, 'dark', 0) // ink
            },
            description: {
              color: themeColor(theme, 'dark', 1) // ink-muted
            }
          }
        }
      },

      // ── Menu ──
      Menu: {
        styles: (theme: MantineTheme) => {
          const bgHoverColor = themeColor(theme, 'dark', 7) // surface-3
          const bgActiveColor = themeColor(theme, 'dark', 6) // hairline
          return {
            dropdown: {
              boxShadow: theme.shadows.md,
              backgroundColor: themeColor(theme, 'dark', 8), // surface-2
              border: `1px solid ${themeColor(theme, 'dark', 6)}`,
              borderRadius: '8px'
            },
            item: {
              color: themeColor(theme, 'dark', 0),
              fontSize: 14,
              transition: 'background 150ms ease-in-out',
              '&:hover, &[data-hovered]': {
                backgroundColor: bgHoverColor
              },
              '&:active, &[data-active]': {
                backgroundColor: bgActiveColor
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
          const withThemeColor = (shade: number) => themeColor(theme, props.color ?? theme.primaryColor, shade)

          const rootStyles = {
            light: {
              color: withThemeColor(0),
              '&:hover': {
                color: withThemeColor(0),
                backgroundColor: themeColor(theme, 'dark', 7)
              },
              '&:active': {
                color: withThemeColor(0),
                backgroundColor: themeColor(theme, 'dark', 6)
              },
              '&[data-active]': {
                color: withThemeColor(0),
                backgroundColor: themeColor(theme, 'dark', 6),
                '&:hover': {
                  backgroundColor: themeColor(theme, 'dark', 6)
                },
                '&:active': {
                  backgroundColor: themeColor(theme, 'dark', 6)
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
                backgroundColor: themeColor(theme, 'dark', 6)
              }
            }
          }
        }
      },

      // ── Stepper ──
      Stepper: {
        styles: (theme: MantineTheme, props: StepperProps) => {
          const color = props.color || theme.primaryColor
          return {
            stepIcon: {
              backgroundColor: themeColor(theme, 'dark', 8),
              borderColor: themeColor(theme, 'dark', 6),
              color: themeColor(theme, 'dark', 2),
              '&[data-progress]': {
                backgroundColor: themeColor(theme, color, 6),
                color: '#ffffff',
                borderColor: themeColor(theme, color, 6)
              },
              '&[data-completed]': {
                backgroundColor: themeColor(theme, color, 1),
                color: themeColor(theme, color, 6),
                borderColor: themeColor(theme, color, 6)
              }
            },
            stepCompletedIcon: {
              color: themeColor(theme, color, 6),
              '& > svg': {
                width: '14px !important',
                height: '14px !important'
              }
            },
            separator: {
              backgroundColor: themeColor(theme, 'dark', 6),
              '&[data-active]': {
                backgroundColor: themeColor(theme, color, 6)
              }
            },
            verticalSeparator: {
              borderColor: themeColor(theme, 'dark', 6),
              '&[data-active]': {
                borderColor: themeColor(theme, color, 6)
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
          const color = props.color || theme.primaryColor
          return {
            root: {
              borderRadius: '8px',
              border: 'none',
              borderLeft: `2px solid ${themeColor(theme, color, 6)}`,
              color: themeColor(theme, 'dark', 0),
              backgroundColor: themeColor(theme, 'dark', 8)
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
              color: themeColor(theme, 'dark', 1)
            }
          }
        }
      },

      // ── Select ──
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
              color: themeColor(theme, 'dark', 1),
              fontWeight: 500
            },
            description: {
              color: themeColor(theme, 'dark', 2)
            },
            input: {
              color: themeColor(theme, 'dark', 0),
              backgroundColor: themeColor(theme, 'dark', 8),
              border: `1px solid ${themeColor(theme, 'dark', 6)}`,
              borderRadius: '8px',

              ...(props.variant === 'unstyled' && {
                border: 'none',
                '&:disabled': {
                  color: themeColor(theme, 'dark', 2)
                }
              }),
              ...(props.variant === 'filled' && {
                backgroundColor: themeColor(theme, 'dark', 7),
                borderColor: 'transparent',
                '&:disabled': {
                  color: themeColor(theme, 'dark', 2),
                  cursor: 'not-allowed'
                }
              }),

              '&:hover': {
                borderColor: themeColor(theme, 'dark', 5)
              },
              '&:focus, &:focus-within': {
                borderColor: themeColor(theme, 'brand', 7),
                outline: `2px solid rgba(94, 105, 209, 0.5)`
              }
            },
            option: {
              transition: 'background 150ms ease-in-out',
              color: themeColor(theme, 'dark', 0),
              fontSize: 14,
              '&:hover': {
                color: themeColor(theme, 'dark', 0),
                backgroundColor: themeColor(theme, 'dark', 7)
              },
              '&[data-checked]': {
                color: themeColor(theme, 'dark', 0),
                fontWeight: 600,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: themeColor(theme, 'dark', 7)
                },
                '& > svg': {
                  color: themeColor(theme, 'brand', 6),
                  opacity: 1
                }
              }
            },
            section: {
              '& > svg': {
                color: `${themeColor(theme, 'dark', 2)} !important`
              }
            },
            dropdown: {
              backgroundColor: themeColor(theme, 'dark', 8),
              border: `1px solid ${themeColor(theme, 'dark', 6)}`,
              boxShadow: theme.shadows.md
            }
          }
        }
      },

      // ── MultiSelect ──
      MultiSelect: {
        defaultProps: {
          size: 'md',
          withCheckIcon: false
        },
        styles: (theme: MantineTheme, props: MultiSelectProps) => {
          return {
            label: {
              fontSize: 14,
              marginBottom: 6,
              color: themeColor(theme, 'dark', 1),
              fontWeight: 500
            },
            inputField: {
              '&::placeholder': {
                color: `${themeColor(theme, 'dark', 2)} !important`
              }
            },
            pill: {
              borderRadius: '6px',
              backgroundColor: themeColor(theme, 'dark', 7),
              color: themeColor(theme, 'dark', 0)
            },
            section: {
              '& > svg': {
                color: `${themeColor(theme, 'dark', 2)} !important`
              }
            },
            option: {
              '&[data-checked]': {
                fontWeight: 600
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
      PasswordInput: {
        defaultProps: { size: 'md' },
        styles: getInputStyles
      },
      NumberInput: {
        defaultProps: { size: 'md' },
        styles: getInputStyles
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
          const color = props.color ?? theme.primaryColor
          const mainShade = color === 'dark' ? 0 : 6

          const sizes = {
            xs: 11,
            sm: 12,
            md: 13,
            lg: 14,
            xl: 16
          }

          // @ts-ignore
          const fontSize = sizes[props.size]

          const styles = {
            dot: {
              border: 'none',
              textTransform: 'capitalize',
              fontWeight: 400,
              fontSize,
              backgroundColor: 'transparent',
              color: themeColor(theme, 'dark', 1),
              padding: 0,
              borderRadius: 0,
              '&:before': {
                backgroundColor: themeColor(theme, color, 6)
              }
            },
            outline: {
              color: themeColor(theme, color, mainShade),
              borderColor: themeColor(theme, color, 4),
              backgroundColor: 'transparent'
            },
            light: {
              backgroundColor: themeColor(theme, 'dark', 8),
              color: themeColor(theme, color, mainShade),
              border: 'none'
            },
            filled: {
              backgroundColor: themeColor(theme, color, mainShade),
              color: color === 'dark' ? themeColor(theme, 'dark', 9) : '#ffffff'
            }
          }

          return {
            root: {
              borderRadius: '9999px', // pill
              padding: '2px 8px',
              letterSpacing: '0',
              textTransform: 'none',
              // @ts-ignore
              ...styles[props.variant]
            }
          }
        }
      },

      // ── Checkbox ──
      Checkbox: {
        styles: (theme: MantineTheme, props: CheckboxProps) => {
          const withThemeColor = (shade: number) => themeColor(theme, props.color ?? theme.primaryColor, shade)
          return {
            input: {
              borderRadius: 4,
              borderColor: themeColor(theme, 'dark', 6),
              backgroundColor: themeColor(theme, 'dark', 8),

              '&:checked:not(:disabled)': {
                backgroundColor: withThemeColor(6),
                borderColor: withThemeColor(6)
              },
              '&:disabled:checked': {
                backgroundColor: themeColor(theme, 'dark', 5),
                borderColor: themeColor(theme, 'dark', 5)
              }
            },
            label: {
              color: themeColor(theme, 'dark', 0),
              '&[data-disabled]': {
                color: themeColor(theme, 'dark', 3)
              }
            }
          }
        }
      },

      // ── Divider ──
      Divider: {
        defaultProps: {
          color: 'dark.6'
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
              backgroundColor: themeColor(theme, 'dark', 8), // surface-2
              borderColor: themeColor(theme, 'dark', 6), // hairline
              borderRadius: '12px' // lg
            },
            section: {
              borderColor: themeColor(theme, 'dark', 6)
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
              backgroundColor: themeColor(theme, 'dark', 8),
              borderColor: props.withBorder ? themeColor(theme, 'dark', 6) : 'transparent',
              borderRadius: '12px'
            }
          }
        }
      },

      // ── Drawer ──
      Drawer: {
        defaultProps: (theme: MantineTheme) => ({
          overlayProps: {
            backgroundOpacity: 0.85,
            blur: 3,
            color: '#000000'
          }
        }),
        styles: (theme: MantineTheme) => ({
          content: {
            backgroundColor: themeColor(theme, 'dark', 8),
            border: `1px solid ${themeColor(theme, 'dark', 6)}`
          },
          header: {
            backgroundColor: themeColor(theme, 'dark', 8),
            borderBottom: `1px solid ${themeColor(theme, 'dark', 6)}`
          },
          body: {
            backgroundColor: themeColor(theme, 'dark', 8)
          }
        })
      },

      // ── Modal ──
      Modal: {
        defaultProps: (theme: MantineTheme) => ({
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
        styles: (theme: MantineTheme) => ({
          content: {
            border: `1px solid ${themeColor(theme, 'dark', 6)} !important`,
            backgroundColor: themeColor(theme, 'dark', 8),
            borderRadius: '12px'
          },
          header: {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            padding: '16px 16px 16px 24px',
            margin: 0,
            backgroundColor: themeColor(theme, 'dark', 8),
            borderBottom: `1px solid ${themeColor(theme, 'dark', 6)}`
          },
          title: {
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 1.5,
            color: themeColor(theme, 'dark', 0)
          },
          body: {
            padding: 24,
            backgroundColor: themeColor(theme, 'dark', 8),
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
              '--table-border-color': themeColor(theme, 'dark', 6)
            },
            thead: {
              backgroundColor: themeColor(theme, 'dark', 7)
            },
            th: {
              color: themeColor(theme, 'dark', 0),
              fontWeight: 600,
              fontSize: 14,
              padding: '12px 16px',
              borderBottom: `2px solid ${themeColor(theme, 'dark', 6)}`
            },
            td: {
              color: themeColor(theme, 'dark', 1),
              fontSize: 14,
              padding: '12px 16px',
              borderBottom: `1px solid ${themeColor(theme, 'dark', 6)}`
            },
            tr: {
              '&:where([data-with-row-border]):not(:last-of-type)': {
                td: {
                  borderBottom: `1px solid ${themeColor(theme, 'dark', 6)} !important`
                }
              },
              '&:hover': {
                backgroundColor: themeColor(theme, 'dark', 7)
              }
            }
          }
        }
      },

      // ── Switch ──
      Switch: {
        styles: (theme: MantineTheme, props: SwitchProps) => {
          const color = props.color ?? theme.primaryColor

          return {
            root: {
              '& input:checked+.mantine-Switch-track': {
                backgroundColor: themeColor(theme, color, 6),
                borderColor: themeColor(theme, color, 6)
              },
              '& input:disabled+.mantine-Switch-track': {
                backgroundColor: themeColor(theme, 'dark', 6),
                borderColor: themeColor(theme, 'dark', 6)
              },
              '& input:disabled:checked+.mantine-Switch-track': {
                backgroundColor: themeColor(theme, 'dark', 5),
                borderColor: themeColor(theme, 'dark', 5)
              },
              '& input+*>.mantine-Switch-trackLabel': {
                color: themeColor(theme, 'dark', 0)
              },
              '& input:checked+*>.mantine-Switch-trackLabel': {
                color: '#ffffff'
              }
            },
            label: {
              color: themeColor(theme, 'dark', 0),
              '&[data-disabled]': {
                color: themeColor(theme, 'dark', 3)
              }
            },
            track: {
              backgroundColor: themeColor(theme, 'dark', 6),
              borderColor: themeColor(theme, 'dark', 6)
            },
            trackLabel: {
              color: themeColor(theme, 'dark', 2)
            }
          }
        }
      },

      // ── Radio ──
      Radio: {
        styles: (theme: MantineTheme, props: RadioProps) => {
          const color = (props.color?.includes('.') ? props.color.split('.')[0] : (props.color ?? 'brand')) as Color
          const shade = color === 'dark' ? 0 : 6

          const sizes = {
            xs: 14,
            sm: 16,
            md: 20,
            lg: 24,
            xl: 30
          }
          const iconSizes = {
            xs: 5,
            sm: 6,
            md: 8,
            lg: 10,
            xl: 12
          }

          // @ts-ignore
          const size = sizes[props.size ?? 'sm']
          // @ts-ignore
          const iconSize = iconSizes[props.size ?? 'sm']

          return {
            root: {
              '--radio-size': rem(size),
              '--radio-icon-size': rem(iconSize),
              '--radio-color': themeColor(theme, color, shade) + ' !important',
              '--radio-icon-color': props.variant === 'outline' ? themeColor(theme, color, shade) : '#ffffff !important'
            },
            label: {
              lineHeight: `${size}px`,
              color: themeColor(theme, 'dark', 0),
              '&[data-disabled]': {
                color: themeColor(theme, 'dark', 3)
              }
            },
            icon: {
              transform: 'var(--radio-icon-transform, scale(0.2))'
            },
            radio: {
              borderColor: themeColor(theme, 'dark', 6),
              backgroundColor: themeColor(theme, 'dark', 8),
              '&:disabled:not(:checked)': {
                background: themeColor(theme, 'dark', 7),
                borderColor: themeColor(theme, 'dark', 6),
                cursor: 'not-allowed'
              },
              '&:disabled:checked': {
                color: themeColor(theme, 'dark', 2),
                background: themeColor(theme, 'dark', 6),
                borderColor: themeColor(theme, 'dark', 6),
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
              backgroundColor: themeColor(theme, 'dark', 6), // hairline
              borderRadius: '9999px',
              padding: 2
            },
            indicator: {
              backgroundColor: themeColor(theme, 'dark', 8), // surface-2
              borderRadius: '9999px'
            },
            label: {
              color: themeColor(theme, 'dark', 2) + ' !important',
              fontSize: 14,
              fontWeight: 500,
              '&[data-active]': {
                color: themeColor(theme, 'dark', 0) + ' !important'
              },
              '&[data-disabled]': {
                color: themeColor(theme, 'dark', 3) + ' !important'
              }
            },
            control: {
              '--separator-color': themeColor(theme, 'dark', 6)
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
              backgroundColor: themeColor(theme, 'dark', 7), // surface-3
              color: themeColor(theme, 'dark', 0), // ink
              border: `1px solid ${themeColor(theme, 'dark', 6)}`,
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
          color: 'dark',
          size: 'md'
        },
        styles: (theme: MantineTheme, props: ActionIconProps) => {
          const color = props.color ?? theme.primaryColor
          const shade = color === 'dark' ? 0 : 6

          const variantStyles = {
            default: {
              backgroundColor: themeColor(theme, 'dark', 8),
              borderColor: themeColor(theme, 'dark', 6),
              color: themeColor(theme, 'dark', 0),
              '&:hover': {
                backgroundColor: themeColor(theme, 'dark', 7),
                borderColor: themeColor(theme, 'dark', 5),
                color: themeColor(theme, 'dark', 0)
              },
              '&:active': {
                backgroundColor: themeColor(theme, 'dark', 6),
                borderColor: themeColor(theme, 'dark', 5),
                color: themeColor(theme, 'dark', 0)
              },
              '&:disabled': {
                backgroundColor: themeColor(theme, 'dark', 8),
                borderColor: themeColor(theme, 'dark', 6),
                color: themeColor(theme, 'dark', 3)
              }
            },
            transparent: {
              backgroundColor: 'transparent',
              color: themeColor(theme, color, shade),
              '&:hover': {
                color: themeColor(theme, color, shade)
              }
            },
            subtle: {
              backgroundColor: 'transparent',
              color: themeColor(theme, 'dark', 0),
              borderColor: 'transparent',
              '&:hover': {
                backgroundColor: themeColor(theme, 'dark', 7),
                color: themeColor(theme, 'dark', 0)
              },
              '&:active': {
                backgroundColor: themeColor(theme, 'dark', 6)
              },
              '&:disabled': {
                color: themeColor(theme, 'dark', 3),
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                cursor: 'not-allowed'
              }
            },
            outline: {
              backgroundColor: 'transparent',
              color: themeColor(theme, color, shade),
              border: `1px solid ${themeColor(theme, color, 4)}`,
              '&:hover': {
                backgroundColor: themeColor(theme, 'dark', 7),
                color: themeColor(theme, color, shade)
              }
            },
            filled: {
              backgroundColor: themeColor(theme, color, color === 'dark' ? 8 : 6),
              color: color === 'dark' ? themeColor(theme, 'dark', 0) : '#ffffff',
              '&:hover': {
                color: color === 'dark' ? themeColor(theme, 'dark', 0) : '#ffffff'
              }
            },
            light: {
              backgroundColor: themeColor(theme, color, 1),
              color: themeColor(theme, color, 6),
              '&:hover': {
                backgroundColor: themeColor(theme, color, 2),
                color: themeColor(theme, color, 6)
              },
              '&:active': {
                backgroundColor: themeColor(theme, color, 3)
              }
            }
          }

          const sizes = {
            xs: 16,
            sm: 20,
            md: 28,
            lg: 32,
            xl: 40
          }
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
        defaultProps: {
          c: 'brand.6'
        },
        styles: (theme: MantineTheme) => ({
          root: {
            color: themeColor(theme, 'brand', 6),
            textDecoration: 'none',
            '&:hover': {
              color: themeColor(theme, 'brand', 5),
              textDecoration: 'underline'
            }
          }
        })
      },

      // ── Progress ──
      Progress: {
        styles: (theme: MantineTheme) => {
          return {
            root: {
              backgroundColor: themeColor(theme, 'dark', 7)
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
        styles: (theme: MantineTheme) => ({
          dropdown: {
            backgroundColor: themeColor(theme, 'dark', 8),
            border: `1px solid ${themeColor(theme, 'dark', 6)}`
          }
        })
      },

      // ── Accordion ──
      Accordion: {
        styles: (theme: MantineTheme, props: AccordionProps) => {
          if (props.variant === 'contained') {
            return {
              item: {
                '--item-border-color': themeColor(theme, 'dark', 6),
                '--item-filled-color': 'inherit',
                backgroundColor: themeColor(theme, 'dark', 8)
              },
              control: {
                color: themeColor(theme, 'dark', 0),
                '&:hover': {
                  backgroundColor: themeColor(theme, 'dark', 7)
                }
              },
              panel: {
                color: themeColor(theme, 'dark', 1)
              }
            }
          }
          return {
            control: {
              color: themeColor(theme, 'dark', 0),
              '&:hover': {
                backgroundColor: themeColor(theme, 'dark', 7)
              }
            },
            panel: {
              color: themeColor(theme, 'dark', 1)
            }
          }
        }
      },

      // ── Pill ──
      Pill: {
        styles: (theme: MantineTheme) => {
          return {
            root: {
              backgroundColor: themeColor(theme, 'dark', 7),
              color: themeColor(theme, 'dark', 0),
              borderRadius: '6px'
            }
          }
        }
      },

      // ── Pagination ──
      Pagination: {
        styles: (theme: MantineTheme) => {
          return {
            control: {
              border: 'none',
              color: themeColor(theme, 'dark', 0),
              borderRadius: '8px',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: themeColor(theme, 'dark', 7)
              },
              '&[data-active]': {
                color: '#ffffff',
                backgroundColor: themeColor(theme, 'brand', 6),
                '&:hover': {
                  backgroundColor: themeColor(theme, 'brand', 5)
                }
              }
            }
          }
        }
      },

      // ── ScrollArea ──
      ScrollArea: {
        styles: (theme: MantineTheme) => ({
          scrollbar: {
            backgroundColor: 'transparent'
          },
          thumb: {
            backgroundColor: themeColor(theme, 'dark', 5),
            borderRadius: '4px'
          }
        })
      }
    }
  })
}

// ═══════════════════════════════════════════════════════
// useTheme hook — returns merged theme for given colorScheme
// ═══════════════════════════════════════════════════════
export type Theme = MantineTheme & {
  colors: ColorMap
}

export function useTheme(colorScheme: 'light' | 'dark', fontConfig?: FontConfig): Theme {
  const isLight = colorScheme === 'light'
  const colors = isLight ? lightPalette : darkPalette
  const appTheme = createAppTheme(fontConfig)

  const mergedTheme = mergeMantineTheme(DEFAULT_THEME, {
    ...appTheme,
    colors,
    white: '#ffffff',
    black: '#010102'
  })

  return mergedTheme as Theme
}

export type { MantineThemeOverride }
