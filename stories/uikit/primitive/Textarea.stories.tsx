import { Textarea } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Textarea>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Textarea> = {
  title: 'Primitive/Textarea',
  component: Textarea,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Asterisk() {
  return (
    <div style={{ width: 300, padding: 20 }}>
      <Textarea label="With required asterisk" withAsterisk />
      <Textarea label="Just required" required />
      <Textarea label="Required asterisk off" required withAsterisk={false} />
      <Textarea label="Required false asterisk on" required={false} withAsterisk />
    </div>
  )
}

export const Primary: Story = {
  render: () => <Asterisk />,
  args: {}
}

export const AllSizes: Story = {
  render: () => (
    <div>
      {SIZE_LIST.map((size: (typeof SIZE_LIST)[number]) => (
        <Textarea key={size} size={size} placeholder="this is a placeholder" mb="md" />
      ))}
    </div>
  )
}
