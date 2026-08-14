import { FileInput } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof FileInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FileInput> = {
  title: 'Primitive/FileInput',
  component: FileInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => <FileInput {...props} />,
  args: {
    multiple: false,
    disabled: false,
    accept: '',
    label: 'Upload file',
    placeholder: 'Pick a file'
  },
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    accept: { control: 'text' }
  }
}
