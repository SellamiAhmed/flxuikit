
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormErrorMessage } from '@flex/uikit/business'

type Story = StoryObj<typeof FormErrorMessage>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormErrorMessage> = {
  title: 'Business/FormErrorMessage',
  component: FormErrorMessage,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormErrorMessage></FormErrorMessage>),
  args: {}
}
