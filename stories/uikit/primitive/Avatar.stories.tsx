
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { Avatar } from '@flex/uikit'

type Story = StoryObj<typeof Avatar>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Avatar> = {
  title: 'Primitive/Avatar',
  component: Avatar,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<Avatar></Avatar>),
  args: {}
}
