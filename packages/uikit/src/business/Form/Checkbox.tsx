import { ErrorMessage } from '@hookform/error-message'
import { IconCheck } from '@tabler/icons-react'
import React from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { Checkbox, CheckboxProps, CheckboxGroupProps, Flex, FlexProps } from '../../primitive/index.js'

import classes from './Checkbox.module.css'

/* ── Tabler icon component ── */
const CheckboxIcon: React.FC<{ indeterminate: boolean | undefined; className: string }> = ({
  indeterminate,
  className
}) => {
  if (indeterminate) {
    return (
      <svg width={10} height={10} viewBox="0 0 10 10" className={className}>
        <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>
    )
  }
  return <IconCheck size={10} stroke={3} className={className} />
}

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
            icon={CheckboxIcon}
            classNames={{
              root: classes.checkboxRoot,
              body: classes.checkboxBody,
              inner: classes.checkboxInner,
              input: classes.checkboxInput,
              icon: classes.checkboxIcon,
              label: classes.checkboxLabel
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

  const checkboxClassNames = {
    root: classes.checkboxRoot,
    body: classes.checkboxBody,
    icon: classes.checkboxIcon,
    label: classes.checkboxLabel
  }

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
                <Checkbox {...i} key={i.value as string} icon={CheckboxIcon} classNames={checkboxClassNames} />
              ))}
            </Flex>
          </Checkbox.Group>
        )
      }}
    />
  )
}
