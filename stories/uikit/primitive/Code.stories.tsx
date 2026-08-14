import { Code, Group } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Code>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Code> = {
  title: 'Primitive/Code',
  component: Code,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  return (
    <Group>
      <Code color="danger">React.createElement()</Code>
      <Code color="success">React.createElement()</Code>
      <Code color="brand">React.createElement()</Code>
    </Group>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
