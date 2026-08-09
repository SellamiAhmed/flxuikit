
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { Radio } from '@flex/uikit'

type Story = StoryObj<typeof Radio>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Radio> = {
  title: 'Primitive/Radio',
  component: Radio,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<Radio></Radio>),
  args: {}
}
