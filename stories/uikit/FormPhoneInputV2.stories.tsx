
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormPhoneInputV2 } from '@flex/uikit/business'

type Story = StoryObj<typeof FormPhoneInputV2>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormPhoneInputV2> = {
  title: 'Business/FormPhoneInputV2',
  component: FormPhoneInputV2,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormPhoneInputV2></FormPhoneInputV2>),
  args: {}
}
