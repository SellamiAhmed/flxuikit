import { NumberInput } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof NumberInput>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof NumberInput> = {
  title: 'Primitive/NumberInput',
  component: NumberInput,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => <NumberInput {...props} />,
  args: {
    min: 0,
    max: 120,
    stepHoldDelay: 500,
    stepHoldInterval: 100,
    step: 0.05,
    decimalSeparator: ',',
    disabled: false,
    leftAddon: 'min',
    rightAddon: 'max',
    prefix: '',
    suffix: '',
    placeholder: 'placeholder'
  }
}

export const WithPrefixSuffix: Story = {
  render: () => (
    <>
      <NumberInput label="With prefix" placeholder="Dollars" prefix="$" defaultValue={100} mb="md" />
      <NumberInput label="With suffix" placeholder="Percents" suffix="%" defaultValue={100} mt="md" />
    </>
  )
}

export const Disabled: Story = {
  render: () => <NumberInput label="Amount" placeholder="Disabled input" disabled />
}
