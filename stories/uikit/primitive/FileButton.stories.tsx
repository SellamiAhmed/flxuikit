import { Button, FileButton, Group } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof FileButton>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FileButton> = {
  title: 'Primitive/FileButton',
  component: FileButton,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Group justify="center">
      <FileButton accept="image/png,image/jpeg" {...rest}>
        {(props) => <Button {...props}>Upload image</Button>}
      </FileButton>
    </Group>
  ),
  parameters: {
    controls: { expanded: true }
  },
  args: {},
  argTypes: {
    accept: {
      control: 'text',
      description: 'File input accept attribute, e.g. "image/png,image/jpeg"',
      table: { type: { summary: 'string' } }
    },
    capture: {
      options: ['user', 'environment'],
      control: { type: 'select' },
      table: { type: { summary: 'boolean | "user" | "environment"' } }
    },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    name: { control: 'text' }
  }
}
