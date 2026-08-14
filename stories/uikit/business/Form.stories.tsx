import { Group, Center, Divider } from '@flxui/uikit'
import {
  Form,
  FormTextInput,
  FormPasswordInput,
  FormMultiSelect,
  FormSelect,
  FormNumberInput,
  FormRatingInput,
  FormSwitch,
  FormTextareaInput,
  FormPhoneInput,
  FormCopyText,
  FormRadioGroup,
  FormSegmentedControl,
  FormCheckboxGroup,
  FormCheckbox,
  FormDatePicker
} from '@flxui/uikit/business'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { IconAt, IconLock } from '@tabler/icons-react'

type Story = StoryObj<typeof Form>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof Form> = {
  title: 'Business/Form',
  component: Form,
  decorators: [decorator],
  tags: ['autodocs']
}

export default meta

export const Primary: Story = {
  render: ({ ...args }) => (
    <Center w={500} m="0 auto" p="sm">
      <Form
        {...args}
        w={'100%'}
        formMode="onChange"
        layoutProps={{ gap: 'xs' }}
        onSubmit={() => {
          throw new Error('Test error')
        }}
      >
        <p>
          Form component based on{' '}
          <a href="https://react-hook-form.com/docs" target="_blank" rel="noreferrer">
            react-hook-form
          </a>
          .
        </p>
        <Group grow align="flex-start">
          <FormTextInput
            name="first_name"
            rules={{ minLength: { value: 10, message: 'min length is 10' } }}
            placeholder="Your first name"
            label="First name"
          />
          <FormTextInput name="last_name" placeholder="Your last name" label="Last name" />
        </Group>
        <FormTextInput
          name="email"
          mt="md"
          placeholder="Your email"
          label="Email"
          leftSection={<IconAt size={16} stroke={1.5} />}
        />
        <FormPasswordInput
          name="password"
          mt="md"
          placeholder="Password"
          label="Password"
          rules={{ minLength: { value: 8, message: 'min length is 8' } }}
          leftSection={<IconLock size={16} stroke={1.5} />}
        />
        <FormSegmentedControl
          name="option"
          mt="md"
          data={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' }
          ]}
        />
        <FormPhoneInput
          name="phone"
          label="Phone Number"
          rules={{ required: 'Required' }}
          placeholder="Your phone number"
        />
        <FormSelect
          name="framework"
          data={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' }
          ]}
          label="Framework"
          placeholder="Select Framework"
          rules={{ required: 'Required' }}
        />
        <FormMultiSelect
          name="frameworks"
          placeholder="Select Multiple Frameworks"
          data={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
            { label: 'Svelte', value: 'svelte' }
          ]}
          label="MultiSelect"
          rules={{ required: 'Required' }}
        />
        <FormDatePicker name="date" label="Date" placeholder="Pick a date" clearable />
        <FormNumberInput name="amount" label="Amount" placeholder="Your amount" />
        <FormRatingInput name="rating" label="Rating" />
        <FormSwitch name="checked" label="Checked" />
        <FormTextareaInput name="message" label="Message" placeholder="Your message" minRows={2} />
        <FormCopyText value={'This is an example'} />
        <FormRadioGroup
          name="radio"
          data={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
            { label: 'Svelte', value: 'svelte' }
          ]}
          label="Your favorite framework"
        />
        <FormCheckboxGroup
          name="checkboxGroup"
          data={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
            { label: 'Svelte', value: 'svelte' }
          ]}
          label="Your favorite framework"
          direction="column"
        />

        <Divider />

        <FormCheckbox name="checkbox" label="I agree to the terms and conditions" />
      </Form>
    </Center>
  ),
  args: {
    withActions: true,
    layout: 'vertical',
    layoutProps: {},
    actionsProps: {
      loading: false,
      disabled: false,
      onCancel: () => {},
      onConfirm: () => {},
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      cancelProps: {},
      confirmProps: {}
    },
    errorMessageProps: {
      onDismiss: () => {},
      autoScroll: false,
      closable: true
    },
    stopPropagation: false,
    preventDefault: false,
    defaultValues: {},
    formMode: 'all',
    reValidateMode: 'onChange',
    onSubmit: (data, event) => {}
  },
  argTypes: {
    withActions: { description: 'Hide or show action buttons' },
    actionsProps: { description: 'Props for actions buttons' },
    layout: { description: 'Layout for form: `vertical`, `horizontal` or `none`' },
    layoutProps: { description: 'Layout props, same as `FlexProps`' },
    errorMessageProps: { description: 'Props for error message, extends from `AlertProps`' },
    stopPropagation: { description: 'Prevents further propagation of the current submit event' },
    preventDefault: { description: 'Prevent default form event behaviors' },
    form: { description: 'Form instance for `useForm`, with this props to have full control of form' },
    defaultValues: { description: 'Default values for the form' },
    formMode: { description: "Same as react-hook-form's `Mode`" },
    reValidateMode: { description: "Same as react-hook-form's `reValidateMode`" },
    onSubmit: { description: 'Submit event handler' }
  },
  parameters: {}
}
