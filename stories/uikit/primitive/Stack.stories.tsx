import { Stack, Button } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Stack>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Stack> = {
  title: 'Primitive/Stack',
  component: Stack,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Stack h={300} {...rest}>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
    </Stack>
  ),
  args: {},
  argTypes: {
    align: {
      options: ['stretch', 'flex-start', 'flex-end', 'center'],
      control: { type: 'select' }
    },
    gap: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    },
    justify: {
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      control: { type: 'select' }
    }
  }
}
