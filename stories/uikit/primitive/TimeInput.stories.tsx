
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { TimeInput } from '@flex/uikit'

type Story = StoryObj<typeof TimeInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof TimeInput> = {
  title: 'Primitive/TimeInput',
  component: TimeInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<TimeInput></TimeInput>),
  args: {}
}
