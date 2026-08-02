import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelect, Select } from '../../primitive/Select/index.js'
import { renderWithProviders, screen, within } from '../render.js'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' }
]

describe('Select', () => {
  it('renders with a placeholder', () => {
    renderWithProviders(<Select data={options} placeholder="Choose a framework" />)
    expect(screen.getByPlaceholderText('Choose a framework')).toBeInTheDocument()
  })

  it('opens the dropdown and selects an option, calling onChange with the value', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<Select data={options} onChange={onChange} placeholder="Choose a framework" />)

    await user.click(screen.getByPlaceholderText('Choose a framework'))
    await user.click(await screen.findByRole('option', { name: 'Vue' }))

    expect(onChange).toHaveBeenCalledWith('vue', expect.objectContaining({ value: 'vue' }))
  })

  it('reflects a controlled string value without crashing', () => {
    renderWithProviders(<Select data={options} value="react" onChange={() => {}} placeholder="Choose a framework" />)
    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
  })

  it('throws if creatable is true without an onCreate handler', () => {
    // Expected console.error from React for the thrown render error —
    // suppressed here since this failure is intentional and asserted below.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderWithProviders(<Select data={options} creatable placeholder="Choose a framework" />)
    }).toThrow('`onCreate` is required when `creatable` is true')

    consoleError.mockRestore()
  })

  it('shows a create option while searching when creatable is enabled', async () => {
    const onCreate = vi.fn((query: string) => ({ value: query.toLowerCase(), label: query }))
    const user = userEvent.setup()

    renderWithProviders(<Select data={options} creatable onCreate={onCreate} placeholder="Choose a framework" />)

    const input = screen.getByPlaceholderText('Choose a framework')
    await user.click(input)
    await user.type(input, 'Angular')

    expect(await screen.findByRole('option', { name: '+ Create Angular' })).toBeInTheDocument()
  })

  it('calls onCreate and onChange when the create option is selected', async () => {
    const onCreate = vi.fn((query: string) => ({ value: query.toLowerCase(), label: query }))
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(
      <Select data={options} creatable onCreate={onCreate} onChange={onChange} placeholder="Choose a framework" />
    )

    const input = screen.getByPlaceholderText('Choose a framework')
    await user.click(input)
    await user.type(input, 'Angular')
    await user.click(await screen.findByRole('option', { name: '+ Create Angular' }))

    expect(onCreate).toHaveBeenCalledWith('Angular')
    expect(onChange).toHaveBeenCalledWith('angular', expect.anything())
  })
})

describe('MultiSelect', () => {
  it('renders with a placeholder', () => {
    renderWithProviders(<MultiSelect data={options} placeholder="Choose frameworks" />)
    expect(screen.getByPlaceholderText('Choose frameworks')).toBeInTheDocument()
  })

  it('selects multiple options and calls onChange with an array', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<MultiSelect data={options} onChange={onChange} placeholder="Choose frameworks" />)

    const input = screen.getByPlaceholderText('Choose frameworks')
    await user.click(input)
    await user.click(await screen.findByRole('option', { name: 'React' }))

    expect(onChange).toHaveBeenCalledWith(['react'], undefined)
  })

  it('normalizes a single-string value into an array without crashing', () => {
    // Internal handling: MultiSelect coerces a non-array value into [value]
    // — this guards against a caller accidentally passing a bare string.
    renderWithProviders(
      // @ts-expect-error intentionally passing a malformed value to test the guard
      <MultiSelect data={options} value="react" onChange={() => {}} placeholder="Choose frameworks" />
    )
    expect(screen.getByPlaceholderText('Choose frameworks')).toBeInTheDocument()
  })
})
