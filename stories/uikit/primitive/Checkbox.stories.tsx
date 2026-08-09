import { Checkbox, Stack } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Checkbox>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Checkbox> = {
  title: 'Primitive/Checkbox',
  component: Checkbox,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => <Checkbox label="I agree to sell my privacy" {...rest} />,
  args: {},
  argTypes: {
    color: {
      control: { type: 'select' },
      options: COLOR_LIST
    },
    description: { control: 'text' },
    error: {
      control: 'text',
      description: 'Error message',
      table: { type: { summary: 'ReactNode' } }
    },
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right']
    },
    radius: { control: 'select', options: SIZE_LIST },
    size: { control: 'select', options: SIZE_LIST }
  }
}

export const Disabled: Story = {
  render: ({ ...rest }) => (
    <Stack>
      <Checkbox label="I agree to sell my privacy" {...rest} />
      <Checkbox label="I agree to sell my privacy" {...rest} disabled />
      <Checkbox label="I agree to sell my privacy" {...rest} disabled checked />
    </Stack>
  ),
  args: {}
}
