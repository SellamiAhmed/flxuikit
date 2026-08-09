import { Box } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Box>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Box> = {
  title: 'Primitive/Box',
  component: Box,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => <Box bg="brand">This is a box</Box>,
  args: {}
}

export function SystemProps() {
  return (
    <div style={{ padding: 40 }}>
      <Box
        bg={{
          base: 'danger',
          xs: 'brand',
          sm: '#e5e5e5'
        }}
        pl={{ base: 30, md: 100, xs: 300 }}
        pt="xl"
        w={400}
        h={560}
        display="flex"
      >
        Some box
      </Box>
    </div>
  )
}

export function FontWeight() {
  return <Box fw={900}>900 fw</Box>
}
