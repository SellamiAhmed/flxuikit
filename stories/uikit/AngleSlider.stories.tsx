
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { AngleSlider } from '@flex/uikit'

type Story = StoryObj<typeof AngleSlider>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof AngleSlider> = {
  title: 'Primitive/AngleSlider',
  component: AngleSlider,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<AngleSlider></AngleSlider>),
  args: {}
}
