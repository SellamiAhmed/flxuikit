import { NumberInput as MantineNumberInput, NumberInputProps as MantineNumberInputProps } from '@mantine/core'
import { forwardRef } from 'react'

import { Typography, type TypographyProps } from '../Typography/index.js'

import classes from './index.module.css'

export interface NumberInputProps extends MantineNumberInputProps {
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  leftAddonProps?: TypographyProps
  rightAddonProps?: TypographyProps
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { leftAddon, rightAddon, leftAddonProps, rightAddonProps, leftSection, rightSection, ...rest } = props

  return (
    <MantineNumberInput
      {...rest}
      ref={ref}
      classNames={{
        wrapper: classes.wrapper,
        section: classes.section,
        input: classes.input,
        controls: classes.controls,
        control: classes.control
      }}
      leftSection={
        !!leftAddon ? (
          <Typography variant="label-lg" {...leftAddonProps}>
            {leftAddon}
          </Typography>
        ) : (
          leftSection
        )
      }
      rightSection={
        !!rightAddon ? (
          <Typography variant="label-lg" {...rightAddonProps}>
            {rightAddon}
          </Typography>
        ) : (
          rightSection
        )
      }
    />
  )
})
