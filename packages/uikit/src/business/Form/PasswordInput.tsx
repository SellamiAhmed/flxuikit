import { ErrorMessage } from '@hookform/error-message'
import clsx from 'clsx'
import React from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { PasswordInput, PasswordInputProps } from '../../primitive/index.js'

import classes from './FormPasswordInput.module.css'

export interface FormPasswordInputProps extends PasswordInputProps {
  name: string
  rules?: RegisterOptions
}

export const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  name,
  rules,
  onChange,
  className,
  classNames,
  ...rest
}) => {
  const { control, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const { onChange: handleChange, ...restField } = field
        return (
          <PasswordInput
            {...restField}
            {...rest}
            className={clsx(classes.root, className)}
            classNames={{
              wrapper: classes.wrapper,
              input: classes.input,
              innerInput: classes.innerInput,
              section: classes.section,
              visibilityToggle: classes.visibilityToggle,
              error: classes.error,
              label: classes.label,
              description: classes.description,
              required: classes.required,
              ...classNames
            }}
            onChange={(e) => {
              handleChange(e)
              onChange?.(e)
            }}
            error={error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
          />
        )
      }}
    />
  )
}
