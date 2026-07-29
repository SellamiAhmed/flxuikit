import { RegisterOptions, useFormContext, Controller } from 'react-hook-form'

import { SegmentedControlProps, SegmentedControl, Input } from '../../primitive/index.js'

import classes from './FormSegmentedControl.module.css'

export interface FormSegmentedControlProps extends SegmentedControlProps {
  name: string
  rules?: RegisterOptions
  label?: React.ReactNode
}

export const FormSegmentedControl = ({
  name,
  rules,
  label,
  onChange: formOnChange,
  ...restProps
}: FormSegmentedControlProps) => {
  const { control, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => {
        return (
          <Input.Wrapper className={classes.wrapper} label={label} error={error ? error.message : undefined}>
            <SegmentedControl
              value={value}
              onChange={(val) => {
                onChange(val)
                formOnChange?.(val)
              }}
              {...restProps}
            />
          </Input.Wrapper>
        )
      }}
    />
  )
}
