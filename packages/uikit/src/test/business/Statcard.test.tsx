// eslint-disable-next-line no-restricted-imports
import { MantineProvider } from '@mantine/core'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatCard } from './../../business/StatCard/index.js'

const renderWithProviders = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('StatCard', () => {
  it('renders the title and value', () => {
    renderWithProviders(<StatCard title="Total Revenue" value="$84,320" />)
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('$84,320')).toBeInTheDocument()
  })

  it('renders a numeric value', () => {
    renderWithProviders(<StatCard title="Active Users" value={12847} />)
    expect(screen.getByText('12847')).toBeInTheDocument()
  })

  it('renders the icon when provided, hidden from assistive tech', () => {
    const { container } = renderWithProviders(
      <StatCard title="Total Revenue" value="$84,320" icon={<span data-testid="icon">$</span>} />
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })

  it('omits the icon wrapper entirely when no icon is provided', () => {
    const { container } = renderWithProviders(<StatCard title="Total Revenue" value="$84,320" />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('renders no Trend content when children are omitted', () => {
    renderWithProviders(<StatCard title="New Signups" value="1,204" />)
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
  })
})

describe('StatCard.Trend', () => {
  it('renders the value with a percent sign and the description', () => {
    renderWithProviders(
      <StatCard title="Total Revenue" value="$84,320">
        <StatCard.Trend value={12.4} direction="up" description="vs last month" />
      </StatCard>
    )
    expect(screen.getByText('12.4%')).toBeInTheDocument()
    expect(screen.getByText('vs last month')).toBeInTheDocument()
  })

  it('renders without a description when none is provided', () => {
    renderWithProviders(
      <StatCard title="Active Users" value="12,847">
        <StatCard.Trend value={3.1} direction="down" />
      </StatCard>
    )
    expect(screen.getByText('3.1%')).toBeInTheDocument()
  })

  it('applies the positive (green) class for an upward trend by default', () => {
    const { container } = renderWithProviders(
      <StatCard title="Total Revenue" value="$84,320">
        <StatCard.Trend value={12.4} direction="up" />
      </StatCard>
    )
    expect(container.querySelector('[class*="trendPositive"]')).not.toBeNull()
    expect(container.querySelector('[class*="trendNegative"]')).toBeNull()
  })

  it('applies the negative (red) class for a downward trend by default', () => {
    const { container } = renderWithProviders(
      <StatCard title="Active Users" value="12,847">
        <StatCard.Trend value={3.1} direction="down" />
      </StatCard>
    )
    expect(container.querySelector('[class*="trendNegative"]')).not.toBeNull()
    expect(container.querySelector('[class*="trendPositive"]')).toBeNull()
  })

  it('inverts the color mapping when invertColor is set: up is negative, down is positive', () => {
    const { container, rerender } = renderWithProviders(
      <StatCard title="Error Rate" value="0.4%">
        <StatCard.Trend value={0.4} direction="up" invertColor />
      </StatCard>
    )
    // direction is still "up" (arrow points up), but color flips to negative since rising errors are bad
    expect(container.querySelector('[class*="trendNegative"]')).not.toBeNull()
    expect(container.querySelector('[class*="trendPositive"]')).toBeNull()

    rerender(
      <MantineProvider>
        <StatCard title="Error Rate" value="0.1%">
          <StatCard.Trend value={0.1} direction="down" invertColor />
        </StatCard>
      </MantineProvider>
    )
    // direction is "down" with invertColor, so a falling error rate is good — positive/green
    expect(container.querySelector('[class*="trendPositive"]')).not.toBeNull()
    expect(container.querySelector('[class*="trendNegative"]')).toBeNull()
  })
})
