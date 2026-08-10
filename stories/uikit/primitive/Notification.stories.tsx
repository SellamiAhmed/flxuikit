import { Notification, Stack } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Notification>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Notification> = {
  title: 'Primitive/Notification',
  component: Notification,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ ...rest }) {
  return (
    <Stack align="flex-start">
      <Notification title="Default notification">This is default notification with title and body</Notification>
      <Notification color="success" title="Success notification">
        This is success notification with icon
      </Notification>
      <Notification color="danger">Bummer! Notification without title</Notification>
      <Notification loading title="Uploading data to the server" withCloseButton={false}>
        Please wait until data is uploaded, you cannot close this notification yet
      </Notification>
      <Notification {...rest} />
    </Stack>
  )
}

export const Primary: Story = {
  render: ({ ...rest }) => <PrimaryDemo {...rest} />,
  args: {
    loading: false,
    title: 'Success!',
    children: 'Data was successfully uploaded to the server',
    withCloseButton: false
  },
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    },
    radius: {
      options: SIZE_LIST,
      control: { type: 'select' }
    }
  }
}
