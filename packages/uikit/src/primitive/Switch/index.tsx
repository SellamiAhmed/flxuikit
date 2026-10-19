import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core'
import { forwardRef } from 'react'

import classes from './index.module.css'

export interface SwitchProps extends MantineSwitchProps {
  /** Convenience: receives the boolean directly. Native onChange still works. */
  onCheckedChange?: (checked: boolean) => void
}

const own = {
  root: classes.root,
  body: classes.body,
  input: classes.input,
  track: classes.track,
  thumb: classes.thumb,
  label: classes.label
}

const _Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ onChange, onCheckedChange, classNames, ...props }, ref) => {
    const extra = (typeof classNames === 'object' ? classNames : {}) as Record<string, string | undefined>

    const merged = Object.fromEntries(
      Object.entries(own).map(([key, value]) => [key, [value, extra[key]].filter(Boolean).join(' ')])
    )

    return (
      <MantineSwitch
        ref={ref}
        {...props}
        classNames={{ ...extra, ...merged }}
        onChange={(e) => {
          onChange?.(e)
          onCheckedChange?.(e.currentTarget.checked)
        }}
      />
    )
  }
)
_Switch.displayName = 'Switch'

export const Switch = Object.assign(_Switch, { Group: MantineSwitch.Group })
