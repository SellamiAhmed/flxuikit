
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { BackgroundImage } from '@flex/uikit'

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
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<BackgroundImage></BackgroundImage>),
  args: {}
}
