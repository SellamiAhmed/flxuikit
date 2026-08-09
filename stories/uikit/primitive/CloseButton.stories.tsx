import { CloseButton, Stack } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, VARIANT_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof CloseButton>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof CloseButton> = {
  title: 'Primitive/CloseButton',
  component: CloseButton,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Stack
      align="flex-start"
      style={{
        backgroundColor: (rest as any).variant === 'white' ? '#ddd' : 'transparent',
        padding: 16
      }}
    >
      <CloseButton {...rest} />
    </Stack>
  ),
  parameters: {
    controls: { expanded: true }
  },
  args: {},
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    },
    variant: {
      options: VARIANT_LIST,
      control: { type: 'select' }
    },
    radius: {
      options: SIZE_LIST,
      control: { type: 'select' }
    },
    size: {
      options: SIZE_LIST,
      control: { type: 'select' }
    },
    disabled: { control: 'boolean' }
  }
}
