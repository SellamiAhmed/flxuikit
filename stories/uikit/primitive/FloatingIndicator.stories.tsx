import { FloatingIndicator, UnstyledButton } from '@flex/uikit'
import type { Meta, StoryFn } from '@storybook/react'
import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
  IconCircle
} from '@tabler/icons-react'
import { useState } from 'react'

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FloatingIndicator> = {
  title: 'Primitive/FloatingIndicator',
  component: FloatingIndicator,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const rootStyle: React.CSSProperties = {
  position: 'relative',
  backgroundColor: 'var(--ds-color-background-neutral)',
  width: 'fit-content',
  padding: 8,
  borderRadius: 8
}

const indicatorStyle: React.CSSProperties = {
  backgroundColor: 'var(--ds-elevation-surface-raised)',
  borderRadius: 8,
  boxShadow: 'var(--ds-shadow-md)',
  border: '1px solid var(--ds-color-border)'
}

const controlsGroupStyle: React.CSSProperties = { display: 'flex' }

const controlStyle = (isActive: boolean): React.CSSProperties => ({
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: isActive ? 'var(--ds-color-text)' : 'var(--ds-color-text-subtle)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative'
})

const directions = [
  ['up-left', IconArrowUpLeft],
  ['up', IconArrowUp],
  ['up-right', IconArrowUpRight]
] as const
const middleRow = [
  ['left', IconArrowLeft],
  ['center', IconCircle],
  ['right', IconArrowRight]
] as const
const bottomRow = [
  ['down-left', IconArrowDownLeft],
  ['down', IconArrowDown],
  ['down-right', IconArrowDownRight]
] as const

export function Primary() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null)
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({})
  const [active, setActive] = useState('center')

  const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node
    setControlsRefs(controlsRefs)
  }

  const renderRow = (row: readonly (readonly [string, any])[]) => (
    <div style={controlsGroupStyle}>
      {row.map(([name, Icon]) => (
        <UnstyledButton
          key={name}
          style={controlStyle(active === name)}
          onClick={() => setActive(name)}
          ref={setControlRef(name)}
        >
          <Icon size={26} stroke={1.5} />
        </UnstyledButton>
      ))}
    </div>
  )

  return (
    <div style={rootStyle} dir="ltr" ref={setRootRef}>
      <FloatingIndicator target={controlsRefs[active]} parent={rootRef} style={indicatorStyle} />
      {renderRow(directions)}
      {renderRow(middleRow)}
      {renderRow(bottomRow)}
    </div>
  )
}
