import { Autocomplete } from '@flxui/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

import { SIZE_LIST } from '../../constants.js'

type Story = StoryObj<typeof Autocomplete>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Autocomplete> = {
  title: 'Primitive/Autocomplete',
  component: Autocomplete,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'riot', label: 'Riot' },
  { value: 'next', label: 'Next.js' },
  { value: 'blitz', label: 'Blitz.js' }
]

function getDescriptionItem(description: string, type: string) {
  return {
    description,
    table: { type: { summary: type } }
  }
}

function Demo({ ...props }) {
  return <Autocomplete data={data} label="Your favorite frameworks/libraries" placeholder="Pick one" {...props} />
}

export const Primary: Story = {
  render: ({ ...props }) => <Demo {...props} />,
  parameters: {
    controls: { expanded: true }
  },
  args: {},
  argTypes: {
    defaultValue: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    disabled: { control: 'boolean' },
    error: { control: { type: 'text' }, ...getDescriptionItem('Displays error message after input', 'ReactNode') },
    limit: {
      control: { type: 'number' },
      ...getDescriptionItem('Limit amount of items displayed at a time', 'number')
    },
    maxDropdownHeight: { control: { type: 'text' } },
    radius: { control: { type: 'select' }, options: SIZE_LIST },
    required: { control: 'boolean' },
    size: { control: { type: 'select' }, options: SIZE_LIST },
    value: { control: { type: 'text' } },
    variant: { control: { type: 'select' }, options: ['unstyled', 'default', 'filled'] },
    withAsterisk: { control: { type: 'boolean' } }
  }
}
