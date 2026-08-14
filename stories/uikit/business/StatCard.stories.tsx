import { SimpleGrid } from '@flxui/uikit'
import { StatCard } from '@flxui/uikit/business'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { IconUsers, IconCurrencyDollar, IconTrendingUp } from '@tabler/icons-react'

type Story = StoryObj<typeof StatCard>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof StatCard> = {
  title: 'Business/StatCard',
  component: StatCard,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231',
    w: 280
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    w: { control: 'number' },
    h: { control: 'number' }
  },
  parameters: {
    controls: { expanded: true }
  }
}

export const WithIcon: Story = {
  render: () => <StatCard title="Active Users" value="1,204" icon={<IconUsers size={20} />} w={280} />
}

export const WithTrendUp: Story = {
  render: () => (
    <StatCard title="Monthly Sales" value="$12,430" icon={<IconCurrencyDollar size={20} />} w={280}>
      <StatCard.Trend value={12.5} direction="up" description="vs last month" />
    </StatCard>
  )
}

export const WithTrendDown: Story = {
  render: () => (
    <StatCard title="Churn Rate" value="2.4%" icon={<IconTrendingUp size={20} />} w={280}>
      <StatCard.Trend value={0.8} direction="down" description="vs last month" />
    </StatCard>
  )
}

export const InvertedTrendColor: Story = {
  render: () => (
    <StatCard title="Support Tickets" value="18" w={280}>
      {/* invertColor: for metrics where "down" is good, e.g. fewer tickets = positive */}
      <StatCard.Trend value={15} direction="down" description="vs last week" invertColor />
    </StatCard>
  )
}

export const CustomSize: Story = {
  render: () => (
    <StatCard title="Large Card" value="$99,000" icon={<IconCurrencyDollar size={28} />} w={400} h={220}>
      <StatCard.Trend value={22} direction="up" description="vs last quarter" />
    </StatCard>
  )
}

export const Grid: Story = {
  render: () => (
    <SimpleGrid cols={3} spacing="md">
      <StatCard title="Revenue" value="$45,231" icon={<IconCurrencyDollar size={20} />}>
        <StatCard.Trend value={12.5} direction="up" description="vs last month" />
      </StatCard>
      <StatCard title="Active Users" value="1,204" icon={<IconUsers size={20} />}>
        <StatCard.Trend value={4.2} direction="up" description="vs last month" />
      </StatCard>
      <StatCard title="Churn Rate" value="2.4%" icon={<IconTrendingUp size={20} />}>
        <StatCard.Trend value={0.8} direction="down" description="vs last month" invertColor />
      </StatCard>
    </SimpleGrid>
  )
}
