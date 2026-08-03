import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { SearchArea, type FormItem } from '../../business/SearchArea/index.js'
import { renderWithProviders, screen, waitFor } from '../render.js'

// Mock the two hooks that introduce real timing/URL complexity.
// useDebouncedValue: pass the value through immediately — no need to wait
// 800ms in every test just to prove the wiring works.
// useURLQueryState: behaves like useState so we can control/observe it
// per test without a real router/URL.
const setFormStateMock = vi.fn()

vi.mock('../../hooks/index.js', () => ({
  useDebouncedValue: (value: unknown) => [value],
  useURLQueryState: (_key: string, defaultValues: unknown) => [defaultValues, setFormStateMock]
}))

beforeEach(() => {
  setFormStateMock.mockClear()
})

const textField: FormItem = { type: 'text', name: 'query', placeholder: 'Search…' }
const selectField: FormItem = {
  type: 'select',
  name: 'status',
  placeholder: 'Status',
  data: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ]
}

describe('SearchArea', () => {
  it('renders a text field with its placeholder', () => {
    renderWithProviders(<SearchArea data={[textField]} onSubmit={vi.fn()} />)
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
  })

  it('renders a select field with its placeholder', () => {
    renderWithProviders(<SearchArea data={[selectField]} onSubmit={vi.fn()} />)
    expect(screen.getByPlaceholderText('Status')).toBeInTheDocument()
  })

  it('always renders the Clear Filters button', () => {
    renderWithProviders(<SearchArea data={[textField]} onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument()
  })

  it('supports a custom clearFiltersText', () => {
    renderWithProviders(<SearchArea data={[textField]} onSubmit={vi.fn()} clearFiltersText="Reset" />)
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  // ── Refresh button — conditional rendering ──
  describe('refresh button', () => {
    it('does not render when onRefresh is not provided', () => {
      renderWithProviders(<SearchArea data={[textField]} onSubmit={vi.fn()} />)
      expect(screen.queryByRole('button', { name: /refresh/i })).not.toBeInTheDocument()
    })

    it('renders and calls onRefresh when provided', async () => {
      const onRefresh = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(<SearchArea data={[textField]} onSubmit={vi.fn()} onRefresh={onRefresh} />)
      await user.click(screen.getByRole('button', { name: /refresh/i }))

      expect(onRefresh).toHaveBeenCalledTimes(1)
    })
  })

  // ── Text field submit flow ──
  describe('text field', () => {
    it('calls onSubmit as the user types (debounce mocked to pass through)', async () => {
      const onSubmit = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(<SearchArea data={[textField]} onSubmit={onSubmit} />)
      await user.type(screen.getByPlaceholderText('Search…'), 'a')

      await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    })

    it('submits immediately on Enter, independent of debounce', async () => {
      const onSubmit = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(<SearchArea data={[textField]} onSubmit={onSubmit} />)
      const input = screen.getByPlaceholderText('Search…')
      await user.type(input, 'urgent{enter}')

      expect(onSubmit).toHaveBeenCalled()
    })

    it('shows a clear (X) icon once there is a value, and clears + resubmits on click', async () => {
      const onSubmit = vi.fn()
      const user = userEvent.setup()

      const { container } = renderWithProviders(<SearchArea data={[textField]} onSubmit={onSubmit} />)
      const input = screen.getByPlaceholderText('Search…') as HTMLInputElement
      await user.type(input, 'test')

      const clearIcon = container.querySelector('svg')
      expect(clearIcon).not.toBeNull()

      onSubmit.mockClear()
      await user.click(clearIcon!)

      expect(input.value).toBe('')
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  // ── Select field ──
  describe('select field', () => {
    it('calls onSubmit when an option is chosen', async () => {
      const onSubmit = vi.fn()
      const user = userEvent.setup()

      renderWithProviders(<SearchArea data={[selectField]} onSubmit={onSubmit} />)
      await user.click(screen.getByPlaceholderText('Status'))
      await user.click(await screen.findByRole('option', { name: 'Active' }))

      expect(onSubmit).toHaveBeenCalled()
    })
  })

  // ── Clear Filters (global reset) ──
  it('Clear Filters resets fields to defaultValues and resubmits', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(
      <SearchArea data={[textField]} onSubmit={onSubmit} defaultValues={{ query: 'initial' } as any} />
    )
    const input = screen.getByPlaceholderText('Search…') as HTMLInputElement
    await user.clear(input)
    await user.type(input, 'changed')

    onSubmit.mockClear()
    await user.click(screen.getByRole('button', { name: /clear filters/i }))

    await waitFor(() => expect(input.value).toBe('initial'))
    expect(onSubmit).toHaveBeenCalled()
  })

  // ── URL recovery ──
  it('auto-submits on mount when recoverFromURLEnabled is true', () => {
    const onSubmit = vi.fn()
    renderWithProviders(<SearchArea data={[textField]} onSubmit={onSubmit} recoverFromURLEnabled />)

    // The component's own useEffect calls handleSubmit() on mount when
    // recoverFromURLEnabled is true — confirms the URL-recovery wiring
    // actually fires without requiring any user interaction.
    expect(onSubmit).toHaveBeenCalled()
  })

  it('does not auto-submit on mount when recoverFromURLEnabled is false/unset', () => {
    const onSubmit = vi.fn()
    renderWithProviders(<SearchArea data={[textField]} onSubmit={onSubmit} />)

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
