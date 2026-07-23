import {
  Loader,
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core'
import { forwardRef } from 'react'

import classes from './index.module.css'

type Button = typeof MantineButton

const _Button = forwardRef<
  HTMLButtonElement,
  MantineButtonProps & { 'data-loading'?: boolean }
>((props, ref) => {
  const {
    leftSection,
    loading,
    disabled,
    loaderProps,
    className,
    ['data-disabled']: dataDisabled,
    ['data-loading']: dataLoading,
    ...rest
  } = props

  // Loader inherits the button text color automatically
  const loader = (
    <Loader size={16} color="currentColor" {...loaderProps} />
  )
  const isLoading = loading || dataLoading
  const isDisabled = disabled || dataDisabled || isLoading

  return (
    <MantineButton
      {...rest}
      ref={ref}
      className={`${classes.root}${className ? ` ${className}` : ''}`}
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
