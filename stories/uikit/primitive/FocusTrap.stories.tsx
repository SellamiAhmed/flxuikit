import { Box, FocusTrap, Button, TextInput } from '@flxui/uikit'
import { useDisclosure } from '@flxui/uikit/hooks'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof FocusTrap>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof FocusTrap> = {
  title: 'Primitive/FocusTrap',
  component: FocusTrap,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function PrimaryDemo() {
  const [active, { toggle }] = useDisclosure(false)
  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>
      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="First input" placeholder="First input" />
          <TextInput mt="sm" label="Second input" placeholder="Second input" />
          <TextInput mt="sm" label="Third input" placeholder="Third input" />
        </div>
      </FocusTrap>
    </Box>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
