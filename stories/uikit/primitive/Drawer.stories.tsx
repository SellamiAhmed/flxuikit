import { Drawer, Group, Button, Stack, TextInput, PasswordInput } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Drawer>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Drawer> = {
  title: 'Primitive/Drawer',
  component: Drawer,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Demo({ ...rest }) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="xl" {...rest}>
        <Stack>
          <TextInput label="Email" placeholder="you@example.com" />
          <PasswordInput label="Password" placeholder="Your password" />
          <Button onClick={() => setOpened(false)}>Register</Button>
        </Stack>
      </Drawer>

      <Group justify="center">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
    </>
  )
}

export const Primary: Story = {
  render: ({ ...rest }) => <Demo {...rest} />,
  args: {
    title: 'Register',
    closeOnClickOutside: true,
    closeOnEscape: true,
    lockScroll: false,
    withCloseButton: true,
    withinPortal: false
  },
  argTypes: {
    position: {
      options: ['left', 'right', 'bottom', 'top'],
      control: { type: 'select' }
    },
    size: { options: SIZE_LIST, control: { type: 'select' } },
    padding: {
      options: SIZE_LIST,
      control: { type: 'select' },
      table: { defaultValue: { summary: 'theme.defaultRadius' } }
    },
    zIndex: { control: { type: 'number' } }
  }
}
