import { Loader } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Loader>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Loader> = {
  title: 'Primitive/Loader',
  component: Loader,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ ...rest }) {
  return <Loader {...rest} />
}

export const Primary: Story = {
  render: ({ ...rest }) => <PrimaryDemo {...rest} />,
  args: {},
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    },
    size: {
      options: SIZE_LIST,
      control: { type: 'select' }
    },
    type: {
      options: ['oval', 'dots', 'bars'],
      control: { type: 'select' }
    }
  }
}
