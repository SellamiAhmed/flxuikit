
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { Stack } from '@flex/uikit'

type Story = StoryObj<typeof Stack>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Stack> = {
  title: 'Primitive/Stack',
  component: Stack,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<Stack></Stack>),
  args: {}
}
