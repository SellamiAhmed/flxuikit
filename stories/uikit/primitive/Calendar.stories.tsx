import { Calendar } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof Calendar>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Calendar> = {
  title: 'Primitive/Calendar',
  component: Calendar,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function Demo() {
  // `date`/`onDateChange` control which month/year is displayed (navigation),
  // not date selection — Calendar has no built-in selection logic on its own.
  const [date, setDate] = useState<Date>(new Date())
  return <Calendar date={date} onDateChange={setDate} minDate={new Date()} />
}

export const Primary: Story = {
  render: () => <Demo />,
  args: {}
}
