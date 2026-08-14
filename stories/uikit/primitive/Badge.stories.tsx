import { Badge, BadgeProps, Group } from '@flxui/uikit'
import { Colors } from '@flxui/uikit/theme'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Badge>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Badge> = {
  title: 'Primitive/Badge',
  component: Badge,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    size: {
      options: SIZE_LIST,
      control: 'inline-radio'
    },
    radius: {
      options: SIZE_LIST,
      control: 'inline-radio'
    }
  }
}

export default meta

function Variants({ size, radius }: BadgeProps) {
  return (
    <Group p={40}>
      <Badge variant="light" size={size} radius={radius}>
        Light
      </Badge>
      <Badge variant="filled" size={size} radius={radius}>
        Filled
      </Badge>
      <Badge variant="outline" size={size} radius={radius}>
        Outline
      </Badge>
      <Badge variant="dot" size={size} radius={radius}>
        Dot
      </Badge>
    </Group>
  )
}

export const Primary: Story = {
  render: Variants
}

const AllColors = ({ variant }: { variant: BadgeProps['variant'] }) => {
  return (
    <Group>
      {Colors.map((color) => (
        <Badge key={color} variant={variant} color={color}>
          {color}
        </Badge>
      ))}
    </Group>
  )
}

export const AllOutlineColors: Story = {
  render: () => <AllColors variant="outline" />
}

export const AllDotColors: Story = {
  render: () => <AllColors variant="dot" />
}

export const AllFilledColors: Story = {
  render: () => <AllColors variant="filled" />
}

export const AllLightColors: Story = {
  render: () => <AllColors variant="light" />
}

export const AllSizes: Story = {
  render: () => (
    <Group>
      {SIZE_LIST.map((size) => (
        <Badge key={size} variant="dot" color="success" size={size}>
          Available
        </Badge>
      ))}
    </Group>
  )
}
