import { TextInput, Stack } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof TextInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof TextInput> = {
  title: 'Primitive/TextInput',
  component: TextInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}
export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Stack maw={320}>
      <TextInput {...rest} />
    </Stack>
  ),
  parameters: {
    controls: { expanded: true }
  },
  args: {
    label: 'Email address',
    placeholder: 'you@example.com'
  },
  argTypes: {
    size: {
      options: SIZE_LIST,
      control: { type: 'select' }
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'text' },
    success: { control: 'boolean' }
  }
}

export const WithError: Story = {
  render: () => (
    <Stack maw={320}>
      <TextInput label="Email address" placeholder="you@example.com" error="This field is required" />
    </Stack>
  )
}

export const WithSuccess: Story = {
  render: () => (
    <Stack maw={320}>
      <TextInput label="Email address" defaultValue="you@example.com" success />
    </Stack>
  )
}

export const Disabled: Story = {
  render: () => (
    <Stack maw={320}>
      <TextInput label="Email address" placeholder="you@example.com" disabled />
    </Stack>
  )
}

export const AllSizes: Story = {
  render: () => (
    <Stack maw={320}>
      {SIZE_LIST.map((size) => (
        <TextInput key={size} size={size} label={`size-${size}`} placeholder="Type here" />
      ))}
    </Stack>
  )
}

export const WithAddons: Story = {
  render: () => (
    <Stack maw={320}>
      <TextInput label="Website" leftAddon="https://" placeholder="example.com" />
      <TextInput label="Amount" rightAddon="USD" placeholder="0.00" />
      <TextInput label="Domain" leftAddon="https://" rightAddon=".com" placeholder="example" />
    </Stack>
  )
}

export const Required: Story = {
  render: () => (
    <Stack maw={320}>
      <TextInput label="Full name" placeholder="Jane Doe" required />
    </Stack>
  )
}
