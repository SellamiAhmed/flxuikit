import { Avatar, Group } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Avatar>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Avatar> = {
  title: 'Primitive/Avatar',
  component: Avatar,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    size: {
      options: SIZE_LIST,
      control: 'inline-radio'
    }
  }
}

export default meta

const names = ['John Doe', 'Jane Mol', 'Alex Lump', 'Sarah Condor', 'Mike Johnson', 'Kate Kok', 'Tom Smith']

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />)
  return (
    <>
      <Avatar radius="xl" />
      <Avatar color="brand" radius="xl">
        MK
      </Avatar>
      <Group>{avatars}</Group>
    </>
  )
}

export const Primary: Story = {
  render: () => <Demo />
}
