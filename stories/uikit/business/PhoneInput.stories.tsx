import { PhoneInput } from '@flxui/uikit/business'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof PhoneInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof PhoneInput> = {
  title: 'Business/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  decorators: [decorator],
  parameters: {}
}

export default meta

export const Primary: Story = {
  args: {
    label: 'Phone Number',
    description: 'Phone Number Input',
    placeholder: 'Please enter your phone number',
    error: '',
    country: 'US',
    required: true,
    disabled: false,
    withAsterisk: true,
    errorProps: {},
    labelProps: {}
  },
  argTypes: {
    label: { type: 'string' },
    error: { type: 'string' },
    placeholder: { type: 'string' },
    disabled: { type: 'boolean' }
  }
}

export const WithError: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Please enter your phone number',
    error: 'Invalid phone number',
    country: 'US'
  }
}

export const CountryCodeAfterFocus: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Please enter your phone number',
    country: 'CN',
    showContryCodeAfterFocus: true
  }
}
