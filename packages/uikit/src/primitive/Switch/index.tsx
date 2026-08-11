import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core'
import { forwardRef } from 'react'

import classes from './index.module.css'

export interface SwitchProps extends Omit<MantineSwitchProps, 'onChange'> {
  onChange?: (checked: boolean) => void
  label?: React.ReactNode
}

const _Switch = forwardRef<HTMLInputElement, SwitchProps>(({ onChange, label, ...props }, ref) => {
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

_Switch.displayName = 'Switch'

type SwitchType = typeof _Switch & {
  Group: typeof MantineSwitch.Group
}

export const Switch = _Switch as SwitchType
Switch.Group = MantineSwitch.Group
