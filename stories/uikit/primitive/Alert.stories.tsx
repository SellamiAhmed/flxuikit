import { Alert, AlertProps } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { COLOR_LIST, SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Alert>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Alert> = {
  title: 'Primitive/Alert',
  component: Alert,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ children, ...rest }: AlertProps) {
  return (
    <Alert title="Bummer!" color="danger" {...rest}>
      {children}
    </Alert>
  )
}

export const Primary: Story = {
  render: ({ ...rest }) => <PrimaryDemo {...rest} />,
  args: {
    title: 'Bummer!',
    withCloseButton: false,
    closeButtonLabel: 'Close',
    children: 'Something terrible happened! You made a mistake and there is no going back, your data was lost forever!'
  },
  argTypes: {
    color: {
      options: COLOR_LIST,
      control: { type: 'select' }
    },
    variant: {
      options: ['filled', 'outline', 'light'],
      control: { type: 'select' }
    },
    radius: {
      options: SIZE_LIST,
      control: { type: 'select' }
    }
  }
}
