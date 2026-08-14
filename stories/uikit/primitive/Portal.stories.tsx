import { Anchor, Box, Portal, Text } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Portal>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Portal> = {
  title: 'Primitive/Portal',
  component: Portal,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  return (
    <Box p="md">
      <Text>
        Portal is a wrapper component for the ReactDOM.createPortal API. It renders any component or element at the end
        of document.body, or at a given target element. Modal and Drawer are wrapped in Portal by default.
      </Text>
      <Anchor href="https://mantine.dev/core/portal/" target="_blank">
        Usage
      </Anchor>
    </Box>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
