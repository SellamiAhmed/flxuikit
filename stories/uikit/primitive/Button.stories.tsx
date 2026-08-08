import { Button, Group, Stack, Switch } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { COLOR_LIST, VARIANT_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Button>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Button> = {
  title: 'Primitive/Button',
  component: Button,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <Stack align="flex-start" p={16}>
      <Button {...rest}>Settings</Button>
    </Stack>
  ),
  parameters: {
    controls: { expanded: true }
  },
  args: {},
  argTypes: {
    variant: {
      options: VARIANT_LIST,
      control: { type: 'select' }
    },
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    },
    size: {
      options: SIZE_LIST,
      control: { type: 'select' }
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' }
  }
}

export const GroupedButtons: StoryObj<typeof Button.Group> = {
  render: ({ ...rest }) => (
    <Stack align="flex-start">
      <Button.Group {...rest}>
        <Button variant="default">First</Button>
        <Button variant="default">Second</Button>
        <Button variant="default">Third</Button>
      </Button.Group>
    </Stack>
  ),
  args: {},
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <Group p={32}>
      {VARIANT_LIST.map((variant) => (
        <Button key={variant} variant={variant as any}>
          {variant}
        </Button>
      ))}
    </Group>
  )
}

export const AllSizes: Story = {
  render: () => (
    <Group>
      {SIZE_LIST.map((size) => (
        <Button key={size} size={size as any}>
          size-{size}
        </Button>
      ))}
    </Group>
  )
}

export const AllColors: Story = {
  render: () => {
    const [disabled, setDisabled] = useState(false)
    return (
      <Group>
        <Button disabled={disabled} variant="light">
          Light
        </Button>
        <Button disabled={disabled} variant="outline">
          Outline
        </Button>
        <Button disabled={disabled} variant="filled">
          Filled
        </Button>
        <Button disabled={disabled} variant="subtle">
          Subtle
        </Button>
        {COLOR_LIST.map((color) => (
          <Button key={color} color={color} disabled={disabled}>
            {color}
          </Button>
        ))}
        <Switch checked={disabled} onChange={() => setDisabled(!disabled)} label="toggle disabled" />
      </Group>
    )
  }
}

export const LoadingButton: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)
    return (
      <Stack align="flex-start" p={32}>
        <Button loading={loading}>Submit</Button>
        <Button loading={loading} variant="default">
          Edit Settings
        </Button>
        <Button loading={loading} color="red" variant="light">
          I understand the consequences, delete
        </Button>
        <Switch checked={loading} onChange={() => setLoading(!loading)} label="toggle loading" />
      </Stack>
    )
  }
}

export const DisabledButton: Story = {
  render: () => (
    <Button disabled variant="light">
      Disabled
    </Button>
  )
}

export const DataDisabled: Story = {
  render: () => (
    <Button data-disabled variant="default">
      With data-disabled
    </Button>
  )
}
