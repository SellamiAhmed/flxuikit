import { createPolymorphicComponent, Text, TextProps } from '@mantine/core'
import clsx from 'clsx'
import { forwardRef } from 'react'

import classes from './index.module.css'

type TypographyVariants =
  | 'headline-lg'
  | 'headline-md'
  | 'headline-sm'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'action-lg'
  | 'action-md'
  | 'action-sm'
  | 'label-lg'
  | 'label-md'
  | 'label-sm'
  | 'label-xs'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'

export interface TypographyProps extends Omit<TextProps, 'variant'> {
  variant?: TypographyVariants
}

const _Typography = forwardRef<HTMLDivElement, React.PropsWithChildren<TypographyProps>>(
  ({ children, variant, className, ...rest }, ref) => {
    return (
      <Text
        ref={ref}
        className={clsx(variant && classes[variant], className)}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

export const Typography = createPolymorphicComponent<'div', TypographyProps>(_Typography)
