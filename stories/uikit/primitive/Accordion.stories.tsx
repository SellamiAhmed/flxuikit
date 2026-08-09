import { Accordion, AccordionProps } from '@flex/uikit'
import type { Meta, StoryFn, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Accordion>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Accordion> = {
  title: 'Primitive/Accordion',
  component: Accordion,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo({ variant }: { variant?: AccordionProps['variant'] }) {
  return (
    <Accordion multiple variant={variant} defaultValue={['customization']}>
      <Accordion.Item value="customization">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="flexibility">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of settings or overwrite any part of component
          styles
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="focus-ring">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

export const Primary: Story = {
  render: ({ variant }) => <PrimaryDemo variant={variant} />,
  args: {
    variant: 'contained',
    defaultValue: ['customization']
  },
  argTypes: {
    variant: {
      options: ['contained', 'default', 'filled', 'separated'],
      control: { type: 'select' }
    }
  }
}
