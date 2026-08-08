
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { PageShellBaseBody } from '@flex/uikit/business'

type Story = StoryObj<typeof PageShellBaseBody>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof PageShellBaseBody> = {
  title: 'Business/PageShellBaseBody',
  component: PageShellBaseBody,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<PageShellBaseBody></PageShellBaseBody>),
  args: {}
}
