import { Stack } from '@flxui/uikit'
import { DateTimePicker, TimePicker } from '@flxui/uikit/business'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

type Story = StoryObj<typeof DateTimePicker>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof DateTimePicker> = {
  title: 'Business/DateTimePicker',
  component: DateTimePicker,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState<Date>(new Date())
      return <DateTimePicker value={value} onChange={setValue} />
    }
    return <Demo />
  }
}

export const WithDateRange: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState<Date>(new Date())
      return (
        <DateTimePicker
          value={value}
          onChange={setValue}
          startDate={new Date(2020, 0, 1)}
          endDate={new Date(2030, 11, 31)}
        />
      )
    }
    return <Demo />
  }
}

export const Loading: Story = {
  render: () => <DateTimePicker loading placeholder="Loading time slots..." />
}

export const CustomFormat: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState<Date>(new Date())
      return <DateTimePicker value={value} onChange={setValue} format="MMM D, YYYY hh:mm A" />
    }
    return <Demo />
  }
}

export const AllSizes: Story = {
  render: () => (
    <Stack maw={300}>
      <DateTimePicker size="xs" placeholder="size=xs" />
      <DateTimePicker size="sm" placeholder="size=sm" />
      <DateTimePicker size="md" placeholder="size=md" />
      <DateTimePicker size="lg" placeholder="size=lg" />
      <DateTimePicker size="xl" placeholder="size=xl" />
    </Stack>
  )
}

export const TimePickerOnly: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('12:00:00')
      return <TimePicker value={value} onChange={setValue} />
    }
    return <Demo />
  }
}

export const TimePickerWithMinMax: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = useState('09:00:00')
      return <TimePicker value={value} onChange={setValue} minTime="09:00:00" maxTime="18:00:00" />
    }
    return <Demo />
  }
}
