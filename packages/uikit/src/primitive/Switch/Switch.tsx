import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import classes from './index.module.css'

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg'

// Override onChange to accept boolean instead of ChangeEvent
export interface SwitchProps extends Omit<MantineSwitchProps, 'size' | 'classNames' | 'styles' | 'onChange'> {
  size?: SwitchSize
  loading?: boolean
  /** Called with the new checked boolean value */
  onChange?: (checked: boolean) => void
  classNames?: {
    root?: string
    track?: string
    thumb?: string
    label?: string
    description?: string
    body?: string
    trackLabel?: string
    error?: string
  }
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    { size = 'md', loading = false, disabled = false, className, classNames, label, description, onChange, ...others },
    ref
  ) => {
    const isDisabled = disabled || loading

    // Convert Mantine's ChangeEventHandler to our boolean callback
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.currentTarget.checked)
    }

    return (
      <MantineSwitch
        ref={ref}
        size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
        disabled={isDisabled}
        label={label}
        description={description}
        onChange={handleChange}
        className={clsx(classes.root, classNames?.root, className)}
        classNames={{
          root: classes.root,
          track: clsx(classes.track, classNames?.track),
          thumb: clsx(classes.thumb, classNames?.thumb),
          label: clsx(classes.label, classNames?.label),
          description: clsx(classes.description, classNames?.description),
          body: clsx(classes.body, classNames?.body),
          trackLabel: clsx(classes.trackLabel, classNames?.trackLabel),
          error: clsx(classes.error, classNames?.error)
        }}
        data-loading={loading}
        {...others}
      />
    )
  }
)

Switch.displayName = 'Switch'
