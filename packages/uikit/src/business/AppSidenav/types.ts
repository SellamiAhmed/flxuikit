import type { CSSProperties, ReactNode } from 'react'

export interface AppSidenavNavChild {
  id: string
  label: string
  href?: string
  onClick?: () => void
}

export interface AppSidenavNavItem {
  id: string
  label: string
  icon?: ReactNode
  href?: string
  badgeCount?: number
  children?: AppSidenavNavChild[]
  highlighted?: boolean
  defaultExpanded?: boolean
  onClick?: () => void
}

export interface AppSidenavNotification {
  id: string
  title: string
  description: string
  href?: string
  linkLabel?: string
  icon?: ReactNode
  dismissible?: boolean
  onAction?: () => void
}

export interface AppSidenavUtilityAction {
  id: string
  ariaLabel: string
  icon: ReactNode
  href?: string
  onClick?: () => void
}

export interface AppSidenavBrand {
  name: string
  href?: string
  icon?: ReactNode
}

export interface AppSidenavProps {
  /** External mobile toggle state for off-canvas mode */
  isOpen?: boolean
  /** Which viewport edge the panel is anchored to */
  side?: 'left' | 'right'
  /** Fixed panel width in px */
  width?: number
  /** Viewports at or below this width are treated as off-canvas */
  mobileBreakpoint?: number
  className?: string
  style?: CSSProperties
  ariaLabel?: string
  navAriaLabel?: string
  notificationsAriaLabel?: string
  utilitiesAriaLabel?: string

  brand?: AppSidenavBrand
  navItems?: AppSidenavNavItem[]
  notifications?: AppSidenavNotification[]
  defaultNotifications?: AppSidenavNotification[]
  utilityActions?: AppSidenavUtilityAction[]

  expandedIds?: Record<string, boolean>
  defaultExpandedIds?: Record<string, boolean>

  onExpandedIdsChange?: (expandedIds: Record<string, boolean>) => void
  onNotificationsChange?: (notifications: AppSidenavNotification[]) => void
  onNotificationDismiss?: (notification: AppSidenavNotification) => void
  onNavItemClick?: (item: AppSidenavNavItem) => void
  onNavChildClick?: (parent: AppSidenavNavItem, child: AppSidenavNavChild) => void
}
