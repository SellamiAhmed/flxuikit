// src/primitives/button/Button.tsx
import { Button as MantineButton, Loader, useMantineTheme, type ButtonProps as MantineButtonProps } from '@mantine/core'
import { forwardRef } from 'react'

type ButtonComponent = typeof MantineButton

export interface ButtonProps extends MantineButtonProps {
  'data-loading'?: boolean
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const theme = useMantineTheme()
  const {
    leftSection,
    loading,
    disabled,
    loaderProps,
    color,
    ['data-disabled']: dataDisabled,
    ['data-loading']: dataLoading,
    ...rest
  } = props

  const isLoading = loading || dataLoading
  const isDisabled = disabled || dataDisabled || isLoading

  const loader = <Loader size={16} color={color ? `${color}.6` : `${theme.primaryColor}.6`} {...loaderProps} />

  return (
    <MantineButton
      {...rest}
      ref={ref}
      leftSection={isLoading ? loader : leftSection}
      disabled={isDisabled}
      data-loading={isLoading || undefined}
    />
  )
})

export const Button: ButtonComponent = _Button as any

Button.Group = MantineButton.Group
Button.classes = MantineButton.classes
Button.displayName = 'Button'
Button.extend = MantineButton.extend
Button.withProps = MantineButton.withProps
