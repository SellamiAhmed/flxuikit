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

export interface NavMenuItemProps {
  icon?: ReactNode
  label: string
  href?: string
  badgeCount?: number
  active?: boolean
  disabled?: boolean
  defaultOpened?: boolean
  opened?: boolean
  children?: ReactNode
  onClick?: () => void
  onChange?: (opened: boolean) => void
}

export interface NavMenuSubItemProps {
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}
