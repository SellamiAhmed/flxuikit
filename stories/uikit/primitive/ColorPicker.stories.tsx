import { ColorPicker } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_FORMAT, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof ColorPicker>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof ColorPicker> = {
  title: 'Primitive/ColorPicker',
  component: ColorPicker,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => <ColorPicker {...props} />,
  args: {
    format: 'hex',
    size: 'sm'
  },
  argTypes: {
    format: { control: 'select', options: COLOR_FORMAT },
    size: { control: 'select', options: SIZE_LIST }
  }
}
