import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '../../primitive/index.js'

export interface FormDatePickerProps extends DatePickerProps {
  name: string
  rules?: RegisterOptions
  placeholder?: string
  clearable?: boolean
  label?: React.ReactNode
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({ name, rules, onChange, ...rest }) => {
  const { control, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const { onChange: handleChange, value, ...restField } = field
        return (
          <>
            <DatePicker
              {...restField}
              {...rest}
              value={value}
              onChange={(date: any) => {
                handleChange(date)
                onChange?.(date)
              }}
            />
            {error && (
              <div
                style={{
                  color: 'var(--ds-color-text-danger)',
                  fontSize: 'var(--ds-font-size-100)',
                  marginTop: 'var(--ds-space-050)'
                }}
              >
                <ErrorMessage errors={formState.errors} name={name} />
              </div>
            )}
          </>
        )
      }}
    />
  )
}
