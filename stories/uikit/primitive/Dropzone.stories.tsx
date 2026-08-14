import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, Group, Text } from '@flxui/uikit'
import { rem } from '@flxui/uikit/utils'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'

type Story = StoryObj<typeof Dropzone>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Dropzone> = {
  title: 'Primitive/Dropzone',
  component: Dropzone,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

function BaseDemo(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--ds-color-icon-brand)' }} stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX style={{ width: rem(52), height: rem(52), color: 'var(--ds-color-icon-danger)' }} stroke={1.5} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--ds-color-icon-subtle)' }} stroke={1.5} />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}

export const Primary: Story = {
  render: () => <BaseDemo />,
  args: {}
}
