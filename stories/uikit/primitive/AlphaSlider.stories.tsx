import { AlphaSlider, Text } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof AlphaSlider>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof AlphaSlider> = {
  title: 'Primitive/AlphaSlider',
  component: AlphaSlider,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Demo() {
  const [value, onChange] = useState(0.55)
  return (
    <>
      <Text>Alpha value: {value}</Text>
      <AlphaSlider color="#1c7ed6" value={value} onChange={onChange} />
    </>
  )
}

export const Primary: Story = {
  render: () => <Demo />,
  args: {}
}
