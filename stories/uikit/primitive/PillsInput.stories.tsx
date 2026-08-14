import { PillsInput, Pill } from '@flxui/uikit'
import type { Meta, StoryFn } from '@storybook/react'

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof PillsInput> = {
  title: 'Primitive/PillsInput',
  component: PillsInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export function Primary() {
  return (
    <PillsInput label="PillsInput">
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="Enter tags" />
      </Pill.Group>
    </PillsInput>
  )
}
