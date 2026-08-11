import { Transition, Button, Paper } from '@flex/uikit'
import { useClickOutside } from '@flex/uikit/hooks'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof Transition>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Transition> = {
  title: 'Primitive/Transition',
  component: Transition,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity'
}

function PrimaryDemo() {
  const [opened, setOpened] = useState(false)
  const clickOutsideRef = useClickOutside(() => setOpened(false))

  return (
    <div style={{ maxWidth: 200, position: 'relative', display: 'flex', justifyContent: 'center', margin: 'auto' }}>
      <Button onClick={() => setOpened(true)}>Open dropdown</Button>
      <Transition mounted={opened} transition={scaleY} duration={200} timingFunction="ease">
        {(styles) => (
          <Paper
            shadow="md"
            ref={clickOutsideRef}
            style={{
              ...styles,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 200,
              padding: 'var(--ds-space-400)',
              backgroundColor: 'var(--ds-elevation-surface-raised)'
            }}
          >
            Dropdown
          </Paper>
        )}
      </Transition>
    </div>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
