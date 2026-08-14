import { Highlight, HighlightProps } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Highlight>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Highlight> = {
  title: 'Primitive/Highlight',
  component: Highlight,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ color, highlight, children }: Partial<HighlightProps>) => (
    <Highlight color={color} highlight={highlight}>
      {children ?? ''}
    </Highlight>
  ),
  args: {
    highlight: 'this',
    children: 'Highlight This, definitely THIS and also this!'
  },
  argTypes: {
    color: { control: 'text' },
    highlight: { control: 'text' },
    children: { control: 'text' }
  }
}

export const MultipleHighlightColors: Story = {
  render: () => (
    <>
      <Highlight highlight={['this']} color="danger">
        Highlight This word in danger color.
      </Highlight>
      <Highlight highlight={['that']} color="success" mt="xs">
        Highlight That word in success color.
      </Highlight>
    </>
  )
}
