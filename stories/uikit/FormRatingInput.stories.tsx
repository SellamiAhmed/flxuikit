
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { FormRatingInput } from '@flex/uikit/business'

type Story = StoryObj<typeof FormRatingInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FormRatingInput> = {
  title: 'Business/FormRatingInput',
  component: FormRatingInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<FormRatingInput></FormRatingInput>),
  args: {}
}
