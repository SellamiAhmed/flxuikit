import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { Tree } from '@flxui/uikit'

type Story = StoryObj<typeof Tree>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Tree> = {
  title: 'Primitive/Tree',
  component: Tree,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => <Tree></Tree>,
  args: {}
}
