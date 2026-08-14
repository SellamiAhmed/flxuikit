import { Button, Center, Group, Overlay } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof Overlay>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Overlay> = {
  title: 'Primitive/Overlay',
  component: Overlay,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Demo() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Center style={{ height: 100, position: 'relative' }}>
        {visible && <Overlay opacity={0.6} color="#000" zIndex={5} />}
        <Button color={visible ? 'danger' : 'success'}>
          {!visible ? 'Click as much as you like' : "Won't click, haha"}
        </Button>
      </Center>
      <Group justify="center">
        <Button onClick={() => setVisible((v) => !v)}>Toggle overlay</Button>
      </Group>
    </>
  )
}

export const Primary: Story = {
  render: () => <Demo />,
  args: {}
}
