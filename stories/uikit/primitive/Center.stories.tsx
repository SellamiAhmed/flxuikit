import { Center } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Center>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Center> = {
  title: 'Primitive/Center',
  component: Center,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <Center style={{ width: 400, height: 200 }} bg="brand">
      <div>All elements inside Center are centered</div>
    </Center>
  ),
  args: {}
}
