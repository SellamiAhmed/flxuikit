import { Group, Stack, Switch } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Switch>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Switch> = {
  title: 'Primitive/Switch',
  component: Switch,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: (props) => <Switch {...props} />,
  args: {
    disabled: false,
    onLabel: '',
    offLabel: ''
  },
  argTypes: {
    color: { options: COLOR_LIST, control: { type: 'select' } },
    size: { options: SIZE_LIST, control: { type: 'select' } },
    radius: { options: SIZE_LIST, control: { type: 'select' } },
    disabled: { control: { type: 'boolean' } },
    onLabel: { control: { type: 'text' } },
    offLabel: { control: { type: 'text' } }
  }
}

export function WithLabels() {
  return (
    <Group m={4}>
      <Switch size="lg" onLabel={<span>1</span>} offLabel="0" />
      <Switch size="md" onLabel={<span>1</span>} offLabel="0" />
      <Switch size="sm" onLabel={<span>1</span>} offLabel="0" />
      <Switch size="xs" onLabel={<span>1</span>} offLabel="0" />
    </Group>
  )
}

export function SwitchGroup() {
  return (
    <Switch.Group defaultValue={['one', 'three']} m={4} label="Switch Group">
      <Switch value="one" size="md" />
      <Switch value="two" size="md" />
      <Switch value="three" size="md" />
      <Switch value="four" size="md" />
    </Switch.Group>
  )
}

export function Asterisk() {
  return (
    <div style={{ width: 300, padding: 20 }}>
      <Switch.Group label="With required asterisk" withAsterisk>
        <Switch value="1" />
      </Switch.Group>
      <Switch.Group label="Just required" required>
        <Switch value="1" />
      </Switch.Group>
      <Switch.Group label="Required asterisk off" required withAsterisk={false}>
        <Switch value="1" />
      </Switch.Group>
      <Switch.Group label="Required false asterisk on" required={false} withAsterisk>
        <Switch value="1" />
      </Switch.Group>
    </div>
  )
}

export function LabelPosition() {
  return (
    <Stack style={{ width: 300, padding: 20 }}>
      <Switch labelPosition="left" label="Hello from left" value="1" />
      <Switch labelPosition="right" label="Hello from right" value="1" />
    </Stack>
  )
}

export function WithDescription() {
  return (
    <Stack style={{ width: 300, padding: 20 }}>
      <Switch
        description="This is a left-positioned switch with a pretty long description"
        labelPosition="left"
        label="Hello from left"
        value="1"
      />
      <Switch
        description="This is a right-positioned switch with a description"
        labelPosition="right"
        label="Hello from right"
        value="1"
      />
    </Stack>
  )
}

export function WithError() {
  return (
    <Stack style={{ width: 300, padding: 20 }}>
      <Switch label="Error without message" value="1" error />
      <Switch error="This is another error" labelPosition="right" label="This is an invalid switch" value="1" />
      <Switch error="Error on switch without label" value="1" />
    </Stack>
  )
}

export function Alignment() {
  return <Switch />
}
