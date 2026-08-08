
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormPhoneInput } from '@flex/uikit/business'

type Story = StoryObj<typeof FormPhoneInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormPhoneInput> = {
  title: 'Business/FormPhoneInput',
  component: FormPhoneInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormPhoneInput></FormPhoneInput>),
  args: {}
}
