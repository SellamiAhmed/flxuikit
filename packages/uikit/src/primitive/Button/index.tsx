import { Loader, Button as MantineButton, ButtonProps as MantineButtonProps, ButtonStylesNames } from '@mantine/core'
import { forwardRef } from 'react'

import classes from './index.module.css'

type Button = typeof MantineButton

type ButtonClassNames = Partial<Record<ButtonStylesNames, string>>

type ButtonWrapperProps = Omit<MantineButtonProps, 'classNames'> & {
  'data-loading'?: boolean
  'data-disabled'?: boolean
  classNames?: ButtonClassNames
}

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

const _Button = forwardRef<HTMLButtonElement, ButtonWrapperProps>((props, ref) => {
  const {
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

  const isLoading = Boolean(loading || dataLoading)
  const isDisabled = Boolean(disabled || dataDisabled || isLoading)

  const mergedClassNames: ButtonClassNames = {
    ...classNames,
    root: cx(classes.root, className, classNames?.root),
    inner: cx(classes['btn-inner'], classNames?.inner),
    label: cx(classes['btn-label'], classNames?.label),
    section: cx(classes['btn-section'], classNames?.section),
    loader: cx(classes['btn-loader'], classNames?.loader)
  }

  return (
    <MantineButton
      {...rest} // leftSection stays in rest, untouched
      ref={ref}
      variant={variant}
      classNames={mergedClassNames}
      loading={isLoading}
      loaderProps={{ size: 16, color: 'currentColor', ...loaderProps }}
      disabled={isDisabled}
      data-loading={isLoading || undefined}
      aria-busy={isLoading || undefined}
    />
  )
})

export const Button = _Button as any as Button
Button.Group = MantineButton.Group
Button.classes = MantineButton.classes
Button.displayName = MantineButton.displayName
Button.extend = MantineButton.extend
Button.withProps = MantineButton.withProps
