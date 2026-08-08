
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { HookFormContext } from '@flex/uikit/business'

type Story = StoryObj<typeof HookFormContext>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof HookFormContext> = {
  title: 'Business/HookFormContext',
  component: HookFormContext,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<HookFormContext></HookFormContext>),
  args: {}
}
