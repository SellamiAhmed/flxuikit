import { Blockquote } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Blockquote>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Blockquote> = {
  title: 'Primitive/Blockquote',
  component: Blockquote,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ cite, color, children }) => (
    <Blockquote cite={cite} color={color}>
      {children}
    </Blockquote>
  ),
  args: {
    cite: '– Forrest Gump',
    color: 'neutral',
    children: 'Life is like an npm install – you never know what you are going to get.'
  },
  argTypes: {
    color: { control: 'text' },
    cite: { control: 'text' },
    children: { control: 'text' }
  }
}
