// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ExpandNavbarButtonPlaceholder } from './../../../business/AppShell/navbar/ExpandNavbarButtonPlaceholder.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

const getPlaceholder = (container: HTMLElement) => container.querySelector('[class*="placeholder"]') as HTMLElement

describe('ExpandNavbarButtonPlaceholder', () => {
  it('is decorative (aria-hidden) and sets --app-shell-rail-width only when railWidth is provided', () => {
    const { container, rerender } = renderWithProviders(<ExpandNavbarButtonPlaceholder />)
    let el = getPlaceholder(container)
    expect(el).toHaveAttribute('aria-hidden', 'true')
    expect(el.style.getPropertyValue('--app-shell-rail-width')).toBe('')

    rerender(
      <MantineProvider>
        <ExpandNavbarButtonPlaceholder railWidth={72} />
      </MantineProvider>
    )
    el = getPlaceholder(container)
    expect(el.style.getPropertyValue('--app-shell-rail-width')).toBe('72px')

    rerender(
      <MantineProvider>
        <ExpandNavbarButtonPlaceholder railWidth="4rem" />
      </MantineProvider>
    )
    el = getPlaceholder(container)
    expect(el.style.getPropertyValue('--app-shell-rail-width')).toBe('4rem')
  })
})
