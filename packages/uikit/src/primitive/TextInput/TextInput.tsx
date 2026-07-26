import { TextInput as MantineTextInput, TextInputProps as MantineTextInputProps } from '@mantine/core'
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { Typography, TypographyProps } from '../Typography/index.js'

import classes from './index.module.css'

export interface TextInputProps extends MantineTextInputProps {
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  leftAddonProps?: TypographyProps
  rightAddonProps?: TypographyProps
  success?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    leftAddon,
    rightAddon,
    leftAddonProps,
    rightAddonProps,
    leftSection,
    rightSection,
    error,
    success,
    classNames: externalClassNames,
    ...rest
  } = props

  const withLeftAddon = !!leftAddon
  const withRightAddon = !!rightAddon
  const isError = !!error
  const isSuccess = success && !isError

  const stateRightSection = isError ? (
    <IconAlertTriangle size={16} className={classes.iconError} />
  ) : isSuccess ? (
    <IconCheck size={16} className={classes.iconSuccess} />
  ) : undefined

  // Only apply addon section styles when there's an actual addon
  const isAddonSection = withLeftAddon || withRightAddon

  return (
    <MantineTextInput
      {...rest}
      error={error}
      classNames={
        {
          wrapper: clsx(classes.wrapper, withLeftAddon && classes.withLeftAddon, externalClassNames?.wrapper),
          section: clsx(
            isAddonSection && classes.section,
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
          )
        } as any
      }
      leftSection={
        withLeftAddon ? (
          <Typography variant="label-lg" {...leftAddonProps}>
            {leftAddon}
          </Typography>
        ) : (
          leftSection
        )
      }
      rightSection={
        withRightAddon ? (
          <Typography variant="label-lg" {...rightAddonProps}>
            {rightAddon}
          </Typography>
        ) : (
          (rightSection ?? stateRightSection)
        )
      }
      ref={ref}
    />
  )
})
