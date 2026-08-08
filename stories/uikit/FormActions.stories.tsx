
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormActions } from '@flex/uikit/business'

type Story = StoryObj<typeof FormActions>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormActions> = {
  title: 'Business/FormActions',
  component: FormActions,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormActions></FormActions>),
  args: {}
}
