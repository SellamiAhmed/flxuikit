
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { TagsInput } from '@flex/uikit'

type Story = StoryObj<typeof TagsInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof TagsInput> = {
  title: 'Primitive/TagsInput',
  component: TagsInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<TagsInput></TagsInput>),
  args: {}
}
