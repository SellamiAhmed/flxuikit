import { Carousel } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Carousel>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Carousel> = {
  title: 'Primitive/Carousel',
  component: Carousel,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const slideStyle = {
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--ds-color-background-neutral)',
  borderRadius: 8,
  fontSize: 24
}

export const Primary: Story = {
  render: () => (
    <Carousel withIndicators height={200}>
      <Carousel.Slide>
        <div style={slideStyle}>1</div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div style={slideStyle}>2</div>
      </Carousel.Slide>
      <Carousel.Slide>
        <div style={slideStyle}>3</div>
      </Carousel.Slide>
    </Carousel>
  ),
  args: {}
}

export const MultipleSlidesVisible: Story = {
  render: () => (
    <Carousel slideSize="33.333333%" slideGap="md" height={160}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Carousel.Slide key={i}>
          <div style={slideStyle}>{i + 1}</div>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
