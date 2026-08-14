import { Text, Mark } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST } from '../../constants.js'

type Story = StoryObj<typeof Mark>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Mark> = {
  title: 'Primitive/Mark',
  component: Mark,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ ...rest }) {
  return (
    <Text>
      Thanks for stopping by and checking out <Mark {...rest}>Flex UI</Mark>, you are awesome!
    </Text>
  )
}

export const Primary: Story = {
  render: ({ ...rest }) => <PrimaryDemo {...rest} />,
  args: {},
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    }
  }
}
