import { Pill, InputBase } from '@flxui/uikit'
import type { Meta, StoryFn } from '@storybook/react'

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Pill> = {
  title: 'Primitive/Pill',
  component: Pill,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export function Primary() {
  const pills = Array(10)
    .fill(0)
    .map((_, index) => (
      <Pill key={index} withRemoveButton>
        Item {index}
      </Pill>
    ))
  return (
    <InputBase component="div" multiline>
      <Pill.Group>{pills}</Pill.Group>
    </InputBase>
  )
}
