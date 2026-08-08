
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { Combobox } from '@flex/uikit'

type Story = StoryObj<typeof Combobox>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Combobox> = {
  title: 'Primitive/Combobox',
  component: Combobox,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<Combobox></Combobox>),
  args: {}
}
