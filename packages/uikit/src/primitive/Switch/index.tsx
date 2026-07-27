import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core'
import { forwardRef } from 'react'

import classes from './index.module.css'

export interface SwitchProps extends Omit<MantineSwitchProps, 'onChange'> {
  onChange?: (checked: boolean) => void
  label?: React.ReactNode
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ onChange, label, ...props }, ref) => {
  return (
    <MantineSwitch
      ref={ref}
      label={label}
      classNames={{
        root: classes.root,
        track: classes.track,
        thumb: classes.thumb,
        body: classes.body,
        label: classes.label
      }}
      onChange={(event) => onChange?.(event.currentTarget.checked)}
      {...props}
    />
  )
})

Switch.displayName = 'Switch'
