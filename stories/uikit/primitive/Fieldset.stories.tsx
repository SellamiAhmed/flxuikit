import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { Fieldset } from '@flxui/uikit'

type Story = StoryObj<typeof Fieldset>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Fieldset> = {
  title: 'Primitive/Fieldset',
  component: Fieldset,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => <Fieldset></Fieldset>,
  args: {}
}
