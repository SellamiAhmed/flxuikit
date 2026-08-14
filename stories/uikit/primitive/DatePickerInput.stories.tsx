import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { DatePickerInput } from '@flxui/uikit'

type Story = StoryObj<typeof DatePickerInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof DatePickerInput> = {
  title: 'Primitive/DatePickerInput',
  component: DatePickerInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => <DatePickerInput></DatePickerInput>,
  args: {}
}
