import { Kbd } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Kbd>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Kbd> = {
  title: 'Primitive/Kbd',
  component: Kbd,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <>
      <Kbd>⌘</Kbd> + <Kbd>shift</Kbd> + <Kbd>M</Kbd>
    </>
  ),
  args: {}
}
