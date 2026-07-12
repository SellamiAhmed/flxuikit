// src/primitive/typography/Typography.tsx
import { Text, TextProps, createPolymorphicComponent, MantineStyleProps } from '@mantine/core'
import { forwardRef } from 'react'

export type TypographyVariant =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'headline'
  | 'card-title'
  | 'subhead'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'eyebrow'
  | 'mono'

export interface TypographyProps extends Omit<TextProps, 'size' | 'variant'> {
  variant?: TypographyVariant
}

export const TYPOGRAPHY_STYLES_MAP: Record<TypographyVariant, MantineStyleProps> = {
  'display-xl': { fz: '5rem', lh: '1.05', fw: 700, c: 'dark.0' },
  'display-lg': { fz: '3.5rem', lh: '1.10', fw: 700, c: 'dark.0' },
  'display-md': { fz: '2.5rem', lh: '1.15', fw: 700, c: 'dark.0' },
  headline: { fz: '1.75rem', lh: '1.20', fw: 600, c: 'dark.0' },
  'card-title': { fz: '1.375rem', lh: '1.25', fw: 600, c: 'dark.0' },
  subhead: { fz: '1.25rem', lh: '1.40', fw: 500, c: 'dark.0' },
  'body-lg': { fz: '1.125rem', lh: '1.50', fw: 400, c: 'dark.1' },
  body: { fz: '1rem', lh: '1.50', fw: 400, c: 'dark.1' },
  'body-sm': { fz: '0.875rem', lh: '1.50', fw: 400, c: 'dark.2' },
  caption: { fz: '0.75rem', lh: '1.40', fw: 400, c: 'dark.2' },
  eyebrow: { fz: '0.8125rem', lh: '1.30', fw: 500, c: 'brand.6', tt: 'uppercase' },
  mono: { fz: '0.8125rem', lh: '1.50', fw: 400, c: 'dark.1', ff: 'var(--mantine-font-family-monospace)' }
}

const _Typography = forwardRef<HTMLDivElement, React.PropsWithChildren<TypographyProps>>(
  ({ children, variant, ...rest }, ref) => {
    const styleProps = variant ? TYPOGRAPHY_STYLES_MAP[variant] : {}
    return (
      <Text ref={ref} {...styleProps} {...rest}>
        {children}
      </Text>
    )
  }
)

export const Typography = createPolymorphicComponent<'div', TypographyProps>(_Typography)
