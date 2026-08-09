import { ActionIcon, Group, Stack } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { IconMenu2, IconRefresh } from '@tabler/icons-react'

import { COLOR_LIST, VARIANT_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof ActionIcon>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof ActionIcon> = {
  title: 'Primitive/ActionIcon',
  component: ActionIcon,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <ActionIcon disabled={false} loading={false} variant="filled" {...rest}>
      <IconMenu2 />
    </ActionIcon>
  ),
  parameters: {
    controls: { expanded: true }
  },
  args: {
    size: 'md',
    color: 'brand',
    disabled: false,
    variant: 'subtle'
  },
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' },
      table: { defaultValue: { summary: 'brand' } }
    },
    size: {
      options: SIZE_LIST,
      control: { type: 'select' }
    },
    radius: {
      options: SIZE_LIST,
      control: { type: 'select' },
      table: { defaultValue: { summary: 'theme.defaultRadius' } }
    },
    variant: {
      options: VARIANT_LIST,
      control: { type: 'select' },
      table: { defaultValue: { summary: 'subtle' } }
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } }
    },
    loading: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } }
    },
    loaderProps: {
      control: 'object',
      if: { arg: 'loading', truthy: true },
      description: 'Props added to Loader component (only visible when `loading` is set)',
      table: { type: { summary: 'LoaderProps' } }
    }
  }
}

export const AllVariants: Story = {
  render: () => (
    <Group>
      <Stack>
        default
        <ActionIcon>
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>

      <Stack>
        transparent
        <ActionIcon variant="transparent">
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>

      <Stack>
        subtle
        <ActionIcon variant="subtle">
          <IconRefresh size={16} />
        </ActionIcon>
        <ActionIcon variant="subtle" disabled>
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>

      <Stack>
        default
        <ActionIcon variant="default">
          <IconRefresh size={16} />
        </ActionIcon>
        <ActionIcon variant="default" disabled>
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>

      <Stack>
        outline
        <ActionIcon variant="outline">
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>

      <Stack>
        filled
        <ActionIcon variant="filled">
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>

      <Stack>
        light
        <ActionIcon variant="light">
          <IconRefresh size={16} />
        </ActionIcon>
      </Stack>
    </Group>
  )
}
