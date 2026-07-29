import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import type { TimeRange } from '../TimeRangePicker/helper.js'
import { TimeRangePicker, TimeRangePickerBaseProps } from '../TimeRangePicker/index.js'

export type FormTimeRangePickerProps = TimeRangePickerBaseProps & {
  name: string
  rules?: RegisterOptions
  value?: TimeRange
  onChange?: (value?: TimeRange) => void
  clearable?: boolean
  label?: React.ReactNode
}

export const FormTimeRangePicker = ({ name, rules, onChange, ...rest }: FormTimeRangePickerProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const { onChange: handleChange, ...restField } = field
        return (
          <TimeRangePicker
            {...restField}
            {...rest}
            onChange={(e) => {
              handleChange(e)
              onChange?.(e)
            }}
          />
        )
      }}
    />
  )
}
