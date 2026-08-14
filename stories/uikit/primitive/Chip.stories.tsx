import { Chip } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Chip>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Chip> = {
  title: 'Primitive/Chip',
  component: Chip,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Chip defaultChecked {...rest}>
      {rest.children || 'Flex UI'}
    </Chip>
  ),
  args: {},
  argTypes: {
    checked: { control: 'boolean' },
    children: { control: 'text' },
    color: { control: 'select', options: COLOR_LIST },
    defaultChecked: { control: 'boolean' },
    radius: { control: 'select', options: SIZE_LIST },
    type: { control: 'select', options: ['checkbox', 'radio'] },
    variant: { control: 'select', options: ['outline', 'light', 'filled'] }
  }
}
