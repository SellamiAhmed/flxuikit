import { Loader, Button as MantineButton, ButtonProps as MantineButtonProps, ButtonStylesNames } from '@mantine/core'
import { forwardRef } from 'react'

import classes from './index.module.css'

type Button = typeof MantineButton

type ButtonClassNames = Partial<Record<ButtonStylesNames, string>>

type ButtonWrapperProps = Omit<MantineButtonProps, 'classNames'> & {
  'data-loading'?: boolean
  classNames?: ButtonClassNames
}

const _Button = forwardRef<HTMLButtonElement, ButtonWrapperProps>((props, ref) => {
  const {
    leftSection,
    loading,
    disabled,
    loaderProps,
    className,
    classNames,
    variant = 'filled',
    ['data-disabled']: dataDisabled,
    ['data-loading']: dataLoading,
    ...rest
  } = props

  const loader = <Loader size={16} color="currentColor" {...loaderProps} />
  const isLoading = loading || dataLoading
  const isDisabled = disabled || dataDisabled || isLoading

  const mergedClassNames: ButtonClassNames = {
    root: `${classes.root}${className ? ` ${className}` : ''}`,
    inner: [classes['btn-inner'], classNames?.inner].filter(Boolean).join(' '),
    label: [classes['btn-label'], classNames?.label].filter(Boolean).join(' '),
    section: [classes['btn-section'], classNames?.section].filter(Boolean).join(' ')
  }

  return (
    <MantineButton
      {...rest}
      ref={ref}
      variant={variant}
      classNames={mergedClassNames}
      leftSection={isLoading ? loader : leftSection}
      disabled={isDisabled}
      data-loading={isLoading || undefined}
    />
  )
})

export const Button = _Button as any as Button
Button.Group = MantineButton.Group
Button.classes = MantineButton.classes
Button.displayName = MantineButton.displayName
Button.extend = MantineButton.extend
Button.withProps = MantineButton.withProps
