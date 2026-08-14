import { HueSlider, Text } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof HueSlider>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof HueSlider> = {
  title: 'Primitive/HueSlider',
  component: HueSlider,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Demo() {
  const [value, onChange] = useState(250)
  return (
    <>
      <Text>Hue value: {value}</Text>
      <HueSlider value={value} onChange={onChange} />
    </>
  )
}

export const Primary: Story = {
  render: () => <Demo />,
  args: {}
}
