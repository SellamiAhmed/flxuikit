
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormMultiSelect } from '@flex/uikit/business'

type Story = StoryObj<typeof FormMultiSelect>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormMultiSelect> = {
  title: 'Business/FormMultiSelect',
  component: FormMultiSelect,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormMultiSelect></FormMultiSelect>),
  args: {}
}
