import { Card } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Card>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Card> = {
  title: 'Primitive/Card',
  component: Card,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Usage() {
  return (
    <div style={{ maxWidth: 400, padding: 40, margin: 'auto' }}>
      <Card p="lg">
        <Card.Section inheritPadding>Card section 1</Card.Section>
        <Card.Section inheritPadding withBorder>
          Card section 2
        </Card.Section>
        <Card.Section inheritPadding withBorder>
          Card section 3
        </Card.Section>
        <Card.Section inheritPadding withBorder>
          Card section 4
        </Card.Section>
      </Card>
    </div>
  )
}

export const Primary: Story = {
  render: Usage
}
