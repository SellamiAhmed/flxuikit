import { Group, Modal, Button } from '@flex/uikit'
import { useDisclosure } from '@flex/uikit/hooks'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Modal>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Modal> = {
  title: 'Primitive/Modal',
  component: Modal,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        Modal with header, press escape or click on overlay to close
      </Modal>
      <Group justify="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
