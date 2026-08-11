import { Button, SemiCircleProgress } from '@flex/uikit'
import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof SemiCircleProgress> = {
  title: 'Primitive/SemiCircleProgress',
  component: SemiCircleProgress,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export function Basic() {
  return (
    <SemiCircleProgress
      fillDirection="left-to-right"
      orientation="up"
      filledSegmentColor="var(--ds-color-background-brand-bold)"
      size={200}
      thickness={12}
      value={40}
      label="Label"
    />
  )
}

export function ChangeEmptySegmentColor() {
  return <SemiCircleProgress value={30} emptySegmentColor="var(--ds-color-text-subtle)" />
}

export function ChangeLabelPosition() {
  return (
    <>
      <SemiCircleProgress value={30} label="Bottom" mb="xl" />
      <SemiCircleProgress value={30} label="Center" labelPosition="center" />
    </>
  )
}

export function FilledSegmentTransition() {
  const [value, setValue] = useState(30)
  return (
    <>
      <SemiCircleProgress value={value} transitionDuration={250} label={`${value}%`} />
      <Button onClick={() => setValue(Math.floor(Math.random() * 100))} mt="xl" fullWidth>
        Set random value
      </Button>
    </>
  )
}
