import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { Checkbox, CheckboxGroupProps, CheckboxProps, Flex, FlexProps } from '../../primitive/index.js'

import classes from './Checkbox.module.css'

/* ── Single Checkbox ── */
export interface FormCheckboxProps extends CheckboxProps {
  name: string
  rules?: RegisterOptions
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, rules, onChange, ...rest }) => {
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
          <Checkbox
            {...restField}
            {...rest}
            checked={value}
            classNames={{
              root: classes.checkboxRoot,
              body: classes.checkboxBody,
              label: classes.checkboxLabel
              // no icon/inner/input override here — inherits primitive's styling
            }}
            onChange={(checked) => {
              handleChange(checked)
              onChange?.(checked)
            }}
            error={error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
          />
        )
      }}
    />
  )
}

/* ── Checkbox Group ── */
export interface FormCheckboxGroupProps extends Omit<CheckboxGroupProps, 'children'> {
  name: string
  rules?: RegisterOptions
  data: CheckboxProps[]
  direction?: FlexProps['direction']
  gap?: FlexProps['gap']
}

export const FormCheckboxGroup = ({
  name,
  rules,
  data,
  onChange,
  direction,
  gap = 'sm',
  label,
  ...rest
}: FormCheckboxGroupProps) => {
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
          <Checkbox.Group
            {...restField}
            {...rest}
            label={label}
            value={value}
            onChange={(val) => {
              handleChange(val)
              onChange?.(val)
            }}
            error={error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
          >
            <Flex direction={direction} gap={gap} className={label ? classes.groupWithLabel : classes.group}>
              {data.map((i) => (
                <Checkbox {...i} key={i.value as string} classNames={{ root: classes.checkboxRoot, body: classes.checkboxBody, label: classes.checkboxLabel }} />
              ))}
            </Flex>
          </Checkbox.Group>
        )
      }}
    />
  )
}
