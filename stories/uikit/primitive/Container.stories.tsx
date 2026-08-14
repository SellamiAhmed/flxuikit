import { Container } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Container>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Container> = {
  title: 'Primitive/Container',
  component: Container,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const blockStyle = {
  background: 'var(--ds-color-background-neutral)',
  padding: 16,
  borderRadius: 8
}

export const Primary: Story = {
  render: (args) => (
    <Container {...args}>
      <div style={blockStyle}>This content is centered and constrained by Container.</div>
    </Container>
  ),
  args: {
    size: 'md'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    fluid: { control: 'boolean' }
  }
}

export const Fluid: Story = {
  render: () => (
    <Container fluid>
      <div style={blockStyle}>Fluid container takes full available width, no max-width constraint.</div>
    </Container>
  )
}
