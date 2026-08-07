// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { NavbarHeader } from './../../../business/AppShell/navbar/NavbarHeader.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('NavbarHeader — expanded', () => {
  it('renders the logo', () => {
    renderWithProviders(<NavbarHeader logo={<span>My Logo</span>} />)
    expect(screen.getByText('My Logo')).toBeInTheDocument()
  })

  it('omits the collapse-toggle button when onToggleCollapse is not provided', () => {
    renderWithProviders(<NavbarHeader logo={<span>My Logo</span>} />)
    expect(screen.queryByRole('button', { name: 'Collapse sidebar' })).not.toBeInTheDocument()
  })

  it('renders the collapse-toggle button and calls onToggleCollapse when provided', async () => {
    const user = userEvent.setup()
    const onToggleCollapse = vi.fn()
    renderWithProviders(<NavbarHeader logo={<span>My Logo</span>} onToggleCollapse={onToggleCollapse} />)
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(onToggleCollapse).toHaveBeenCalledTimes(1)
  })

  it('calls onLogoClick when the logo is clicked', async () => {
    const user = userEvent.setup()
    const onLogoClick = vi.fn()
    renderWithProviders(<NavbarHeader logo={<span>My Logo</span>} onLogoClick={onLogoClick} />)
    await user.click(screen.getByText('My Logo'))
    expect(onLogoClick).toHaveBeenCalledTimes(1)
  })
})

describe('NavbarHeader — collapsed', () => {
  it('renders logoCollapsed instead of logo', () => {
    renderWithProviders(<NavbarHeader logo={<span>Full Logo</span>} logoCollapsed={<span>Mini</span>} collapsed />)
    expect(screen.getByText('Mini')).toBeInTheDocument()
    expect(screen.queryByText('Full Logo')).not.toBeInTheDocument()
  })

  it('renders no brand block at all when logoCollapsed is not provided (no fallback to logo)', () => {
    renderWithProviders(<NavbarHeader logo={<span>Full Logo</span>} collapsed />)
    expect(screen.queryByText('Full Logo')).not.toBeInTheDocument()
  })

  it('always renders the expand-toggle button, even without an onToggleExpand handler', () => {
    renderWithProviders(<NavbarHeader logo={<span>Full Logo</span>} collapsed />)
    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
  })

  it('calls onToggleExpand when the expand button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleExpand = vi.fn()
    renderWithProviders(<NavbarHeader logo={<span>Full Logo</span>} collapsed onToggleExpand={onToggleExpand} />)
    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }))
    expect(onToggleExpand).toHaveBeenCalledTimes(1)
  })

  it('calls onLogoClick when the collapsed brand block is clicked', async () => {
    const user = userEvent.setup()
    const onLogoClick = vi.fn()
    renderWithProviders(
      <NavbarHeader
        logo={<span>Full Logo</span>}
        logoCollapsed={<span>Mini</span>}
        collapsed
        onLogoClick={onLogoClick}
      />
    )
    await user.click(screen.getByText('Mini'))
    expect(onLogoClick).toHaveBeenCalledTimes(1)
  })
})
