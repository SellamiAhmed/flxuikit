import { Text } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Text>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Text> = {
  title: 'Primitive/Text',
  component: Text,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  return (
    <>
      <Text fz="xs">Extra small text</Text>
      <Text fz="sm">Small text</Text>
      <Text fz="md">Default text</Text>
      <Text fz="lg">Large text</Text>
      <Text fz="xl">Extra large text</Text>
      <Text fw={500}>Semibold</Text>
      <Text fw={700}>Bold</Text>
      <Text fs="italic">Italic</Text>
      <Text td="underline">Underlined</Text>
      <Text td="line-through">Strikethrough</Text>
      <Text c="dimmed">Dimmed text</Text>
      <Text c="brand">Brand text</Text>
      <Text c="discovery">Discovery text</Text>
      <Text tt="uppercase">Uppercase</Text>
      <Text tt="capitalize">capitalized text</Text>
      <Text ta="center">Aligned to center</Text>
      <Text ta="right">Aligned to right</Text>
    </>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
