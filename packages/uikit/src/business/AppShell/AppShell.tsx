import { useCallback, useEffect, useRef, useState } from 'react'

import { Box } from '../../primitive/index.js'
import { Notifications } from '../AppShell/section/notifications/Notifications.js'
import { BottomUtilities } from '../AppShell/section/utilities/BottomUtilities.js'

import { AppShellBody } from './container/AppShellBody.js'
import { AppShellMain } from './container/AppShellMain.js'
import { AppShellRoot } from './container/AppShellRoot.js'
import classes from './index.module.css'
import { NavMenuRefContext } from './navbar/context/nav-menu-ref-context.js'
import { NavbarCollapseContext } from './navbar/context/navbar-collapse-context.js'
import { Navbar } from './navbar/Navbar.js'
import { NavbarHeader } from './navbar/NavbarHeader.js'
import { NavbarSection } from './navbar/NavbarSection.js'
import type { AppSidenavNotification, AppSidenavUtilityAction } from './types.js'

const DEFAULT_NAVBAR_WIDTH = 240
const RAIL_WIDTH = 56

export interface AppShellProps {
  banner?: React.ReactNode
  navbar: {
    width?: number
    logo: React.ReactNode
    collapsed?: boolean
    logoCollapsed?: React.ReactNode
    headerLeftSection?: React.ReactNode
    aboveMenu?: React.ReactNode
    notifications?: {
      notificationsAriaLabel?: string
      notifications: AppSidenavNotification[]
      onDismiss: (notification: AppSidenavNotification) => void
    }
    footer: {
      utilitiesAriaLabel?: string
      utilityActions: AppSidenavUtilityAction[]
    }
    onLogoClick?: () => void
    onCollapse?: () => void
    onExpand?: () => void
  }
  children: React.ReactNode
}

export const AppShell = ({ banner, navbar, children }: AppShellProps) => {
  const navMenuRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [withBanner, setWithBanner] = useState(false)
  const [internalCollapsed, setInternalCollapsed] = useState(false)

  // Controlled OR uncontrolled
  const navbarCollapsed = navbar.collapsed !== undefined ? navbar.collapsed : internalCollapsed
  const isControlled = navbar.collapsed !== undefined

  const navbarWidth = navbar.width ?? DEFAULT_NAVBAR_WIDTH

  const handleNavbarCollapse = useCallback(() => {
    if (!isControlled) setInternalCollapsed(true)
    navbar.onCollapse?.()
  }, [isControlled, navbar.onCollapse])

  const handleNavbarExpand = useCallback(() => {
    if (!isControlled) setInternalCollapsed(false)
    navbar.onExpand?.()
  }, [isControlled, navbar.onExpand])

  useEffect(() => {
    if (bannerRef.current) {
      setWithBanner(bannerRef.current.children.length > 0)
    }
  }, [banner])
  return (
    <AppShellRoot>
      <Box ref={bannerRef} className={classes.appShellBanner}>
        {banner}
      </Box>

      <AppShellMain
        data-height-flex={withBanner || undefined}
        style={
          {
            '--app-shell-navbar-width': navbarCollapsed ? `${RAIL_WIDTH}px` : `${navbarWidth}px`,
            '--app-shell-navbar-offset': navbarCollapsed ? `${RAIL_WIDTH}px` : `${navbarWidth}px`,
            '--app-shell-navbar-collapsed': navbarCollapsed ? '1' : '0'
          } as React.CSSProperties
        }
      >
        <NavbarCollapseContext.Provider value={navbarCollapsed}>
          <Navbar withBorder collapsed={navbarCollapsed}>
            <NavbarHeader
              logo={navbar.logo}
              logoCollapsed={navbar.logoCollapsed || navbar.logo}
              collapsed={navbarCollapsed}
              onLogoClick={navbar.onLogoClick}
              onToggleCollapse={handleNavbarCollapse}
              onToggleExpand={handleNavbarExpand}
            />

            {navbar.aboveMenu && !navbarCollapsed && (
              <NavbarSection>
                <Box className={classes.navbarAboveMenu}>{navbar.aboveMenu}</Box>
              </NavbarSection>
            )}

            <NavbarSection className={classes.navbarMenuSection} grow scrollable>
              <Box ref={navMenuRef} className={classes.navbarMenu} />
            </NavbarSection>

            {navbar.notifications && !navbarCollapsed && (
              <NavbarSection className={classes.navbarNotificationsSection}>
                <Notifications
                  notificationsAriaLabel={navbar.notifications.notificationsAriaLabel ?? 'Announcements'}
                  notifications={navbar.notifications.notifications}
                  onDismiss={navbar.notifications.onDismiss}
                />
              </NavbarSection>
            )}

            <NavbarSection className={classes.navbarFooterSection}>
              <BottomUtilities
                utilitiesAriaLabel={navbar.footer.utilitiesAriaLabel ?? 'Sidebar utilities'}
                utilityActions={navbar.footer.utilityActions}
                collapsed={navbarCollapsed}
              />
            </NavbarSection>
          </Navbar>

          <AppShellBody>
            <NavMenuRefContext.Provider value={navMenuRef}>{children}</NavMenuRefContext.Provider>
          </AppShellBody>
        </NavbarCollapseContext.Provider>
      </AppShellMain>
    </AppShellRoot>
  )
}
