import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { TextInput } from '../../primitive/TextInput/index.js'
import { renderWithProviders, screen } from '../render.js'

describe('TextInput', () => {
  it('renders with a placeholder', () => {
    renderWithProviders(<TextInput placeholder="Enter your name" />)
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('calls onChange when the user types', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<TextInput placeholder="Enter your name" onChange={onChange} />)
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Ahmed')

    // fires once per keystroke — confirm it was called and the final DOM value is correct,
    // rather than asserting a specific call count that's brittle to how userEvent batches input
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByPlaceholderText('Enter your name')).toHaveValue('Ahmed')
  })

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    renderWithProviders(<TextInput ref={ref} placeholder="Enter your name" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByPlaceholderText('Enter your name'))
  })

  // ── Addons ──
  describe('addons', () => {
    it('renders a left addon', () => {
      renderWithProviders(<TextInput leftAddon="https://" placeholder="your-site.com" />)
      expect(screen.getByText('https://')).toBeInTheDocument()
    })

    it('renders a right addon', () => {
      renderWithProviders(<TextInput rightAddon=".com" placeholder="your-site" />)
      expect(screen.getByText('.com')).toBeInTheDocument()
    })

    it('renders both addons simultaneously', () => {
      renderWithProviders(<TextInput leftAddon="https://" rightAddon=".com" placeholder="your-site" />)
      expect(screen.getByText('https://')).toBeInTheDocument()
      expect(screen.getByText('.com')).toBeInTheDocument()
    })
  })

  // ── Error / success state ──
  // These exist because the component has real precedence logic:
  //   const isSuccess = success && !isError
  // meaning error always wins over success when both are somehow set —
  // that rule is worth locking in with a test, not just trusting the ternary.
  describe('state icons', () => {
    it('shows no state icon when neither error nor success is set', () => {
      const { container } = renderWithProviders(<TextInput placeholder="Enter your name" />)
      expect(container.querySelectorAll('svg')).toHaveLength(0)
    })

    it('shows the error icon when error is set', () => {
      const { container } = renderWithProviders(<TextInput placeholder="Enter your name" error="Required field" />)
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(screen.getByText('Required field')).toBeInTheDocument()
    })

    it('shows the success icon when success is true and there is no error', () => {
      const { container } = renderWithProviders(<TextInput placeholder="Enter your name" success />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('prioritizes error over success when both are set', () => {
      renderWithProviders(<TextInput placeholder="Enter your name" success error="Required field" />)
      // If success silently won, this text would never render
      expect(screen.getByText('Required field')).toBeInTheDocument()
    })

    it('does not override an explicit rightSection with the state icon', () => {
      renderWithProviders(
        <TextInput placeholder="Enter your name" error="Required field" rightSection={<span>custom</span>} />
      )
      // rightSection ?? stateRightSection — explicit rightSection must win
      expect(screen.getByText('custom')).toBeInTheDocument()
    })
  })

  // ── classNames merge ──
  it('merges an externally-passed wrapper className instead of dropping it', () => {
    const { container } = renderWithProviders(
      <TextInput placeholder="Enter your name" classNames={{ wrapper: 'my-custom-wrapper' }} />
    )
    expect(container.querySelector('.my-custom-wrapper')).toBeInTheDocument()
  })
})
