import { InputBase } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof InputBase>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof InputBase> = {
  title: 'Primitive/InputBase',
  component: InputBase,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => <InputBase {...props} />,
  args: {
    label: 'Label',
    placeholder: 'Type something'
  }
}
