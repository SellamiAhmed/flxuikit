
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { NavMenuRefContext } from '@flex/uikit/business'

type Story = StoryObj<typeof NavMenuRefContext>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof NavMenuRefContext> = {
  title: 'Business/NavMenuRefContext',
  component: NavMenuRefContext,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<NavMenuRefContext></NavMenuRefContext>),
  args: {}
}
