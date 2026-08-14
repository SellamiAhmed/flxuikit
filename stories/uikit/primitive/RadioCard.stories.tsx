import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { RadioCard } from '@flxui/uikit'

type Story = StoryObj<typeof RadioCard>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof RadioCard> = {
  title: 'Primitive/RadioCard',
  component: RadioCard,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => <RadioCard></RadioCard>,
  args: {}
}
