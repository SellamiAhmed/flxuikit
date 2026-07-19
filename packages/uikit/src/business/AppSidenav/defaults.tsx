import {
  IconAdjustmentsHorizontal,
  IconBell,
  IconInfoCircle,
  IconLanguage,
  IconLayoutSidebar,
  IconSettings,
  IconSpeakerphone
} from '@tabler/icons-react'

import type { AppSidenavBrand, AppSidenavNavItem, AppSidenavNotification, AppSidenavUtilityAction } from './types.js'

export const DEFAULT_APP_SIDENAV_BRAND: AppSidenavBrand = {
  name: 'Flex UIKit',
  href: '#home',
  icon: <IconLayoutSidebar size={16} />
}

export const DEFAULT_APP_SIDENAV_NAV_ITEMS: AppSidenavNavItem[] = [
  { id: 'overview', label: 'Overview', href: '#overview', icon: <IconLayoutSidebar size={16} /> },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: <IconLayoutSidebar size={16} />,
    children: [
      { id: 'projects', label: 'Projects', href: '#projects' },
      { id: 'teams', label: 'Teams', href: '#teams' },
      { id: 'billing', label: 'Billing', href: '#billing' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <IconLayoutSidebar size={16} />,
    highlighted: true,
    defaultExpanded: true,
    children: [
      { id: 'traffic', label: 'Traffic', href: '#traffic' },
      { id: 'conversion', label: 'Conversion', href: '#conversion' },
      { id: 'retention', label: 'Retention', href: '#retention' }
    ]
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '#notifications',
    icon: <IconBell size={16} />,
    badgeCount: 3
  }
]

export const DEFAULT_APP_SIDENAV_NOTIFICATIONS: AppSidenavNotification[] = [
  {
    id: 'release-1',
    title: 'Platform update',
    description: 'A new sidebar customization flow is available. Review your navigation preferences.',
    href: '#update-navigation',
    linkLabel: 'Update now',
    icon: <IconSpeakerphone size={14} />,
    dismissible: true
  },
  {
    id: 'release-2',
    title: 'Security notice',
    description: 'Enable organization-wide 2FA to improve account protection across all workspaces.',
    href: '#enable-2fa',
    linkLabel: 'Update now',
    icon: <IconInfoCircle size={14} />,
    dismissible: true
  }
]

export const DEFAULT_APP_SIDENAV_UTILITY_ACTIONS: AppSidenavUtilityAction[] = [
  { id: 'settings', ariaLabel: 'Settings', icon: <IconSettings size={16} /> },
  { id: 'language', ariaLabel: 'Language', icon: <IconLanguage size={16} /> },
  { id: 'preferences', ariaLabel: 'Preferences', icon: <IconAdjustmentsHorizontal size={16} /> }
]
