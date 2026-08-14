import { Progress, Stack, Tooltip } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Progress>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Progress> = {
  title: 'Primitive/Progress',
  component: Progress,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: () => (
    <Stack>
      <div>with value</div>
      <Progress value={50} />

      <div>multiple sections</div>
      <Progress.Root size={40}>
        <Tooltip label="Documents – 33Gb">
          <Progress.Section value={33} color="brand">
            <Progress.Label>Documents</Progress.Label>
          </Progress.Section>
        </Tooltip>

        <Tooltip label="Photos – 28Gb">
          <Progress.Section value={28} color="discovery">
            <Progress.Label>Photos</Progress.Label>
          </Progress.Section>
        </Tooltip>

        <Tooltip label="Other – 15Gb">
          <Progress.Section value={15} color="warning">
            <Progress.Label>Other</Progress.Label>
          </Progress.Section>
        </Tooltip>
      </Progress.Root>
    </Stack>
  ),
  args: {}
}
