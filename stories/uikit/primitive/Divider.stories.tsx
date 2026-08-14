import { Divider } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Divider>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Divider> = {
  title: 'Primitive/Divider',
  component: Divider,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Demo() {
  return (
    <>
      <Divider my="sm" />
      <Divider my="sm" variant="dashed" />
      <Divider my="sm" variant="dotted" />
    </>
  )
}

export const Primary: Story = {
  render: () => <Demo />,
  args: {}
}
