import { Avatar, Box, UnstyledButton, Group, Text, Kbd } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof UnstyledButton>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof UnstyledButton> = {
  title: 'Primitive/UnstyledButton',
  component: UnstyledButton,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <Box>
      <Text mb={16} c="dimmed" fz={12}>
        UnstyledButton resets default <Kbd>button</Kbd> styles, it can be used to create custom buttons:
      </Text>
      <UnstyledButton>
        <Group>
          <Avatar size={40} color="brand">
            BH
          </Avatar>
          <div>
            <Text>Bob Handsome</Text>
            <Text size="xs" c="dimmed">
              bob@example.com
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Box>
  ),
  args: {}
}
