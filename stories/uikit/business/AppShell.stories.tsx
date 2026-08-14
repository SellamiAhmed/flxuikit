import { AppShell, NavMenuItem, NavMenuSubItem } from '@flxui/uikit/business'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { IconHome, IconUsers, IconSettings, IconLogout, IconBell } from '@tabler/icons-react'

type Story = StoryObj<typeof AppShell>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ height: '600px', border: '1px solid var(--ds-color-border-neutral)' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof AppShell> = {
  title: 'Business/AppShell',
  component: AppShell,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

export const Primary: Story = {
  render: () => (
    <AppShell
      navbar={{
        logo: <strong>Flex UI</strong>,
        footer: {
          utilitiesAriaLabel: 'Sidebar utilities',
          utilityActions: [{ id: 'logout', ariaLabel: 'Log out', icon: <IconLogout size={16} /> }]
        }
      }}
    >
      {/*
        NavMenuItem/NavMenuSubItem don't render inline here — they portal
        into the navbar's menu section via NavMenuRefContext. Everything
        else stays in the main body.
      */}
      <NavMenuItem icon={<IconHome size={16} />} label="Home" href="#" active />
      <NavMenuItem icon={<IconUsers size={16} />} label="Team">
        <NavMenuSubItem label="Members" href="#" active />
        <NavMenuSubItem label="Invitations" href="#" />
      </NavMenuItem>
      <NavMenuItem icon={<IconSettings size={16} />} label="Settings" href="#" />

      <div style={{ padding: 24 }}>
        <h2>Main content</h2>
        <p>This is the page body, rendered where children normally would be.</p>
      </div>
    </AppShell>
  )
}

export const Collapsed: Story = {
  render: () => (
    <AppShell
      navbar={{
        logo: <strong>Flex UI</strong>,
        logoCollapsed: <strong>F</strong>,
        collapsed: true,
        footer: {
          utilityActions: [{ id: 'logout', ariaLabel: 'Log out', icon: <IconLogout size={16} /> }]
        }
      }}
    >
      <NavMenuItem icon={<IconHome size={16} />} label="Home" href="#" active />
      <NavMenuItem icon={<IconUsers size={16} />} label="Team" href="#" />
      <NavMenuItem icon={<IconSettings size={16} />} label="Settings" href="#" />

      <div style={{ padding: 24 }}>
        <h2>Main content</h2>
        <p>Navbar shown in collapsed "rail" mode — icons only, tooltips on hover.</p>
      </div>
    </AppShell>
  )
}

export const WithNotifications: Story = {
  render: () => (
    <AppShell
      navbar={{
        logo: <strong>Flex UI</strong>,
        footer: {
          utilityActions: [{ id: 'logout', ariaLabel: 'Log out', icon: <IconLogout size={16} /> }]
        },
        notifications: {
          notificationsAriaLabel: 'Announcements',
          notifications: [
            {
              id: 'n1',
              title: 'New feature',
              description: 'Dark mode is now available across the dashboard.',
              icon: <IconBell size={16} />,
              dismissible: true
            }
          ],
          onDismiss: () => {}
        }
      }}
    >
      <NavMenuItem icon={<IconHome size={16} />} label="Home" href="#" active />
      <NavMenuItem icon={<IconSettings size={16} />} label="Settings" href="#" />

      <div style={{ padding: 24 }}>
        <h2>Main content</h2>
      </div>
    </AppShell>
  )
}

export const WithBadgeAndBanner: Story = {
  render: () => (
    <AppShell
      banner={
        <div style={{ padding: 8, textAlign: 'center', background: 'var(--ds-color-background-warning)' }}>
          You're on a trial plan. Upgrade for full access.
        </div>
      }
      navbar={{
        logo: <strong>Flex UI</strong>,
        footer: {
          utilityActions: [{ id: 'logout', ariaLabel: 'Log out', icon: <IconLogout size={16} /> }]
        }
      }}
    >
      <NavMenuItem icon={<IconHome size={16} />} label="Home" href="#" active />
      <NavMenuItem icon={<IconUsers size={16} />} label="Inbox" href="#" badgeCount={3} />

      <div style={{ padding: 24 }}>
        <h2>Main content</h2>
      </div>
    </AppShell>
  )
}
