import { Button, Tooltip } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Tooltip>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Tooltip> = {
  title: 'Primitive/Tooltip',
  component: Tooltip,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...props }) => (
    <Tooltip {...props} label="Tooltip">
      <Button variant="outline">Button with tooltip</Button>
    </Tooltip>
  ),
  args: {
    position: 'bottom',
    offset: 5,
    withArrow: true,
    arrowPosition: 'side'
  },
  argTypes: {
    withArrow: { control: 'boolean' },
    position: {
      control: 'select',
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'bottom-end',
        'bottom-start',
        'left-end',
        'left-start',
        'right-end',
        'right-start',
        'top-end',
        'top-start'
      ]
    },
    arrowPosition: { control: 'select', options: ['center', 'side'] },
    offset: { control: 'number' }
  }
}

export const DisabledButton: Story = {
  render: ({ ...props }) => (
    <Tooltip {...props} label="Tooltip">
      <Button disabled>Disabled button</Button>
    </Tooltip>
  )
}
