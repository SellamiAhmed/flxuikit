
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { NumberFormatter } from '@flex/uikit'

type Story = StoryObj<typeof NumberFormatter>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof NumberFormatter> = {
  title: 'Primitive/NumberFormatter',
  component: NumberFormatter,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<NumberFormatter></NumberFormatter>),
  args: {}
}
