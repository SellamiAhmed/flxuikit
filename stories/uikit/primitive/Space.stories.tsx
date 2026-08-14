import { Space, Text } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Space>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Space> = {
  title: 'Primitive/Space',
  component: Space,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <>
      <Text>First line</Text>
      <Space h="md" {...rest} />
      <Text>Second line</Text>
    </>
  ),
  args: {},
  argTypes: {
    h: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    }
  }
}
