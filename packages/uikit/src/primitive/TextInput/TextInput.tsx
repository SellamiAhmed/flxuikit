import { TextInput as MantineTextInput, TextInputProps as MantineTextInputProps } from '@mantine/core'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { Typography, TypographyProps } from '../Typography/index.js'

import classes from './index.module.css'

export interface TextInputProps extends MantineTextInputProps {
  /** @deprecated use leftAddon */
  leftLabel?: React.ReactNode
  /** @deprecated use leftAddonProps */
  leftLabelProps?: TypographyProps
  /** @deprecated use rightAddon */
  rightLabel?: React.ReactNode
  /** @deprecated use rightAddonProps */
  rightLabelProps?: TypographyProps

  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  leftAddonProps?: TypographyProps
  rightAddonProps?: TypographyProps

  /** Show success state with green border and checkmark icon */
  success?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    leftLabel,
    leftLabelProps,
    leftAddon,
    rightAddon,
    leftAddonProps,
    rightAddonProps,
    leftSection,
    rightLabel,
    rightLabelProps,
    rightSection,
    error,
    success,
    classNames: externalClassNames,
    ...rest
  } = props

  const withLeftAddon = !!(leftLabel || leftAddon)
  const withRightAddon = !!(rightLabel || rightAddon)
  const isError = !!error
  const isSuccess = success && !isError

  const stateRightSection = isError ? (
    <IconAlertTriangle size={16} />
  ) : isSuccess ? (
    <IconCheck size={16} />
  ) : undefined

  return (
    <MantineTextInput
      {...rest}
      error={error}
      classNames={
        {
          wrapper: clsx(
            classes.wrapper,
            withLeftAddon && classes.withLeftAddon,
            externalClassNames?.wrapper
          ),
          section: clsx(
            classes.section,
            isError && classes.sectionError,
            isSuccess && classes.sectionSuccess,
            externalClassNames?.section
          ),
          input: clsx(
            classes.input,
            withLeftAddon && classes.inputWithLeftAddon,
            withRightAddon && classes.inputWithRightAddon,
            isError && classes.inputError,
            isSuccess && classes.inputSuccess,
            externalClassNames?.input
          ),
        }  /* Mantine accepts these keys at runtime but omits them from the TextInput classNames type */
      }
      leftSection={
        withLeftAddon ? (
          <Typography variant="label-lg" {...(leftLabelProps || leftAddonProps)}>
            {leftLabel || leftAddon}
          </Typography>
        ) : (
          leftSection
        )
      }
      rightSection={
        withRightAddon ? (
          <Typography variant="label-lg" {...(rightLabelProps || rightAddonProps)}>
            {rightLabel || rightAddon}
          </Typography>
        ) : (
          rightSection ?? stateRightSection
        )
      }
      ref={ref}
    />
  )
})
