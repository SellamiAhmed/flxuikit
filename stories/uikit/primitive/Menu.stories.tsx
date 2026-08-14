import { Menu, Button, Text, Group } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Menu>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Menu> = {
  title: 'Primitive/Menu',
  component: Menu,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ ...props }) {
  return (
    <Group justify="center" h={500}>
      <Menu shadow="md" width={200} {...props}>
        <Menu.Target>
          <Button>Toggle menu</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Item>Messages</Menu.Item>
          <Menu.Item>Gallery</Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item>Transfer my data</Menu.Item>
          <Menu.Item disabled>Disabled</Menu.Item>
          <Menu.Item color="danger">Color danger</Menu.Item>
          <Menu.Item c="danger">Delete my account</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export const Primary: Story = {
  render: PrimaryDemo,
  args: {
    position: 'bottom',
    offset: 5,
    withArrow: false,
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
