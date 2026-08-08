
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormSwitch } from '@flex/uikit/business'

type Story = StoryObj<typeof FormSwitch>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormSwitch> = {
  title: 'Business/FormSwitch',
  component: FormSwitch,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormSwitch></FormSwitch>),
  args: {}
}
