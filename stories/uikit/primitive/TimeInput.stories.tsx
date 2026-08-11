import { TimeInput } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof TimeInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof TimeInput> = {
  title: 'Primitive/TimeInput',
  component: TimeInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: (props) => <TimeInput label="Pick a time" {...props} />,
  args: {}
}

export const WithSeconds: Story = {
  render: () => <TimeInput label="Pick a time (with seconds)" withSeconds />
}
