import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { NumberInput } from '../../primitive/NumberInput/index.js'
import { renderWithProviders, screen } from '../render.js'

describe('NumberInput', () => {
  it('renders with a placeholder', () => {
    renderWithProviders(<NumberInput placeholder="Enter amount" />)
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument()
  })

  it('calls onChange when the user types a number', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<NumberInput placeholder="Enter amount" onChange={onChange} />)
    await user.type(screen.getByPlaceholderText('Enter amount'), '42')

    expect(onChange).toHaveBeenCalled()
    expect(screen.getByPlaceholderText('Enter amount')).toHaveValue('42')
  })

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    renderWithProviders(<NumberInput ref={ref} placeholder="Enter amount" />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current).toBe(screen.getByPlaceholderText('Enter amount'))
  })

  // ── Addons ──
  describe('addons', () => {
    it('renders a left addon', () => {
      renderWithProviders(<NumberInput leftAddon="$" placeholder="0.00" />)
      expect(screen.getByText('$')).toBeInTheDocument()
    })

    it('renders a right addon', () => {
      renderWithProviders(<NumberInput rightAddon="USD" placeholder="0.00" />)
      expect(screen.getByText('USD')).toBeInTheDocument()
    })

    it('falls back to a passed rightSection when no rightAddon is given', () => {
      renderWithProviders(<NumberInput rightSection={<span>custom-section</span>} placeholder="0.00" />)
      expect(screen.getByText('custom-section')).toBeInTheDocument()
    })

    it('prefers rightAddon over a passed rightSection when both are given', () => {
      renderWithProviders(
        <NumberInput rightAddon="USD" rightSection={<span>custom-section</span>} placeholder="0.00" />
      )
      // Component logic: !!rightAddon ? <Typography>{rightAddon}</Typography> : rightSection
      // rightAddon wins outright — rightSection is never rendered when rightAddon is set.
      expect(screen.getByText('USD')).toBeInTheDocument()
      expect(screen.queryByText('custom-section')).not.toBeInTheDocument()
    })
  })

  // ── Stepper controls ──
  // Mantine's NumberInput up/down buttons are aria-hidden="true" with no
  // aria-label (they're treated as mouse-only, presentational controls —
  // keyboard users increment/decrement via ArrowUp/ArrowDown on the input
  // itself instead). That means they can't be queried by role or label
  // text; query by the data-direction attribute instead.
  describe('increment/decrement controls', () => {
    it('increments the value when the up control is clicked', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()

      const { container } = renderWithProviders(
        <NumberInput defaultValue={5} onChange={onChange} aria-label="Quantity" />
      )
      const upControl = container.querySelector('[data-direction="up"]') as HTMLButtonElement
      expect(upControl).not.toBeNull()
      await user.click(upControl)

      expect(onChange).toHaveBeenCalledWith(6)
    })

    it('decrements the value when the down control is clicked', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()

      const { container } = renderWithProviders(
        <NumberInput defaultValue={5} onChange={onChange} aria-label="Quantity" />
      )
      const downControl = container.querySelector('[data-direction="down"]') as HTMLButtonElement
      expect(downControl).not.toBeNull()
      await user.click(downControl)

      expect(onChange).toHaveBeenCalledWith(4)
    })

    it('does not decrement below min', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()

      const { container } = renderWithProviders(
        <NumberInput defaultValue={0} min={0} onChange={onChange} aria-label="Quantity" />
      )
      const downControl = container.querySelector('[data-direction="down"]') as HTMLButtonElement
      await user.click(downControl)

      expect(onChange).not.toHaveBeenCalledWith(-1)
    })

    it('does not increment above max', async () => {
      const onChange = vi.fn()
      const user = userEvent.setup()

      const { container } = renderWithProviders(
        <NumberInput defaultValue={10} max={10} onChange={onChange} aria-label="Quantity" />
      )
      const upControl = container.querySelector('[data-direction="up"]') as HTMLButtonElement
      // Mantine actually disables the control at the boundary — confirm that too.
      expect(upControl).toBeDisabled()
      await user.click(upControl)

      expect(onChange).not.toHaveBeenCalledWith(11)
    })
  })

  it('renders the stepper controls as disabled when the input is disabled', () => {
    // NOTE: we deliberately do NOT simulate a click here and assert
    // onChange wasn't called. jsdom does not fully replicate real-browser
    // behavior for disabled elements — Mantine's stepper likely uses
    // onMouseDown (for hold-to-repeat), and jsdom does not suppress
    // mousedown on disabled buttons the way a real browser does, even
    // though the `click` activation itself is correctly blocked. That
    // makes "click a disabled control, assert no onChange" unreliable
    // here — it can false-fail depending on jsdom's event internals.
    //
    // What IS reliably true and worth asserting in Vitest: the DOM
    // contract — the button actually carries the disabled attribute,
    // which is what real browsers use to block all interaction. The
    // end-to-end guarantee that clicking it does nothing belongs in
    // Playwright's visual/interaction suite (Day 5), which runs in a
    // real browser engine, not jsdom.
    const { container } = renderWithProviders(<NumberInput defaultValue={5} disabled aria-label="Quantity" />)
    const upControl = container.querySelector('[data-direction="up"]') as HTMLButtonElement
    const downControl = container.querySelector('[data-direction="down"]') as HTMLButtonElement

    expect(upControl).toBeDisabled()
    expect(downControl).toBeDisabled()
    expect(screen.getByLabelText('Quantity')).toBeDisabled()
  })
})
