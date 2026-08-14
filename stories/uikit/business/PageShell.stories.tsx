import { Button, Group, Badge } from '@flxui/uikit'
import { AppPageShell } from '@flxui/uikit/business'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { IconArrowLeft } from '@tabler/icons-react'

type Story = StoryObj<typeof AppPageShell>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ height: '500px', border: '1px solid var(--ds-color-border-neutral)' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof AppPageShell> = {
  title: 'Business/AppPageShell',
  component: AppPageShell,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

export const Primary: Story = {
  render: () => (
    <AppPageShell title="Dashboard">
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const WithBreadcrumbsAndSubtitle: Story = {
  render: () => (
    <AppPageShell
      title="Project Settings"
      breadcrumbs={<span>Projects / Acme Corp / Settings</span>}
      subtitle="Manage your project configuration and integrations."
    >
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const WithBackButton: Story = {
  render: () => (
    <AppPageShell
      title="Edit Member"
      headerProps={{
        withBack: true,
        onBackClick: () => console.log('back clicked')
      }}
    >
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const WithHeaderActions: Story = {
  render: () => (
    <AppPageShell
      title="Team Members"
      headerActions={
        <Group gap="xs">
          <Button variant="default" size="sm">
            Export
          </Button>
          <Button size="sm">Invite member</Button>
        </Group>
      }
    >
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const WithSecondaryNav: Story = {
  render: () => (
    <AppPageShell
      title="Billing"
      secondaryNav={
        <Group gap="lg">
          <span>Overview</span>
          <span>Invoices</span>
          <span>Payment methods</span>
        </Group>
      }
    >
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const WithFooter: Story = {
  render: () => (
    <AppPageShell
      title="Create Report"
      footer={
        <Group justify="flex-end" gap="xs">
          <Button variant="default">Cancel</Button>
          <Button>Save report</Button>
        </Group>
      }
    >
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const WithNotificationBell: Story = {
  render: () => (
    <AppPageShell
      title="Dashboard"
      headerProps={{
        notificationBell: {
          count: 3,
          ariaLabel: 'Notifications'
        }
      }}
    >
      <p>Main page content goes here.</p>
    </AppPageShell>
  )
}

export const NoHeader: Story = {
  render: () => (
    <AppPageShell withHeader={false}>
      <p>Content-only shell, no header rendered at all.</p>
    </AppPageShell>
  )
}
