
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormCheckbox } from '@flex/uikit/business'

type Story = StoryObj<typeof FormCheckbox>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormCheckbox> = {
  title: 'Business/FormCheckbox',
  component: FormCheckbox,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormCheckbox></FormCheckbox>),
  args: {}
}
