import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

// Adjust this path if PhoneInput actually lives elsewhere in your source tree.
import { PhoneInput, validPhoneNumber } from '../../business/PhoneInput/index.js'
import { renderWithProviders, screen } from '../render.js'

describe('PhoneInput', () => {
  it('renders with a placeholder', () => {
    renderWithProviders(<PhoneInput placeholder="Enter phone number" />)
    expect(screen.getByPlaceholderText('Enter phone number')).toBeInTheDocument()
  })

  it('applies the error container class when an error is passed', () => {
    const { container } = renderWithProviders(
      <PhoneInput placeholder="Enter phone number" error="Invalid phone number" />
    )
    // containerError is applied conditionally: `hasError ? classes.containerError : ''`
    expect(container.querySelector('[class*="containerError"]')).not.toBeNull()
    expect(screen.getByText('Invalid phone number')).toBeInTheDocument()
  })

  it('does not apply the error container class when there is no error', () => {
    const { container } = renderWithProviders(<PhoneInput placeholder="Enter phone number" />)
    expect(container.querySelector('[class*="containerError"]')).toBeNull()
  })

  it('calls the consumer-provided onFocus handler in addition to internal focus tracking', async () => {
    const onFocus = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<PhoneInput placeholder="Enter phone number" onFocus={onFocus} />)
    await user.click(screen.getByPlaceholderText('Enter phone number'))

    // The component wraps onFocus internally (setIsPhoneInputFocus + onFocus?.(e, data))
    // — this confirms the wrapping doesn't swallow the consumer's own handler.
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it('renders a label passed through the Input.Wrapper', () => {
    renderWithProviders(<PhoneInput label="Phone" placeholder="Enter phone number" />)
    expect(screen.getByText('Phone')).toBeInTheDocument()
  })
})

describe('validPhoneNumber', () => {
  it('returns true for a valid US number', async () => {
    await expect(validPhoneNumber('US', '+14155552671')).resolves.toBe(true)
  })

  it('returns false for a malformed but parseable number in the wrong region', async () => {
    // A number that parses but does not match the given region's format
    await expect(validPhoneNumber('US', '+442071838750')).resolves.toBe(false)
  })

  it('throws when the input cannot be parsed as a phone number at all', async () => {
    await expect(validPhoneNumber('US', 'not-a-phone-number')).rejects.toThrow()
  })
})
