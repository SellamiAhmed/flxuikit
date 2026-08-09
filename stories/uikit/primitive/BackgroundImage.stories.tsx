import { BackgroundImage, Box, Center, Text } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof BackgroundImage>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof BackgroundImage> = {
  title: 'Primitive/BackgroundImage',
  component: BackgroundImage,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Wrapper() {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius="md"
      >
        <Center p="md">
          <Text c="text-inverse">
            BackgroundImage component can be used to add any content on an image. It is useful for hero headers and
            other similar sections.
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  )
}

export const Primary: Story = {
  render: Wrapper
}
