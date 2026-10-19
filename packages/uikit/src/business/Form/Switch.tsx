import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { Switch, SwitchProps } from '../../primitive/index.js'

export interface FormSwitchProps extends Omit<SwitchProps, 'onChange' | 'onCheckedChange' | 'label' | 'name'> {
  name: string
  rules?: RegisterOptions
  label?: React.ReactNode
  onChange?: (checked: boolean) => void
}

export const FormSwitch: React.FC<FormSwitchProps> = ({ name, rules, onChange, label, ...rest }) => {
  const { control, formState } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const { onChange: handleChange, value, ...restField } = field
        return (
          <Switch
            label={label}
            {...restField}
            {...rest}
            checked={!!value}
            onCheckedChange={(checked: boolean) => {
              handleChange(checked)
              onChange?.(checked)
            }}
            error={fieldState.error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
          />
        )
      }}
    />
  )
}
