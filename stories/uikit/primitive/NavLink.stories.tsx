import { Badge, Box, NavLink, Stack } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof NavLink>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof NavLink> = {
  title: 'Primitive/NavLink',
  component: NavLink,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <Box w={240}>
      <NavLink label="Disabled" disabled />
      <NavLink
        label="With description"
        description="Additional information"
        leftSection={
          <Badge size="xs" variant="filled" color="danger" style={{ width: 16, height: 16, padding: 0 }}>
            3
          </Badge>
        }
      />
      <NavLink label="Active subtle" variant="subtle" active />
      <NavLink label="Active light" active />
      <NavLink label="Active filled" variant="filled" active />
    </Box>
  ),
  args: {}
}

export const List: Story = {
  render: () => (
    <Box bg="var(--ds-color-background-neutral)" p={32}>
      <Stack w={240} gap={4}>
        <NavLink label="Page 1" active />
        <NavLink label="Page 2" />
        <NavLink label="Page 3" />
      </Stack>
    </Box>
  )
}
