// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { AppSidenavNotification } from '../../../business/AppShell/types.js'

import { Notifications } from './../../../business/AppShell/section/notifications/Notifications.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

const makeNotification = (overrides: Partial<AppSidenavNotification> = {}): AppSidenavNotification =>
  ({
    id: '1',
    icon: <span>icon</span>,
    title: 'New feature',
    description: 'Check it out.',
    ...overrides
  }) as AppSidenavNotification

describe('Notifications', () => {
  it('applies the aria-label to the section', () => {
    renderWithProviders(<Notifications notificationsAriaLabel="Alerts" notifications={[]} onDismiss={vi.fn()} />)
    expect(screen.getByRole('region', { name: 'Alerts' })).toBeInTheDocument()
  })

  it('shows the empty state when there are no notifications', () => {
    renderWithProviders(<Notifications notificationsAriaLabel="Alerts" notifications={[]} onDismiss={vi.fn()} />)
    expect(screen.getByText('No active announcements.')).toBeInTheDocument()
  })

  it('renders title and description for each notification', () => {
    renderWithProviders(
      <Notifications notificationsAriaLabel="Alerts" notifications={[makeNotification()]} onDismiss={vi.fn()} />
    )
    expect(screen.getByText('New feature')).toBeInTheDocument()
    expect(screen.getByText('Check it out.')).toBeInTheDocument()
    expect(screen.queryByText('No active announcements.')).not.toBeInTheDocument()
  })

  it('shows a dismiss button by default and calls onDismiss with that exact item', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    const a = makeNotification({ id: 'a', title: 'Alert A' })
    const b = makeNotification({ id: 'b', title: 'Alert B' })
    renderWithProviders(<Notifications notificationsAriaLabel="Alerts" notifications={[a, b]} onDismiss={onDismiss} />)
    await user.click(screen.getByRole('button', { name: 'Dismiss Alert B' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
    expect(onDismiss).toHaveBeenCalledWith(b)
  })

  it('hides the dismiss button when dismissible is explicitly false', () => {
    renderWithProviders(
      <Notifications
        notificationsAriaLabel="Alerts"
        notifications={[makeNotification({ title: 'Sticky', dismissible: false })]}
        onDismiss={vi.fn()}
      />
    )
    expect(screen.queryByRole('button', { name: 'Dismiss Sticky' })).not.toBeInTheDocument()
  })

  it('renders a link with the default label when href is present', () => {
    renderWithProviders(
      <Notifications
        notificationsAriaLabel="Alerts"
        notifications={[makeNotification({ href: '/changelog' })]}
        onDismiss={vi.fn()}
      />
    )
    const link = screen.getByRole('link', { name: /Update now/ })
    expect(link).toHaveAttribute('href', '/changelog')
  })

  it('uses a custom linkLabel when provided', () => {
    renderWithProviders(
      <Notifications
        notificationsAriaLabel="Alerts"
        notifications={[makeNotification({ href: '/changelog', linkLabel: 'See what changed' })]}
        onDismiss={vi.fn()}
      />
    )
    expect(screen.getByText(/See what changed/)).toBeInTheDocument()
  })

  it('renders the link and calls onAction even without an href', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    renderWithProviders(
      <Notifications
        notificationsAriaLabel="Alerts"
        notifications={[makeNotification({ onAction })]}
        onDismiss={vi.fn()}
      />
    )
    await user.click(screen.getByText(/Update now/))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('renders no link when neither href nor onAction is provided', () => {
    renderWithProviders(
      <Notifications notificationsAriaLabel="Alerts" notifications={[makeNotification()]} onDismiss={vi.fn()} />
    )
    expect(screen.queryByText(/Update now/)).not.toBeInTheDocument()
  })
})
