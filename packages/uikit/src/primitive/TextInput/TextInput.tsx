import { TextInput as MantineTextInput, TextInputProps as MantineTextInputProps } from '@mantine/core'
import clsx from 'clsx'
import { forwardRef } from 'react'

import classes from './index.module.css'

export interface TextInputProps extends MantineTextInputProps {
  size?: 'sm' | 'md' | 'lg'
  /** Semantic visual status for design-system states */
  status?: 'default' | 'success' | 'error'
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
  leftAddonProps?: React.HTMLAttributes<HTMLSpanElement>
  rightAddonProps?: React.HTMLAttributes<HTMLSpanElement>
}

const sizeClassMap = {
  sm: classes['size-sm'],
  md: classes['size-md'],
  lg: classes['size-lg']
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    leftAddon,
    rightAddon,
    leftAddonProps,
    rightAddonProps,
    leftSection,
    rightSection,
    className,
    size = 'md',
    status = 'default',
    ...rest
  } = props

  const withLeftAddon = !!leftAddon
  const withRightAddon = !!rightAddon
  const sizeClass = sizeClassMap[size]

  const addonContent = (label: React.ReactNode, labelProps: React.HTMLAttributes<HTMLSpanElement> | undefined) => (
    <span {...labelProps} className={clsx(classes.section, sizeClass, labelProps?.className)}>
      {label}
    </span>
  )

  const isError = status === 'error' || !!rest.error
  const isSuccess = status === 'success' && !isError
  const isDisabled = !!rest.disabled

  return (
    <MantineTextInput
      {...rest}
      ref={ref}
      size={size}
      className={clsx(className)}
      // 'auto' makes Mantine measure the actual addon width via ResizeObserver
      // and reserve exactly that much input padding — instead of a fixed square guess
      leftSectionWidth={withLeftAddon ? 'auto' : undefined}
      rightSectionWidth={withRightAddon ? 'auto' : undefined}
      classNames={{
        root: classes.root,
        wrapper: classes.wrapper,
        input: clsx(
          classes.input,
          sizeClass,
          withLeftAddon && classes.inputWithLeftAddon,
          withRightAddon && classes.inputWithRightAddon
        ),
        label: classes.label,
        description: classes.description,
        error: classes.error,
        required: classes.required,
        section: classes.section
      }}
      data-error={isError || undefined}
      data-success={isSuccess || undefined}
      data-disabled={isDisabled || undefined}
      leftSection={withLeftAddon ? addonContent(leftAddon, leftAddonProps) : leftSection}
      rightSection={withRightAddon ? addonContent(rightAddon, rightAddonProps) : rightSection}
    />
  )
})

TextInput.displayName = 'TextInput'
