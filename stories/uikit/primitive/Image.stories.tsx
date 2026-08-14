import { Image } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Image>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Image> = {
  title: 'Primitive/Image',
  component: Image,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => <Image w={400} radius="md" alt="Random unsplash image" {...rest} />,
  args: {
    src: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
    w: 400,
    h: 200
  },
  argTypes: {
    radius: {
      options: SIZE_LIST,
      control: { type: 'select' }
    }
  }
}

export const WithFallback: Story = {
  render: () => (
    <Image
      radius="md"
      src={null}
      h={200}
      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      alt="Fallback example"
    />
  )
}

export const ContainFit: Story = {
  render: () => (
    <Image
      radius="md"
      h={200}
      w="auto"
      fit="contain"
      src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
      alt="Contain fit example"
    />
  )
}
