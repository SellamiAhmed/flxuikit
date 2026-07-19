// src/primitive/typography/index.tsx
import { Text, createPolymorphicComponent } from '@mantine/core'
import type { TextProps } from '@mantine/core'
import clsx from 'clsx'
import { forwardRef } from 'react'

import classes from './index.module.css'

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

const _Typography = forwardRef<HTMLDivElement, React.PropsWithChildren<TypographyProps>>(
  ({ children, variant, className, ...rest }, ref) => {
    const variantClass = variant ? classes[variant.replace('-', '_')] : undefined

    return (
      <Text ref={ref} className={clsx(classes.base, variantClass, className)} {...rest}>
        {children}
      </Text>
    )
  }
)

export const Typography = createPolymorphicComponent<'div', TypographyProps>(_Typography)
