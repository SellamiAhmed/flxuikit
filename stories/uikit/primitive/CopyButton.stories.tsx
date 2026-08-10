import { CopyButton, Button } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof CopyButton>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof CopyButton> = {
  title: 'Primitive/CopyButton',
  component: CopyButton,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <CopyButton value="https://flex-uikit.dev">
      {({ copied, copy }) => (
        <Button color={copied ? 'success' : 'brand'} onClick={copy}>
          {copied ? 'Copied' : 'Copy URL'}
        </Button>
      )}
    </CopyButton>
  ),
  args: {
    timeout: 2000
  }
}
