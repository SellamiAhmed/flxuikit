import { Pagination } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Pagination>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Pagination> = {
  title: 'Primitive/Pagination',
  component: Pagination,
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

function Controlled({ ...props }) {
  const [value, setValue] = useState(2)
  return (
    <>
      Current page: {value}
      <Pagination total={20} value={value} onChange={setValue} {...props} />
    </>
  )
}

export const Primary: Story = {
  render: Controlled,
  args: {
    withControls: false,
    withEdges: false,
    disabled: false
  }
}
