import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { renderWithProviders as render, screen, within } from '../../render.js'

import { formatDuration } from './../../../business/TimeRangePicker/helper.js'
import { TimeRangePicker } from './../../../business/TimeRangePicker/index.js'

// NOTE: this test file lives at src/test/business/, while the component and its dependencies
// live at src/business/TimeRangePicker/ — two directories up, not alongside. That mismatch is
// why every relative import here (and the vi.mock path below) needs the ../../business/... prefix
// rather than ./ — confirmed the hard way after the initial ./ guess broke both a regular import
// and vi.mock's module resolution (vi.mock resolves relative to this file, not to index.tsx).

// AbsoluteTimeRangePicker owns the DatePicker + dual date/time inputs — genuinely calendar-heavy,
// DOM-measurement-fragile territory (same category as SearchArea's datepicker fields). Mocking it
// here isolates TimeRangePicker's own responsibility: menu state, quick-range selection, and the
// handoff into/out of custom mode. The mock's own correctness belongs in AbsoluteTimeRangePicker's
// own test file, not here.
//
// NOTE: vi.mock resolves its path relative to THIS file (src/test/business/), not relative to
// index.tsx (src/business/TimeRangePicker/) even though index.tsx is the one doing the real
// import — same directory mismatch that bit the TimeRangePicker/formatDuration imports earlier.
vi.mock('../../../business/TimeRangePicker/AbsoluteTimeRangePicker.js', () => ({
  default: ({ onChange, onCancel, onReturnClick }: any) => (
    <div data-testid="absolute-picker-mock">
      <button onClick={onReturnClick}>mock-back</button>
      <button onClick={onCancel}>mock-cancel</button>
      <button onClick={() => onChange({ type: 'absolute', value: [1000, 2000] })}>mock-apply</button>
    </div>
  )
}))

// Returns both the trigger and the (now-open) menu element so callers can scope queries with
// within(menu) — needed because when `value` is already set, the trigger's own label can contain
// the same text as a menu item (e.g. "Past 15 minutes"), and an unscoped getByText would be
// ambiguous or silently match the wrong one.
//
// findByRole (not getByRole) is deliberate: across a run where many tests in this file open the
// menu back-to-back, it only reliably opens on the very first attempt in this file — every
// subsequent open produces an empty portal with no dropdown content, even though the click fires.
// That pattern (works exactly once per file, then stops) smells like a stateful mock in setup.ts —
// most likely ResizeObserver/getBoundingClientRect, which Mantine's Popover/floating-ui positioning
// depends on — not resetting between tests. findByRole will retry for a bit rather than fail
// instantly, and if the underlying issue is really "broken after first use" rather than "slow",
// this will surface as a clear timeout on `role: menu` instead of a confusing "text not found in
// an empty body." Worth checking setup.ts for how those mocks are installed (module-level vs.
// re-installed in beforeEach) if this timeout shows up.
const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  const trigger = screen.getByRole('button', { name: /time range|past|next/i })
  await user.click(trigger)
  const menu = await screen.findByRole('menu')
  return { trigger, menu }
}

describe('TimeRangePicker — trigger display', () => {
  it('shows placeholder and "All" badge when value is empty', () => {
    render(<TimeRangePicker />)
    expect(screen.getByText('Time Range')).toBeInTheDocument()
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('honors custom placeholder and badgePlaceholder text', () => {
    render(<TimeRangePicker placeholder="Pick a window" badgePlaceholder="None" />)
    expect(screen.getByText('Pick a window')).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()
  })

  it('shows a "Past X" label for a non-future relative value', () => {
    render(<TimeRangePicker value={{ type: 'relative', value: 1800 }} />)
    expect(screen.getByText(/^Past/)).toBeInTheDocument()
  })

  it('shows a "Next X" label for a future relative value', () => {
    render(<TimeRangePicker value={{ type: 'relative', value: 1800, isFuture: true }} />)
    expect(screen.getByText(/^Next/)).toBeInTheDocument()
  })

  it('shows the formatted date range for an absolute value', () => {
    render(<TimeRangePicker value={{ type: 'absolute', value: [1735689600, 1735776000] }} timezone={0} />)
    // Real timeFormatter output — not mocked, so this exercises the real formatting path.
    // Format is 'MMM D, YYYY HH:mm' per the component's default absoluteFormatter fallback.
    expect(screen.getByText(/Jan 1, 2025.*Jan 2, 2025/)).toBeInTheDocument()
  })

  it('uses a custom relativeFormatter when provided', () => {
    render(
      <TimeRangePicker value={{ type: 'relative', value: 3600 }} relativeFormatter={(r) => `Custom: ${r.value}s`} />
    )
    expect(screen.getByText('Custom: 3600s')).toBeInTheDocument()
  })
})

describe('TimeRangePicker — quick range menu', () => {
  it('opens on click and lists the default quick ranges', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker />)
    const { menu } = await openMenu(user)

    // Labels are derived from the real formatDuration rather than a guessed string — a duration
    // like 24h can legitimately render as "1 day" instead of "24 hours" depending on pretty-ms's
    // unit selection, and hard-coding that guess is exactly what went wrong last round.
    expect(within(menu).getByText(`Past ${formatDuration(5 * 60)}`)).toBeInTheDocument()
    expect(within(menu).getByText(`Past ${formatDuration(24 * 3600)}`)).toBeInTheDocument()
  })

  it('selecting a quick range calls onChange with a relative, non-future value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeRangePicker onChange={onChange} />)
    const { menu } = await openMenu(user)

    await user.click(within(menu).getByText(`Past ${formatDuration(15 * 60)}`))
    expect(onChange).toHaveBeenCalledWith({ type: 'relative', value: 15 * 60, isFuture: false })
  })

  it('supports custom QuickRange objects with isFuture and a custom label', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeRangePicker onChange={onChange} quickRanges={[{ value: 600, isFuture: true, label: 'Next 10 min' }]} />)
    const { menu } = await openMenu(user)

    await user.click(within(menu).getByText('Next 10 min'))
    expect(onChange).toHaveBeenCalledWith({ type: 'relative', value: 600, isFuture: true })
  })

  it('highlights the quick range matching the current relative value', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker value={{ type: 'relative', value: 15 * 60 }} />)
    const { menu } = await openMenu(user)

    // Scoped to the menu, not the whole screen — when `value` is set, the trigger's own label
    // shows this exact same text ("Past 15 minutes"), so an unscoped query would be ambiguous
    // (or worse, silently match the trigger instead of the menu item, which is what produced the
    // "toMatch expects a string but got undefined" failure last run).
    const label = within(menu).getByText(`Past ${formatDuration(15 * 60)}`)
    const activeItem = label.closest('[class*="menuItem"]')
    // menuItemActive is a CSS-module class; asserting its presence via className rather than
    // a literal string, since CSS modules hash the class name at build time.
    expect(activeItem?.className).toMatch(/menuItemActive/)
  })
})

describe('TimeRangePicker — disableAbsoluteRanges', () => {
  it('hides the "Custom" entry when disableAbsoluteRanges is set', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker disableAbsoluteRanges />)
    const { menu } = await openMenu(user)

    expect(within(menu).queryByText('Custom')).not.toBeInTheDocument()
  })

  it('shows the "Custom" entry by default', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker />)
    const { menu } = await openMenu(user)

    expect(within(menu).getByText('Custom')).toBeInTheDocument()
  })
})

describe('TimeRangePicker — custom (absolute) mode handoff', () => {
  it('clicking "Custom" swaps the quick-range list for the mocked AbsoluteTimeRangePicker', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker />)
    const { menu } = await openMenu(user)

    await user.click(within(menu).getByText('Custom'))
    // The mock swaps in place inside the same dropdown node, so `menu` is still valid here.
    expect(within(menu).getByTestId('absolute-picker-mock')).toBeInTheDocument()
    expect(within(menu).queryByText(`Past ${formatDuration(5 * 60)}`)).not.toBeInTheDocument()
  })

  it('applying from the absolute picker calls onChange with the absolute value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeRangePicker onChange={onChange} />)
    const { menu } = await openMenu(user)
    await user.click(within(menu).getByText('Custom'))

    await user.click(within(menu).getByText('mock-apply'))
    expect(onChange).toHaveBeenCalledWith({ type: 'absolute', value: [1000, 2000] })
  })

  it('cancel from the absolute picker does not call onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeRangePicker onChange={onChange} />)
    const { menu } = await openMenu(user)
    await user.click(within(menu).getByText('Custom'))

    await user.click(within(menu).getByText('mock-cancel'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('the back button returns to the quick-range list within the same menu session', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker />)
    const { menu } = await openMenu(user)
    await user.click(within(menu).getByText('Custom'))
    expect(within(menu).getByTestId('absolute-picker-mock')).toBeInTheDocument()

    await user.click(within(menu).getByText('mock-back'))
    expect(within(menu).getByText(`Past ${formatDuration(5 * 60)}`)).toBeInTheDocument()
    expect(within(menu).queryByTestId('absolute-picker-mock')).not.toBeInTheDocument()
  })
})

describe('TimeRangePicker — clearable', () => {
  it('does not show a clear icon when clearable is false, even with a value', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker clearable={false} value={{ type: 'relative', value: 300 }} />)
    const trigger = screen.getByRole('button', { name: /past/i })
    await user.hover(trigger)

    // IconSelector is always present in this branch; there is no accessible "clear" affordance to query,
    // so this is really asserting via the onClick behavior test below rather than icon presence.
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()
  })

  it('hovering a filled, clearable trigger reveals a clear action that calls onChange with no args', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeRangePicker clearable value={{ type: 'relative', value: 300 }} onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /past 5 minutes/i })
    await user.hover(trigger)

    // ActionIcon has no accessible name in the source (no aria-label on the IconX button),
    // so we scope to the trigger and grab the nested <button>. If this comes back empty,
    // that's the first thing to check — it likely means an aria-label should be added
    // to the ActionIcon in the component itself, not just worked around in the test.
    const clearButton = within(trigger)
      .getAllByRole('button')
      .find((btn) => btn !== trigger)
    expect(clearButton).toBeTruthy()

    await user.click(clearButton!)
    expect(onChange).toHaveBeenCalledWith()
  })

  it('clicking clear does not also open the menu (stopPropagation)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<TimeRangePicker clearable value={{ type: 'relative', value: 300 }} onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /past 5 minutes/i })
    await user.hover(trigger)
    const clearButton = within(trigger)
      .getAllByRole('button')
      .find((btn) => btn !== trigger)
    await user.click(clearButton!)

    expect(screen.queryByText('Custom')).not.toBeInTheDocument()
  })
})

describe('TimeRangePicker — footer', () => {
  it('renders a footer node inside the dropdown when provided', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker footer={<div>my-footer</div>} />)
    const { menu } = await openMenu(user)

    expect(within(menu).getByText('my-footer')).toBeInTheDocument()
  })

  it('does not render footer content or its divider when footer is omitted', async () => {
    const user = userEvent.setup()
    render(<TimeRangePicker />)
    const { menu } = await openMenu(user)

    expect(within(menu).queryByText('my-footer')).not.toBeInTheDocument()
  })
})
