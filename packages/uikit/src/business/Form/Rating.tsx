import { ErrorMessage } from '@hookform/error-message'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import { Input, InputWrapperProps, Rating, RatingProps } from '../../primitive/index.js'

import classes from './FormRatingInput.module.css'

export interface FormRatingInputProps extends RatingProps {
  label?: InputWrapperProps['label']
  withAsterisk?: InputWrapperProps['withAsterisk']
  wrapperProps?: Omit<InputWrapperProps, 'children'>
  name: string
  rules?: RegisterOptions
}

export const FormRatingInput: React.FC<FormRatingInputProps> = ({
  name,
  label,
  withAsterisk,
  rules,
  wrapperProps,
  ...rest
}) => {
  const { control, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Input.Wrapper
          className={classes.wrapper}
          error={error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
          label={label}
          withAsterisk={withAsterisk}
          {...wrapperProps}
        >
          <Rating onChange={onChange} value={value} {...rest} />
        </Input.Wrapper>
      )}
    />
  )
}
