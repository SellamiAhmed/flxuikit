import { Button, Group, Stepper } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { useState } from 'react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Stepper>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Stepper> = {
  title: 'Primitive/Stepper',
  component: Stepper,
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

function PrimaryDemo({ ...props }) {
  const [active, setActive] = useState(1)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <>
      <Stepper active={active} onStepClick={setActive} {...props}>
        <Stepper.Step label="First step" description="Create an account">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  )
}

export const Primary: Story = {
  render: PrimaryDemo
}
