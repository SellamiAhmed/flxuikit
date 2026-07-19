# AppSidenav

A fixed-width, full-height application sidebar for business apps.

- Mantine v7 + `@flex/uikit` primitives
- Token-driven styles (`--ds-*`)
- Mobile off-canvas via external `isOpen`
- Reusable, config-driven API for nav, notifications, and utilities

## Import

```tsx
import { AppSidenav } from '@flex/uikit/business'
```

## Minimal usage (uncontrolled)

```tsx
import { useState } from 'react'
import { Button } from '@flex/uikit'
import { AppSidenav } from '@flex/uikit/business'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setOpen((v) => !v)}>
        Toggle sidenav
      </Button>

      <AppSidenav isOpen={open} />
    </>
  )
}
```

## Controlled notifications + expanded sections

```tsx
import { useMemo, useState } from 'react'
import { Button } from '@flex/uikit'
import {
  AppSidenav,
  type AppSidenavNotification,
  type AppSidenavNavItem
} from '@flex/uikit/business'

const navItems: AppSidenavNavItem[] = [
  { id: 'overview', label: 'Overview', href: '/overview' },
  {
    id: 'workspace',
    label: 'Workspace',
    highlighted: true,
    children: [
      { id: 'projects', label: 'Projects', href: '/projects' },
      { id: 'teams', label: 'Teams', href: '/teams' }
    ]
  }
]

const initialCards: AppSidenavNotification[] = [
  {
    id: 'notice-1',
    title: 'Platform update',
    description: 'A new update is ready for your workspace.',
    href: '/updates',
    linkLabel: 'Update now',
    dismissible: true
  }
]

export function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({ workspace: true })
  const [cards, setCards] = useState<AppSidenavNotification[]>(initialCards)

  const utilities = useMemo(
    () => [
      { id: 'settings', ariaLabel: 'Settings', icon: <span>⚙️</span>, onClick: () => {} },
      { id: 'lang', ariaLabel: 'Language', icon: <span>🌐</span>, onClick: () => {} }
    ],
    []
  )

  return (
    <>
      <Button type="button" onClick={() => setIsOpen((v) => !v)}>
        Toggle sidenav
      </Button>

      <AppSidenav
        isOpen={isOpen}
        navItems={navItems}
        expandedIds={expandedIds}
        onExpandedIdsChange={setExpandedIds}
        notifications={cards}
        onNotificationsChange={setCards}
        utilityActions={utilities}
      />
    </>
  )
}
```

## Main props

- `isOpen?: boolean` — external mobile/off-canvas visibility
- `side?: 'left' | 'right'` — anchor edge
- `width?: number` — fixed width (px)
- `mobileBreakpoint?: number` — off-canvas threshold
- `brand?: AppSidenavBrand`
- `navItems?: AppSidenavNavItem[]`
- `notifications?: AppSidenavNotification[]` (controlled)
- `defaultNotifications?: AppSidenavNotification[]` (uncontrolled)
- `expandedIds?: Record<string, boolean>` (controlled)
- `defaultExpandedIds?: Record<string, boolean>` (uncontrolled)
- `utilityActions?: AppSidenavUtilityAction[]`
- `onExpandedIdsChange?`, `onNotificationsChange?`, `onNotificationDismiss?`
- `onNavItemClick?`, `onNavChildClick?`

## Exported defaults

- `DEFAULT_APP_SIDENAV_BRAND`
- `DEFAULT_APP_SIDENAV_NAV_ITEMS`
- `DEFAULT_APP_SIDENAV_NOTIFICATIONS`
- `DEFAULT_APP_SIDENAV_UTILITY_ACTIONS`
