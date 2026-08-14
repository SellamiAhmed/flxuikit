import { ActionIcon, VisuallyHidden } from '@flxui/uikit'
import type { Meta, StoryFn } from '@storybook/react'
import { IconHeart } from '@tabler/icons-react'

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Primitive/VisuallyHidden',
  component: VisuallyHidden,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export function Primary() {
  return (
    <ActionIcon>
      <IconHeart />
      <VisuallyHidden>Like post</VisuallyHidden>
    </ActionIcon>
  )
}
