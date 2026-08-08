
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { RingProgress } from '@flex/uikit'

type Story = StoryObj<typeof RingProgress>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof RingProgress> = {
  title: 'Primitive/RingProgress',
  component: RingProgress,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<RingProgress></RingProgress>),
  args: {}
}
