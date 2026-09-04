// primitive/Checkbox/index.tsx
import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from '@mantine/core'
import { forwardRef } from 'react'

export interface CheckboxProps extends MantineCheckboxProps {}

const CheckboxBase = forwardRef<HTMLInputElement, CheckboxProps>(({ classNames, ...rest }, ref) => (
  <MantineCheckbox {...rest} ref={ref} radius="xs" classNames={classNames} />
))

CheckboxBase.displayName = 'Checkbox'

export const Checkbox = Object.assign(CheckboxBase, { Group: MantineCheckbox.Group })

export type { CheckboxGroupProps } from '@mantine/core'
