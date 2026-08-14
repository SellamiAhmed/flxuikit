import { Anchor } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Anchor>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Anchor> = {
  title: 'Primitive/Anchor',
  component: Anchor,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <Anchor href="https://google.com/" target="_blank">
      this links to google
    </Anchor>
  ),
  args: {}
}

export function CustomComponent() {
  return (
    <div style={{ padding: 40 }}>
      <Anchor component="button" type="button" color="danger">
        Anchor as button
      </Anchor>

      <br />

      <Anchor component="span">Anchor as span</Anchor>
    </div>
  )
}

export function WithTextProps() {
  return (
    <div style={{ padding: 40 }}>
      <Anchor size="lg" fw={700} color="danger">
        Text props
      </Anchor>
    </div>
  )
}

export function InheritFontSize() {
  return (
    <div style={{ padding: 40, fontSize: 50 }}>
      <Anchor href="https://mantine.dev/">Should be 50px</Anchor>
    </div>
  )
}

export function WithUnderlineProp() {
  return (
    <div style={{ padding: 40 }}>
      <Anchor href="/" underline="always">
        Underline should be always enabled
      </Anchor>
      <br />
      <Anchor href="/" underline="hover">
        Underline should be enabled on hover
      </Anchor>
      <br />
      <Anchor href="/" underline="never">
        Underline should be DISABLED
      </Anchor>
    </div>
  )
}
