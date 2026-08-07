// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { NavMenuSubItem } from './../../../business/AppShell/navbar/NavMenuSubItem.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('NavMenuSubItem — plain href mode', () => {
  it('renders a link with its label and href', () => {
    renderWithProviders(<NavMenuSubItem label="Team Settings" href="/settings/team" />)
    expect(screen.getByRole('link', { name: 'Team Settings' })).toHaveAttribute('href', '/settings/team')
  })

  it('applies the active class when active', () => {
    const { container } = renderWithProviders(<NavMenuSubItem label="Team Settings" href="/settings/team" active />)
    expect(container.querySelector('a[class*="active"]')).not.toBeNull()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<NavMenuSubItem label="Team Settings" href="/settings/team" onClick={onClick} />)
    await user.click(screen.getByRole('link', { name: 'Team Settings' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('functionally disables the link: no href, aria-disabled set, no click', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(<NavMenuSubItem label="Team Settings" href="/settings/team" disabled onClick={onClick} />)
    const link = screen.getByText('Team Settings') as HTMLElement
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).not.toHaveAttribute('href')
    expect(link).toHaveAttribute('tabindex', '-1')
    await user.click(link)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('NavMenuSubItem — renderLink mode', () => {
  it('delegates rendering to renderLink and forwards the label as children', () => {
    renderWithProviders(
      <NavMenuSubItem
        label="Team Settings"
        renderLink={(linkProps) => <a data-testid="custom-link" href="/custom" {...linkProps} />}
      />
    )
    const link = screen.getByTestId('custom-link')
    expect(link).toHaveTextContent('Team Settings')
  })

  it('ignores href when renderLink is provided', () => {
    renderWithProviders(
      <NavMenuSubItem
        label="Team Settings"
        href="/settings/team"
        renderLink={(linkProps) => <a data-testid="custom-link" href="/from-render-link" {...linkProps} />}
      />
    )
    // renderLink's own href wins; component-level href is never read once renderLink exists
    expect(screen.getByTestId('custom-link')).toHaveAttribute('href', '/from-render-link')
  })

  it('passes disabled state (aria-disabled, tabIndex, guarded onClick) into renderLink props', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderWithProviders(
      <NavMenuSubItem
        label="Team Settings"
        disabled
        onClick={onClick}
        renderLink={(linkProps) => <a data-testid="custom-link" href="/custom" {...linkProps} />}
      />
    )
    const link = screen.getByTestId('custom-link')
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')
    await user.click(link)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('passes active class through className into renderLink props', () => {
    renderWithProviders(
      <NavMenuSubItem
        label="Team Settings"
        active
        renderLink={(linkProps) => <a data-testid="custom-link" href="/custom" {...linkProps} />}
      />
    )
    expect(screen.getByTestId('custom-link').className).toMatch(/active/)
  })
})
