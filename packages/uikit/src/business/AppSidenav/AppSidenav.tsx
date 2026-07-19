import { useMediaQuery } from '@mantine/hooks'
import clsx from 'clsx'
import { useMemo, useState, type CSSProperties } from 'react'

import { Box } from '../../primitive/index.js'

import {
  DEFAULT_APP_SIDENAV_BRAND,
  DEFAULT_APP_SIDENAV_NAV_ITEMS,
  DEFAULT_APP_SIDENAV_NOTIFICATIONS,
  DEFAULT_APP_SIDENAV_UTILITY_ACTIONS
} from './defaults.js'
import { BrandHeader } from './header/BrandHeader.js'
import { buildInitialExpandedMap } from './helpers.js'
import classes from './index.module.css'
import { Navbar } from './navbar/Navbar.js'
import { Notifications } from './notifications/Notifications.js'
import type { AppSidenavNotification, AppSidenavProps } from './types.js'
import { BottomUtilities } from './utilities/BottomUtilities.js'

export type {
  AppSidenavBrand,
  AppSidenavNavChild,
  AppSidenavNavItem,
  AppSidenavNotification,
  AppSidenavProps,
  AppSidenavUtilityAction
} from './types.js'

export {
  DEFAULT_APP_SIDENAV_BRAND,
  DEFAULT_APP_SIDENAV_NAV_ITEMS,
  DEFAULT_APP_SIDENAV_NOTIFICATIONS,
  DEFAULT_APP_SIDENAV_UTILITY_ACTIONS
}

export function AppSidenav({
  isOpen = false,
  side = 'left',
  width = 288,
  mobileBreakpoint = 960,
  className,
  style,
  ariaLabel = 'Application sidebar navigation',
  navAriaLabel = 'Primary navigation',
  notificationsAriaLabel = 'Announcements',
  utilitiesAriaLabel = 'Sidebar utilities',
  brand = DEFAULT_APP_SIDENAV_BRAND,
  navItems = DEFAULT_APP_SIDENAV_NAV_ITEMS,
  notifications,
  defaultNotifications = DEFAULT_APP_SIDENAV_NOTIFICATIONS,
  utilityActions = DEFAULT_APP_SIDENAV_UTILITY_ACTIONS,
  expandedIds,
  defaultExpandedIds,
  onExpandedIdsChange,
  onNotificationsChange,
  onNotificationDismiss,
  onNavItemClick,
  onNavChildClick
}: AppSidenavProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<Record<string, boolean>>(
    () => defaultExpandedIds ?? buildInitialExpandedMap(navItems)
  )
  const [internalNotifications, setInternalNotifications] = useState<AppSidenavNotification[]>(defaultNotifications)

  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`)
  const controlledNotifications = notifications !== undefined
  const controlledExpanded = expandedIds !== undefined

  const currentNotifications = controlledNotifications ? notifications : internalNotifications
  const currentExpandedIds = controlledExpanded ? expandedIds : internalExpandedIds

  const rootStyle = useMemo<CSSProperties>(
    () => ({ '--app-sidenav-width': `${width}px`, ...(style ?? {}) }) as CSSProperties,
    [style, width]
  )

  const toggleSection = (itemId: string) => {
    const next = { ...currentExpandedIds, [itemId]: !currentExpandedIds[itemId] }

    if (!controlledExpanded) {
      setInternalExpandedIds(next)
    }

    onExpandedIdsChange?.(next)
  }

  const dismissNotification = (item: AppSidenavNotification) => {
    const next = currentNotifications.filter((card) => card.id !== item.id)

    if (!controlledNotifications) {
      setInternalNotifications(next)
    }

    onNotificationsChange?.(next)
    onNotificationDismiss?.(item)
  }

  return (
    <Box
      component="aside"
      className={clsx(classes.sidenav, className)}
      style={rootStyle}
      data-open={isOpen}
      data-mobile={isMobile || undefined}
      data-side={side}
      aria-label={ariaLabel}
    >
      <BrandHeader brand={brand} />

      <Navbar
        navAriaLabel={navAriaLabel}
        navItems={navItems}
        expandedIds={currentExpandedIds}
        onItemClick={(item) => {
          item.onClick?.()
          onNavItemClick?.(item)
        }}
        onItemToggle={toggleSection}
        onChildClick={(child, parent) => {
          child.onClick?.()
          onNavChildClick?.(parent, child)
        }}
      />

      <Notifications
        notificationsAriaLabel={notificationsAriaLabel}
        notifications={currentNotifications}
        onDismiss={dismissNotification}
      />

      <BottomUtilities utilitiesAriaLabel={utilitiesAriaLabel} utilityActions={utilityActions} />
    </Box>
  )
}
