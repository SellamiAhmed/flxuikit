// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

// NavMenuPortal's own implementation isn't in scope here — mock it as a
// pass-through so these tests isolate NavMenuItem's own branching logic
// (rail vs full mode, controlled/uncontrolled `opened`) rather than portal
// mounting mechanics, which belong in their own test if/when that file is shared.
vi.mock('./../../../business/AppShell/navbar/context/NavMenuPortal.js', () => ({
  NavMenuPortal: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

import { NavbarCollapseContext } from './../../../business/AppShell/navbar/context/navbar-collapse-context.js'
import { NavMenuItem } from './../../../business/AppShell/navbar/NavMenuItem.js'

const renderWithProviders = (ui: React.ReactElement, { collapsed = false } = {}) =>
  render(
    <MantineProvider>
      <NavbarCollapseContext.Provider value={collapsed}>{ui}</NavbarCollapseContext.Provider>
    </MantineProvider>
  )

describe('NavMenuItem — full (non-rail) mode', () => {
  it('renders a leaf item as a link with its label and href', () => {
    renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" />)
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard')
  })

  it('marks the list item as highlighted when active', () => {
    const { container } = renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" active />)
    expect(container.querySelector('li[data-highlighted]')).not.toBeNull()
  })

  // Documents current behavior, not necessarily desired: full mode shows a
  // badge for 0 (typeof check only), while rail mode hides it (badgeCount > 0).
  it('renders a "0" badge in full mode (no >0 guard, unlike rail mode)', () => {
    renderWithProviders(<NavMenuItem label="Inbox" href="/inbox" badgeCount={0} />)
    expect(screen.getByLabelText('0 unread')).toHaveTextContent('0')
  })

  it('calls onClick for a leaf item without touching expand state', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" onClick={onClick} />)
    await user.click(screen.getByRole('link', { name: 'Dashboard' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('defaults to collapsed (aria-expanded=false) and expands uncontrolled on click', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <NavMenuItem label="Settings">
        <li>Child item</li>
      </NavMenuItem>
    )
    const toggle = screen.getByRole('button', { name: 'Settings' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('honors defaultOpened for the uncontrolled initial state', () => {
    renderWithProviders(
      <NavMenuItem label="Settings" defaultOpened>
        <li>Child item</li>
      </NavMenuItem>
    )
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('stays controlled by the opened prop and reports the intended next state via onChange without flipping itself', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderWithProviders(
      <NavMenuItem label="Settings" opened onChange={onChange}>
        <li>Child item</li>
      </NavMenuItem>
    )
    const toggle = screen.getByRole('button', { name: 'Settings' })
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    // Controlled: internal state doesn't move, so it's still "true" from the prop...
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    // ...but onChange is told the consumer should flip it to false.
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('calls onClick in addition to toggling for parent items', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(
      <NavMenuItem label="Settings" onClick={onClick}>
        <li>Child item</li>
      </NavMenuItem>
    )
    await user.click(screen.getByRole('button', { name: 'Settings' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('disables the toggle button when disabled is set (parent items only)', () => {
    renderWithProviders(
      <NavMenuItem label="Settings" disabled>
        <li>Child item</li>
      </NavMenuItem>
    )
    expect(screen.getByRole('button', { name: 'Settings' })).toBeDisabled()
  })
})

describe('NavMenuItem — rail (collapsed) mode', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders an icon-only action with the label as its accessible name, no visible text', () => {
    renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" />, { collapsed: true })
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument() // no visible label span in rail mode
  })

  it('renders as an anchor when href is given, a button otherwise', () => {
    const { rerender } = renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" />, {
      collapsed: true
    })
    expect(screen.getByRole('link', { name: 'Dashboard' }).tagName).toBe('A')

    rerender(
      <MantineProvider>
        <NavbarCollapseContext.Provider value={true}>
          <NavMenuItem label="Settings" onClick={vi.fn()} />
        </NavbarCollapseContext.Provider>
      </MantineProvider>
    )
    expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument()
  })

  it('hides the badge dot when badgeCount is 0 or omitted (unlike full mode)', () => {
    renderWithProviders(<NavMenuItem label="Inbox" href="/inbox" badgeCount={0} />, { collapsed: true })
    const link = screen.getByRole('link', { name: 'Inbox' })
    expect(link.querySelector('[aria-hidden="true"] + [aria-hidden="true"]')).toBeNull()
  })

  it('shows the badge dot when badgeCount is greater than 0', () => {
    const { container } = renderWithProviders(<NavMenuItem label="Inbox" href="/inbox" badgeCount={3} />, {
      collapsed: true
    })
    // The dot is a visually-hidden decorative span; assert via class-adjacent structure instead of text.
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(1)
  })

  it('calls onClick when the rail action is activated', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" onClick={onClick} />, {
      collapsed: true
    })
    await user.click(screen.getByRole('link', { name: 'Dashboard' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

describe('NavMenuItem — disabled leaf item (fixed behavior)', () => {
  it('sets aria-disabled, strips href, removes from tab order, and blocks click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" disabled onClick={onClick} />)
    const link = screen.getByText('Dashboard').closest('a') as HTMLElement
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).not.toHaveAttribute('href')
    expect(link).toHaveAttribute('tabindex', '-1')
    await user.click(link)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not set aria-disabled when not disabled', () => {
    renderWithProviders(<NavMenuItem label="Dashboard" href="/dashboard" />)
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-disabled')
  })
})

describe('NavMenuItem — renderLink mode (full)', () => {
  it('delegates the leaf item to renderLink instead of the internal Anchor', () => {
    renderWithProviders(
      <NavMenuItem
        label="Dashboard"
        href="/dashboard"
        renderLink={(linkProps) => <a data-testid="custom-link" href="/router-dashboard" {...linkProps} />}
      />
    )
    expect(screen.getByTestId('custom-link')).toHaveAttribute('href', '/router-dashboard')
    expect(screen.getByTestId('custom-link')).toHaveTextContent('Dashboard')
  })

  it('guards onClick through renderLink when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(
      <NavMenuItem
        label="Dashboard"
        disabled
        onClick={onClick}
        renderLink={(linkProps) => <a data-testid="custom-link" href="/x" {...linkProps} />}
      />
    )
    await user.click(screen.getByTestId('custom-link'))
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('NavMenuItem — renderLink mode (rail)', () => {
  it('delegates the rail action to renderLink', () => {
    renderWithProviders(
      <NavMenuItem
        label="Dashboard"
        href="/dashboard"
        renderLink={(linkProps) => <a data-testid="custom-rail-link" href="/router-dashboard" {...linkProps} />}
      />,
      { collapsed: true }
    )
    expect(screen.getByTestId('custom-rail-link')).toHaveAttribute('href', '/router-dashboard')
  })
})
