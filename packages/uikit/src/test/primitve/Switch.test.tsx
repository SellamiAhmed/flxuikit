import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from '../../primitive/Switch/index.js'
import { renderWithProviders, screen } from '../render.js'

describe('Switch', () => {
  it('renders with a label', () => {
    renderWithProviders(<Switch label="Enable notifications" />)
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeInTheDocument()
  })

  it('renders unchecked by default', () => {
    renderWithProviders(<Switch label="Enable notifications" />)
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).not.toBeChecked()
  })

  // ── The custom onChange signature ──
  // Mantine's native Switch onChange passes the raw ChangeEvent. This
  // wrapper intentionally narrows that down to a plain boolean via
  // `onChange={(event) => onChange?.(event.currentTarget.checked)}`.
  // This is the single most important behavior in the whole file —
  // if it regresses, every consumer's onChange handler breaks silently
  // (boolean logic like `if (checked)` would instead receive an Event
  // object, which is always truthy).
  it('calls onChange with a boolean, not the raw event', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<Switch label="Enable notifications" onChange={onChange} />)
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
    expect(typeof onChange.mock.calls[0][0]).toBe('boolean')
  })

  it('calls onChange with false when toggling an already-checked switch', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<Switch label="Enable notifications" defaultChecked onChange={onChange} />)
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }))

    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('toggles via keyboard (Space)', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<Switch label="Enable notifications" onChange={onChange} />)
    await user.tab()
    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('reflects a controlled checked value', () => {
    renderWithProviders(<Switch label="Enable notifications" checked readOnly />)
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeChecked()
  })

  it('does not toggle and does not call onChange when disabled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<Switch label="Enable notifications" disabled onChange={onChange} />)
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }))

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).not.toBeChecked()
  })

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    renderWithProviders(<Switch ref={ref} label="Enable notifications" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByRole('switch', { name: 'Enable notifications' }))
  })

  it('renders without a label when none is provided', () => {
    renderWithProviders(<Switch aria-label="Toggle" />)
    expect(screen.getByRole('switch', { name: 'Toggle' })).toBeInTheDocument()
  })
})
