import { Burger } from '@flex/uikit'
import { useDisclosure } from '@flex/uikit/hooks'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Burger>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Burger> = {
  title: 'Primitive/Burger',
  component: Burger,
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

function DemoBase(props: Omit<React.ComponentPropsWithoutRef<typeof Burger>, 'opened' | 'onChange'>) {
  const [opened, { toggle }] = useDisclosure(false)
  return <Burger opened={opened} onClick={toggle} {...props} />
}

export const Primary: Story = {
  render: DemoBase,
  args: {
    size: 'md'
  }
}
