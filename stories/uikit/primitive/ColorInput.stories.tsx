import { ColorInput } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_FORMAT } from '../../constants.js'

type Story = StoryObj<typeof ColorInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof ColorInput> = {
  title: 'Primitive/ColorInput',
  component: ColorInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => <ColorInput {...props} />,
  args: {
    format: 'hex',
    disallowInput: false,
    withPreview: true,
    withEyeDropper: true,
    disabled: false
  },
  argTypes: {
    format: { control: 'select', options: COLOR_FORMAT },
    disallowInput: { control: 'boolean' },
    withPreview: { control: 'boolean' },
    withEyeDropper: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
}
