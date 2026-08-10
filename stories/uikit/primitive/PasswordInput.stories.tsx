import { PasswordInput } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof PasswordInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof PasswordInput> = {
  title: 'Primitive/PasswordInput',
  component: PasswordInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => <PasswordInput {...props} placeholder="password" />,
  args: {
    visible: true,
    disabled: false
  }
}

export const AllSizes: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return (
      <div>
        {sizes.map((size) => (
          <PasswordInput key={size} size={size} placeholder="password" mb="md" />
        ))}
      </div>
    )
  }
}
