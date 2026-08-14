import { RingProgress } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof RingProgress>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof RingProgress> = {
  title: 'Primitive/RingProgress',
  component: RingProgress,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <RingProgress
      sections={[
        { value: 40, color: 'brand', tooltip: 'Hello' },
        { value: 20, color: 'discovery', tooltip: 'There' },
        { value: 15, color: 'success', tooltip: 'You' }
      ]}
    />
  ),
  args: {}
}

export function WithTooltips() {
  return (
    <div style={{ padding: 40 }}>
      <RingProgress
        sections={[
          { value: 40, color: 'brand', tooltip: 'Hello' },
          { value: 20, color: 'discovery', tooltip: 'There' },
          { value: 15, color: 'success', tooltip: 'You' }
        ]}
      />
    </div>
  )
}

export function WithSectionProps() {
  return (
    <div style={{ padding: 40 }}>
      <RingProgress
        sections={[
          { value: 40, color: 'brand', onClick: () => console.log('1') },
          { value: 20, color: 'discovery', onClick: () => console.log('2') },
          { value: 15, color: 'success', onClick: () => console.log('3') }
        ]}
      />
    </div>
  )
}

export function WithRootColor() {
  return (
    <div style={{ padding: 40 }}>
      <RingProgress
        sections={[
          { value: 40, color: 'brand' },
          { value: 20, color: 'discovery' },
          { value: 15, color: 'success' }
        ]}
        rootColor="danger"
      />
    </div>
  )
}
