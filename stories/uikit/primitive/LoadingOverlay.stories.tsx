import { Button, LoadingOverlay } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof LoadingOverlay>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Primitive/LoadingOverlay',
  component: LoadingOverlay,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ ...props }) {
  const [visible, setVisible] = useState(false)

  // Note that position: relative is required
  return (
    <>
      <div style={{ width: 400, position: 'relative' }}>
        <LoadingOverlay visible={visible} {...props} />
        <div>this is content</div>
        <div>this is content</div>
        <div>this is content</div>
        <div>this is content</div>
        <div>this is content</div>
        <div>this is content</div>
        <div>this is content</div>
        <div>this is content</div>
      </div>

      <Button onClick={() => setVisible((v) => !v)}>Toggle overlay</Button>
    </>
  )
}

export const Primary: Story = {
  render: PrimaryDemo,
  args: {}
}
