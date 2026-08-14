import { Avatar, Group, Indicator } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Indicator>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Indicator> = {
  title: 'Primitive/Indicator',
  component: Indicator,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Group justify="center">
      <Indicator {...rest}>
        <Avatar size="lg" />
      </Indicator>
    </Group>
  ),
  args: {
    size: 12,
    inline: false,
    label: '',
    processing: false
  },
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    },
    radius: {
      options: SIZE_LIST,
      control: { type: 'select' }
    }
  }
}
