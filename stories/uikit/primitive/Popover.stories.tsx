import { Button, Text, Popover } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Popover>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Popover> = {
  title: 'Primitive/Popover',
  component: Popover,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ ...props }) {
  return (
    <Popover width={200} shadow="md" {...props}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">This is an uncontrolled popover, it opens when the button is clicked</Text>
      </Popover.Dropdown>
    </Popover>
  )
}

export const Primary: Story = {
  render: PrimaryDemo,
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
    arrowPosition: {
      control: 'select',
      options: ['center', 'side']
    },
    offset: { control: 'number' }
  }
}
