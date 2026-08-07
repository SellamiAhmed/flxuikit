// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

// Notifications and BottomUtilities get their own dedicated test files —
// stub them here so AppShell's tests are about AppShell's own logic
// (collapse state, banner detection, conditional sections), not theirs.
// BottomUtilities' real implementation isn't available in this session at all,
// so mocking is the only option, not just a convenience.
vi.mock('./../../../business/AppShell/section/notifications/Notifications.js', () => ({
  Notifications: (props: { notificationsAriaLabel: string; notifications: unknown[] }) => (
    <div data-testid="notifications-stub" data-count={props.notifications.length}>
      {props.notificationsAriaLabel}
    </div>
  )
}))
vi.mock('./../../../business/AppShell/section/utilities/BottomUtilities.js', () => ({
  BottomUtilities: (props: { collapsed?: boolean }) => (
    <div data-testid="utilities-stub" data-collapsed={String(!!props.collapsed)} />
  )
}))

import { AppShell, AppShellProps } from './../../../business/AppShell/index.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

const baseNavbar: AppShellProps['navbar'] = {
  logo: <span>Logo</span>,
  footer: { utilityActions: [] }
}

describe('AppShell — collapse state', () => {
  it('is expanded by default and shows the collapse-toggle button', () => {
    renderWithProviders(
      <AppShell navbar={baseNavbar}>
        <div>content</div>
      </AppShell>
    )
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  })

  it('is uncontrolled by default: clicking collapse then expand flips the header and calls the callbacks', async () => {
    const user = userEvent.setup()
    const onCollapse = vi.fn()
    const onExpand = vi.fn()
    renderWithProviders(
      <AppShell navbar={{ ...baseNavbar, onCollapse, onExpand }}>
        <div>content</div>
      </AppShell>
    )
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(onCollapse).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }))
    expect(onExpand).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toBeInTheDocument()
  })

  it('is controlled when navbar.collapsed is set: internal state never flips, but callbacks still fire', async () => {
    const user = userEvent.setup()
    const onExpand = vi.fn()
    renderWithProviders(
      <AppShell navbar={{ ...baseNavbar, collapsed: true, onExpand }}>
        <div>content</div>
      </AppShell>
    )
    const expandButton = screen.getByRole('button', { name: 'Expand sidebar' })
    await user.click(expandButton)
    expect(onExpand).toHaveBeenCalledTimes(1)
    // Still collapsed — the `collapsed` prop, not internal state, is the source of truth.
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
  })

  it('passes the resolved collapsed state down to BottomUtilities', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <AppShell navbar={baseNavbar}>
        <div>content</div>
      </AppShell>
    )
    expect(screen.getByTestId('utilities-stub')).toHaveAttribute('data-collapsed', 'false')
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(screen.getByTestId('utilities-stub')).toHaveAttribute('data-collapsed', 'true')
  })
})

describe('AppShell — conditional sections', () => {
  it('renders aboveMenu content when expanded, hides it when collapsed', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <AppShell navbar={{ ...baseNavbar, aboveMenu: <div>Quick actions</div> }}>
        <div>content</div>
      </AppShell>
    )
    expect(screen.getByText('Quick actions')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(screen.queryByText('Quick actions')).not.toBeInTheDocument()
  })

  it('renders the Notifications stub only when navbar.notifications is provided and not collapsed', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <AppShell
        navbar={{ ...baseNavbar, notifications: { notifications: [{ id: '1' }] as never, onDismiss: vi.fn() } }}
      >
        <div>content</div>
      </AppShell>
    )
    expect(screen.getByTestId('notifications-stub')).toHaveAttribute('data-count', '1')
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(screen.queryByTestId('notifications-stub')).not.toBeInTheDocument()
  })

  it('omits the Notifications stub entirely when navbar.notifications is not provided', () => {
    renderWithProviders(
      <AppShell navbar={baseNavbar}>
        <div>content</div>
      </AppShell>
    )
    expect(screen.queryByTestId('notifications-stub')).not.toBeInTheDocument()
  })

  it('defaults notificationsAriaLabel to "Announcements"', () => {
    renderWithProviders(
      <AppShell navbar={{ ...baseNavbar, notifications: { notifications: [], onDismiss: vi.fn() } }}>
        <div>content</div>
      </AppShell>
    )
    expect(screen.getByText('Announcements')).toBeInTheDocument()
  })

  it('always renders children inside the body regardless of collapse state', () => {
    renderWithProviders(
      <AppShell navbar={baseNavbar}>
        <div>page content</div>
      </AppShell>
    )
    expect(screen.getByText('page content')).toBeInTheDocument()
  })
})

describe('AppShell — banner detection effect', () => {
  it('sets data-height-flex once the banner has actual rendered content', async () => {
    const { container } = renderWithProviders(
      <AppShell banner={<div>Heads up</div>} navbar={baseNavbar}>
        <div>content</div>
      </AppShell>
    )
    await waitFor(() => {
      expect(container.querySelector('[data-height-flex="true"]')).not.toBeNull()
    })
  })

  it('leaves data-height-flex unset when no banner is provided', () => {
    const { container } = renderWithProviders(
      <AppShell navbar={baseNavbar}>
        <div>content</div>
      </AppShell>
    )
    expect(container.querySelector('[data-height-flex]')).toBeNull()
  })
})

describe('AppShell — navbar width CSS variables', () => {
  it('uses the default 240px width when expanded and navbar.width is not set', () => {
    const { container } = renderWithProviders(
      <AppShell navbar={baseNavbar}>
        <div>content</div>
      </AppShell>
    )
    const main = container.querySelector('[class*="appShellMain"]') as HTMLElement
    expect(main.style.getPropertyValue('--app-shell-navbar-width')).toBe('240px')
    expect(main.style.getPropertyValue('--app-shell-navbar-collapsed')).toBe('0')
  })

  it('respects a custom navbar.width when expanded', () => {
    const { container } = renderWithProviders(
      <AppShell navbar={{ ...baseNavbar, width: 320 }}>
        <div>content</div>
      </AppShell>
    )
    const main = container.querySelector('[class*="appShellMain"]') as HTMLElement
    expect(main.style.getPropertyValue('--app-shell-navbar-width')).toBe('320px')
  })

  it('collapses the width to the fixed rail width (56px) regardless of navbar.width', async () => {
    const user = userEvent.setup()
    const { container } = renderWithProviders(
      <AppShell navbar={{ ...baseNavbar, width: 320 }}>
        <div>content</div>
      </AppShell>
    )
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    const main = container.querySelector('[class*="appShellMain"]') as HTMLElement
    expect(main.style.getPropertyValue('--app-shell-navbar-width')).toBe('56px')
    expect(main.style.getPropertyValue('--app-shell-navbar-collapsed')).toBe('1')
  })
})
