import { Affix, Button } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof Affix>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Affix> = {
  title: 'Primitive/Affix',
  component: Affix,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

export const Primary: Story = {
  render: ({ ...rest }) => (
    <div>
      <p>
        Affix renders a div element with fixed position inside a Portal component. Use it to display elements fixed at
        any position on screen, for example a scroll-to-top button:
      </p>
      <Affix position={{ top: 200, left: 50 }} {...rest}>
        <Button onClick={() => alert('Scroll to top!')}>Scroll to top</Button>
      </Affix>
    </div>
  ),
  args: {
    withinPortal: false,
    zIndex: 0
  }
}
