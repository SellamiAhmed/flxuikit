import { Loader, Button as MantineButton, useMantineTheme, type ButtonProps as MantineButtonProps } from '@mantine/core'
import clsx from 'clsx'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import classes from './index.module.css'

export type ButtonVariant = 'filled' | 'outline' | 'subtle' | 'link'
export type ButtonSize = 'default' | 'compact'
export type ButtonColor = 'brand' | 'danger' | 'warning' | 'success' | 'discovery' | 'neutral'

type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'color' | 'style'>

export interface ButtonProps
  extends NativeButtonProps,
    Omit<MantineButtonProps, 'variant' | 'size' | 'color' | 'type' | 'data-loading' | 'data-disabled'> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  loading?: boolean
  selected?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  leftSection?: ReactNode
  rightSection?: ReactNode
  'data-loading'?: boolean
  'data-disabled'?: boolean
}

type ButtonComponent = typeof MantineButton

const _Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const theme = useMantineTheme()

  const {
    variant = 'filled',
    size = 'default',
    color = 'brand',
    type = 'button',
    loading,
    disabled,
    selected = false,
    fullWidth = false,
    iconOnly = false,
    leftSection,
    rightSection,
    loaderProps,
    className,
    style,
    ['data-disabled']: dataDisabled,
    ['data-loading']: dataLoading,
    ...rest
  } = props

  const isLoading = Boolean(loading || dataLoading)
  const isDisabled = Boolean(disabled || dataDisabled || isLoading)

  const loader = (
    <Loader
      size={size === 'compact' ? 12 : 14}
      color={color ? `${color}.6` : `${theme.primaryColor}.6`}
      className={classes.loader}
      {...loaderProps}
    />
  )

  const resolvedLeftSection = isLoading ? loader : leftSection
  const hasLeftSection = resolvedLeftSection !== undefined && resolvedLeftSection !== null
  const hasRightSection = rightSection !== undefined && rightSection !== null

  const balancedLeftSection = !iconOnly && !hasLeftSection && hasRightSection
    ? <span className={classes.sectionSpacer} aria-hidden="true" />
    : resolvedLeftSection

  const balancedRightSection = !iconOnly && hasLeftSection && !hasRightSection
    ? <span className={classes.sectionSpacer} aria-hidden="true" />
    : rightSection

  return (
    <MantineButton
      {...rest}
      ref={ref}
      type={type}
      variant="unstyled"
      disabled={isDisabled}
      data-loading={isLoading || undefined}
      data-btn-loading={isLoading || undefined}
      data-btn-variant={variant}
      data-btn-color={color}
      data-btn-size={size}
      data-btn-disabled={isDisabled || undefined}
      data-btn-selected={selected || undefined}
      data-btn-full-width={fullWidth || undefined}
      data-btn-icon-only={iconOnly || undefined}
      className={clsx(classes.root, className)}
      classNames={{ inner: classes.inner, label: classes.label, section: classes.section }}
      style={style}
      leftSection={balancedLeftSection}
      rightSection={balancedRightSection}
    />
  )
})

export const Button: ButtonComponent = _Button as any

Button.Group = MantineButton.Group
Button.classes = MantineButton.classes
Button.displayName = 'Button'
Button.extend = MantineButton.extend
Button.withProps = MantineButton.withProps
