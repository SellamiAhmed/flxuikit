import { Anchor, Breadcrumbs } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Breadcrumbs>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Primitive/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const items = [
  { title: 'Flex UI', href: '#' },
  { title: 'Flex UI hooks', href: '#' },
  { title: 'use-id', href: '#' }
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
))

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→" mt="xs">
        {items}
      </Breadcrumbs>
    </>
  )
}

export const Primary: Story = {
  render: () => <Demo />,
  args: {}
}
