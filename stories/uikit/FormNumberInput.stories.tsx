
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormNumberInput } from '@flex/uikit/business'

type Story = StoryObj<typeof FormNumberInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormNumberInput> = {
  title: 'Business/FormNumberInput',
  component: FormNumberInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormNumberInput></FormNumberInput>),
  args: {}
}
