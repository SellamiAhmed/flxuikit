import { useState } from 'react'
import ReactPhoneInput2, { PhoneInputProps as ReactPhoneInputProps } from 'react-phone-input-2'

import { Box, BoxProps, Input, useInputProps, InputWrapperProps } from '../../primitive/index.js'

import classes from './index.module.css'

// fuck esm/cjs interop https://github.com/evanw/esbuild/issues/1719#issuecomment-953470495
// @ts-ignore
const ReactPhoneInput: typeof ReactPhoneInput2 = ReactPhoneInput2.default ? ReactPhoneInput2.default : ReactPhoneInput2

export interface PhoneInputProps
  extends ReactPhoneInputProps, Omit<InputWrapperProps, 'onBlur' | 'onChange' | 'onClick' | 'onFocus' | 'onKeyDown'> {
  rootProps?: BoxProps
  /**
   * only after the first time input focus, shows country dial code
   */
  showContryCodeAfterFocus?: boolean
  country?: string
}

export const PhoneInput = (props: PhoneInputProps) => {
  const { wrapperProps } = useInputProps('TextInput', {}, props)
  const { classNames: wrapperClassNames, styles: wrapperStyles, ...restWrapperProps } = wrapperProps

  const {
    value,
    placeholder = '',
    inputClass,
    buttonClass,
    containerClass,
    dropdownClass,
    searchClass,
    showContryCodeAfterFocus,
    country = '',
    onFocus,
    rootProps: boxProps,
    ...rest
  } = props

  const [isPhoneInputFocus, setIsPhoneInputFocus] = useState(false)
  const hasError = !!wrapperProps.error

  return (
    <Box {...boxProps}>
      <Input.Wrapper
        {...restWrapperProps}
        styles={wrapperStyles}
        classNames={{
          label: classes.label,
          description: classes.description,
          error: classes.error,
          ...wrapperClassNames
        }}
      >
        <ReactPhoneInput
          value={value}
          inputClass={inputClass}
          buttonClass={`${classes.dropdownButton} ${buttonClass ?? ''}`}
          containerClass={`${classes.container} ${hasError ? classes.containerError : ''} ${containerClass ?? ''}`}
          disableDropdown
          dropdownClass={dropdownClass}
          searchClass={searchClass}
          placeholder={placeholder}
          specialLabel=""
          country={showContryCodeAfterFocus && isPhoneInputFocus ? country.toLowerCase() : undefined}
          onFocus={(e, data) => {
            setIsPhoneInputFocus(true)
            onFocus?.(e, data)
          }}
          masks={{ cn: '...........' }}
          {...rest}
        />
      </Input.Wrapper>
    </Box>
  )
}

/* ── Validation helper ── */
const loadLibphonenumber = async () => {
  const { default: _ } = await import('google-libphonenumber')
  return _
}

export const validPhoneNumber = async (country: string, phoneNum: string) => {
  try {
    const libPhone = await loadLibphonenumber()
    const phoneUtil = libPhone.PhoneNumberUtil.getInstance()
    const phone = phoneUtil.parseAndKeepRawInput(phoneNum, country)
    return phoneUtil.isValidNumberForRegion(phone, country)
  } catch (e: any) {
    throw e
  }
}
