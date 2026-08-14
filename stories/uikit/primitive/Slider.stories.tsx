import { RangeSlider, Slider } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof Slider>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Slider> = {
  title: 'Primitive/Slider',
  component: Slider,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => <Slider defaultValue={40} />,
  args: {}
}

export function NegativeValues() {
  return (
    <div style={{ maxWidth: 400, padding: 40 }}>
      <Slider min={-20} max={-10} />
    </div>
  )
}

export function DecimalValues() {
  return (
    <div style={{ maxWidth: 400, padding: 40 }}>
      <Slider min={1} max={2} step={0.01} precision={2} />
    </div>
  )
}

export function MinRangeWithNegativeValues() {
  return (
    <div style={{ maxWidth: 400, padding: 40 }}>
      <RangeSlider min={-10} max={10} defaultValue={[-10, 0]} />
    </div>
  )
}

export function MinMaxSliderDistance() {
  return (
    <div style={{ maxWidth: 400, padding: 40 }}>
      <RangeSlider min={0} max={100} minRange={5} maxRange={20} step={0.5} defaultValue={[0, 100]} />
    </div>
  )
}

export function KeyboardPrecision() {
  const [value, setValue] = useState<[number, number]>([0.5, 1.5])
  return (
    <>
      <p>{value.join(' - ')}</p>
      <RangeSlider
        mt={100}
        labelAlwaysOn
        minRange={0.01}
        name="test"
        id="test"
        step={0.01}
        precision={2}
        min={0}
        max={2}
        value={value}
        onChange={setValue}
      />
    </>
  )
}
