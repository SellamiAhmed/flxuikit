import { ErrorMessage } from '@hookform/error-message'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { CountryData } from 'react-phone-input-2'

import { Box, BoxProps, SelectProps } from '../../../primitive/index.js'
import { PhoneInput, PhoneInputProps } from '../../PhoneInput/index.js'
import { FormSelect } from '../Select.js'

import classes from './index.module.css'
import rawCountries from './rawCountries.js'

/* ──────────────────────────────────────────
   FormPhoneInput — single RHF phone input
   ────────────────────────────────────────── */

export interface FormPhoneInputProps extends Omit<PhoneInputProps, 'onSelect'> {
  name: string
  defaultCountry?: string
  rules?: RegisterOptions
  onSelect?: (value: string, country: CountryData | {}) => void
}

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
  name,
  rules,
  onChange: onInputChange,
  onSelect,
  label,
  rootProps,
  ...rest
}) => {
  const { control, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => {
        const handleChange: PhoneInputProps['onChange'] = (value, data, event, formattedValue: string) => {
          onChange(formattedValue)
          onSelect?.(formattedValue, data)
          onInputChange?.(formattedValue, data, event, formattedValue)
        }

        return (
          <PhoneInput
            error={error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
            value={value}
            label={label}
            onChange={handleChange}
            rootProps={rootProps}
            {...rest}
          />
        )
      }}
    />
  )
}

/* ──────────────────────────────────────────
   FormPhoneInputV2 — country select + phone
   ────────────────────────────────────────── */

export interface FormPhoneInputV2Props extends Omit<PhoneInputProps, 'onSelect'> {
  countryKey: string
  phoneKey: string
  defaultCountry?: string
  rules?: RegisterOptions
  countryRules?: RegisterOptions
  onSelect?: (value: string, country: CountryData | {}) => void
  selectProps: Omit<SelectProps, 'data'> & {
    filterData?: (
      data: { value: string; label: string },
      index: number,
      array: { value: string; label: string }[]
    ) => boolean
  }
  rootProps?: BoxProps
}

const countryOptions = rawCountries.map((raw) => ({
  value: raw[2] as string,
  label: raw[0] as string
}))

export const FormPhoneInputV2: React.FC<FormPhoneInputV2Props> = ({
  countryKey,
  phoneKey,
  selectProps = {},
  countryRules,
  rules,
  rootProps,
  ...rest
}) => {
  const { watch, formState, getFieldState } = useFormContext()
  const { filterData: onFilter, ...restSelectProps } = selectProps
  const { error: countryError } = getFieldState(countryKey, formState)
  const { error: phoneError } = getFieldState(phoneKey, formState)
  const country = watch(countryKey, '')

  return (
    <Box {...rootProps} className={classes.comboRoot}>
      <div className={classes.comboRow}>
        {/* Country select */}
        <div className={classes.countryWrapper} data-error={!!countryError}>
          <FormSelect
            data={onFilter ? countryOptions.filter(onFilter) : countryOptions}
            {...restSelectProps}
            name={countryKey}
            rules={countryRules}
            classNames={{
              input: classes.countryInput,
              error: classes.hiddenError
            }}
          />
        </div>

        {/* Phone input */}
        <div className={classes.phoneWrapper}>
          <FormPhoneInput
            country={country}
            rootProps={{ w: '100%', mb: 0 }}
            rules={rules}
            inputClass={classes.phoneInput}
            error={undefined} /* suppress individual error — consolidated below */
            showContryCodeAfterFocus={false}
            name={phoneKey}
            {...rest}
          />
        </div>
      </div>

      {/* Consolidated error */}
      {(countryError || phoneError) && (
        <div className={classes.errorText}>
          <ErrorMessage errors={formState.errors} name={countryKey} />
          <ErrorMessage errors={formState.errors} name={phoneKey} />
        </div>
      )}
    </Box>
  )
}
