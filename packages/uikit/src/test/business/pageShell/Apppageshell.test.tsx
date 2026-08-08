// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

// PageShellNotificationBell pulls in Menu/portal machinery that's out of scope
// here — stub it so these tests focus on AppPageShell's own composition logic
// (header/body wiring, left/right section defaults, prop overrides), not the
// bell's own rendering, which belongs in its own test file.
vi.mock('./../../../business/PageShell/PageShellNotificationBell.js', () => ({
  PageShellNotificationBell: (props: { count?: number; ariaLabel?: string }) => (
    <div data-testid="notification-bell-stub" data-count={props.count}>
      {props.ariaLabel ?? 'Notifications'}
    </div>
  )
}))

import { AppPageShell } from './../../../business/AppShell/AppPageShell.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('AppPageShell — no header mode', () => {
  it('renders children with no header when withHeader is false', () => {
    renderWithProviders(
      <AppPageShell withHeader={false} title="Should not render">
        <div>page content</div>
      </AppPageShell>
    )
    expect(screen.getByText('page content')).toBeInTheDocument()
    expect(screen.queryByText('Should not render')).not.toBeInTheDocument()
  })

  it('sets the max-width CSS variable on the root even without a header', () => {
    const { container } = renderWithProviders(
      <AppPageShell withHeader={false} maxWidth="800px">
        <div>content</div>
      </AppPageShell>
    )
    const root = container.querySelector('[class*="shellNoHeader"]') as HTMLElement
    expect(root.style.getPropertyValue('--app-shell-page-max-width')).toBe('800px')
  })
})

describe('AppPageShell — header content', () => {
  it('renders the title', () => {
    renderWithProviders(<AppPageShell title="Dashboard">content</AppPageShell>)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders top-level breadcrumbs, subtitle, and secondaryNav', () => {
    renderWithProviders(
      <AppPageShell
        title="Dashboard"
        breadcrumbs={<span>Home / Dashboard</span>}
        subtitle="Overview of your account"
        secondaryNav={<span>Tab A</span>}
      >
        content
      </AppPageShell>
    )
    expect(screen.getByText('Home / Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Overview of your account')).toBeInTheDocument()
    expect(screen.getByText('Tab A')).toBeInTheDocument()
  })

  it('headerProps.breadcrumbs/subtitle/secondaryNav override the top-level fallbacks', () => {
    renderWithProviders(
      <AppPageShell
        title="Dashboard"
        breadcrumbs={<span>Fallback Crumbs</span>}
        subtitle="Fallback subtitle"
        secondaryNav={<span>Fallback Nav</span>}
        headerProps={{
          breadcrumbs: <span>Header Crumbs</span>,
          subtitle: 'Header subtitle',
          secondaryNav: <span>Header Nav</span>
        }}
      >
        content
      </AppPageShell>
    )
    expect(screen.getByText('Header Crumbs')).toBeInTheDocument()
    expect(screen.queryByText('Fallback Crumbs')).not.toBeInTheDocument()
    expect(screen.getByText('Header subtitle')).toBeInTheDocument()
    expect(screen.queryByText('Fallback subtitle')).not.toBeInTheDocument()
    expect(screen.getByText('Header Nav')).toBeInTheDocument()
    expect(screen.queryByText('Fallback Nav')).not.toBeInTheDocument()
  })

  it('renders children inside the body', () => {
    renderWithProviders(<AppPageShell title="Dashboard">page content</AppPageShell>)
    expect(screen.getByText('page content')).toBeInTheDocument()
  })

  it('renders footer content when provided, omits it when not', () => {
    const { rerender } = renderWithProviders(
      <AppPageShell title="Dashboard" footer={<div>Footer content</div>}>
        content
      </AppPageShell>
    )
    expect(screen.getByText('Footer content')).toBeInTheDocument()

    rerender(
      <MantineProvider>
        <AppPageShell title="Dashboard">content</AppPageShell>
      </MantineProvider>
    )
    expect(screen.queryByText('Footer content')).not.toBeInTheDocument()
  })
})

describe('AppPageShell — left section (back button)', () => {
  it('omits the back button by default', () => {
    renderWithProviders(<AppPageShell title="Dashboard">content</AppPageShell>)
    expect(screen.queryByRole('button', { name: 'Navigate Back' })).not.toBeInTheDocument()
  })

  it('renders the back button when headerProps.withBack is true', () => {
    renderWithProviders(
      <AppPageShell title="Dashboard" headerProps={{ withBack: true }}>
        content
      </AppPageShell>
    )
    expect(screen.getByRole('button', { name: 'Navigate Back' })).toBeInTheDocument()
  })

  it('calls onBackClick when the back button is clicked', async () => {
    const user = userEvent.setup()
    const onBackClick = vi.fn()
    renderWithProviders(
      <AppPageShell title="Dashboard" headerProps={{ withBack: true, onBackClick }}>
        content
      </AppPageShell>
    )
    await user.click(screen.getByRole('button', { name: 'Navigate Back' }))
    expect(onBackClick).toHaveBeenCalledTimes(1)
  })

  it('a custom headerProps.leftSection fully overrides the default, even when withBack is true', () => {
    renderWithProviders(
      <AppPageShell title="Dashboard" headerProps={{ withBack: true, leftSection: <span>Custom Left</span> }}>
        content
      </AppPageShell>
    )
    expect(screen.getByText('Custom Left')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Navigate Back' })).not.toBeInTheDocument()
  })
})

describe('AppPageShell — right section (notification bell + actions)', () => {
  it('omits the notification bell when headerProps.notificationBell is not provided', () => {
    renderWithProviders(<AppPageShell title="Dashboard">content</AppPageShell>)
    expect(screen.queryByTestId('notification-bell-stub')).not.toBeInTheDocument()
  })

  it('renders the notification bell with its config when provided', () => {
    renderWithProviders(
      <AppPageShell title="Dashboard" headerProps={{ notificationBell: { count: 5, ariaLabel: 'Alerts' } }}>
        content
      </AppPageShell>
    )
    const bell = screen.getByTestId('notification-bell-stub')
    expect(bell).toHaveAttribute('data-count', '5')
    expect(bell).toHaveTextContent('Alerts')
  })

  it('renders headerActions alongside the default right section', () => {
    renderWithProviders(
      <AppPageShell title="Dashboard" headerActions={<button>Export</button>}>
        content
      </AppPageShell>
    )
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument()
  })

  it('a custom headerProps.rightSection fully overrides the default bell + actions', () => {
    renderWithProviders(
      <AppPageShell
        title="Dashboard"
        headerActions={<button>Export</button>}
        headerProps={{
          notificationBell: { count: 5 },
          rightSection: <span>Custom Right</span>
        }}
      >
        content
      </AppPageShell>
    )
    expect(screen.getByText('Custom Right')).toBeInTheDocument()
    expect(screen.queryByTestId('notification-bell-stub')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Export' })).not.toBeInTheDocument()
  })
})

describe('AppPageShell — scroll behavior', () => {
  it('adds the scrolled class to the header once the body has scrolled past the top', () => {
    const { container } = renderWithProviders(
      <AppPageShell title="Dashboard">
        <div>content</div>
      </AppPageShell>
    )
    const body = container.querySelector('[class*="body"]') as HTMLElement
    const header = container.querySelector('[class*="header"]') as HTMLElement
    expect(header.className).not.toMatch(/headerScrolled/)

    Object.defineProperty(body, 'scrollTop', { value: 20, configurable: true })
    fireEvent.scroll(body)

    expect(header.className).toMatch(/headerScrolled/)
  })
})
