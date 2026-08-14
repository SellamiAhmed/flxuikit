import { Button, Collapse } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof Collapse>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Collapse> = {
  title: 'Primitive/Collapse',
  component: Collapse,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onClick={() => setOpened((o) => !o)}>Toggle content</Button>
      <Collapse in={opened}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum omnis aliquam voluptatum delectus quas, et vero
        nobis voluptatibus fugit exercitationem laboriosam dolor voluptatem! Est ea ipsum consequatur quod amet nihil!
      </Collapse>
    </>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
