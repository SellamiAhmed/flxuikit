import { ColorSwatch, Group, Stack } from '@flex/uikit'
import { tokenMap } from '@flex/uikit/theme'
import { rgba } from '@flex/uikit/utils'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof ColorSwatch>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof ColorSwatch> = {
  title: 'Primitive/ColorSwatch',
  component: ColorSwatch,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  const tokens = tokenMap.light
  const entries = Object.entries(tokens)

  const swatches = entries.map(([name, value]) => <ColorSwatch key={name} color={value as string} />)
  const swatchesWithOpacity = entries.map(([name, value]) => (
    <ColorSwatch key={name} color={rgba(value as string, 0.5)} />
  ))

  return (
    <Stack align="center">
      <Group justify="center" gap={4}>
        {swatches}
      </Group>
      <Group justify="center" gap={4}>
        {swatchesWithOpacity}
      </Group>
    </Stack>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
