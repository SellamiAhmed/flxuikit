
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormTextInput } from '@flex/uikit/business'

type Story = StoryObj<typeof FormTextInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormTextInput> = {
  title: 'Business/FormTextInput',
  component: FormTextInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormTextInput></FormTextInput>),
  args: {}
}
