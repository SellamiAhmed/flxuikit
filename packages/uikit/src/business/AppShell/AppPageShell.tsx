import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { Group } from '../../primitive/index.js'
import {
  PageShellBaseBackButton,
  PageShellBaseBody,
  PageShellBaseHeader,
  PageShellBaseRoot,
  PageShellBaseTitle,
  type PageShellBaseBodyProps,
  type PageShellBaseHeaderProps,
  type PageShellBaseRootProps
} from '../PageShell/page-shell-base.js'
import {
  PageShellNotificationBell,
  type PageShellNotificationBellProps
} from '../PageShell/PageShellNotificationBell.js'

import classes from './AppPageShell.module.css'
import { ExpandNavbarButtonPlaceholder } from './navbar/ExpandNavbarButtonPlaceholder.js'

type CSSWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number
}

export interface AppPageShellProps {
  maxWidth?: string
  withHeader?: boolean
  title?: React.ReactNode
  /** Fallback breadcrumbs (use `headerProps.breadcrumbs` to group with header config). */
  breadcrumbs?: React.ReactNode
  /** Fallback subtitle (use `headerProps.subtitle` to group with header config). */
  subtitle?: React.ReactNode
  /** Fallback secondary nav (use `headerProps.secondaryNav` to group with header config). */
  secondaryNav?: React.ReactNode
  children?: React.ReactNode
  headerActions?: React.ReactNode
  footer?: React.ReactNode
  wrapperProps?: PageShellBaseRootProps
  bodyProps?: PageShellBaseBodyProps
  /** Optional notification bell — auto-rendered in the right section before `headerActions`. */

  headerProps?: PageShellBaseHeaderProps & {
    withBack?: boolean
    onBackClick?: () => void
    /** Optional breadcrumbs — overrides top-level `breadcrumbs`. */
    breadcrumbs?: React.ReactNode
    /** Optional subtitle — overrides top-level `subtitle`. */
    subtitle?: React.ReactNode
    /** Optional secondary nav (tabs/pills under title) — overrides top-level `secondaryNav`. */
    secondaryNav?: React.ReactNode
    notificationBell?: PageShellNotificationBellProps
  }
}

export const AppPageShell = ({
  withHeader = true,
  headerProps,
  bodyProps,
  wrapperProps,
  maxWidth = '100%',
  title,
  breadcrumbs,
  subtitle,
  secondaryNav,
  children,
  headerActions,
  footer
}: AppPageShellProps) => {
  const [scrolled, setScrolled] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 0)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  if (!withHeader) {
    return (
      <PageShellBaseRoot
        {...bodyProps}
        className={clsx(classes.shellNoHeader, bodyProps?.className)}
        style={
          {
            ...bodyProps?.style,
            '--app-shell-page-max-width': maxWidth
          } as CSSWithVars
        }
      >
        {children}
      </PageShellBaseRoot>
    )
  }

  const {
    withBack,
    onBackClick,
    breadcrumbs: hpBreadcrumbs,
    subtitle: hpSubtitle,
    secondaryNav: hpSecondaryNav,
    notificationBell,
    ...headerPropsWithoutBack
  } = headerProps ?? {}

  const activeBreadcrumbs = hpBreadcrumbs ?? breadcrumbs
  const activeSubtitle = hpSubtitle ?? subtitle
  const activeSecondaryNav = hpSecondaryNav ?? secondaryNav

  // Compose right section: bell (optional) + custom actions
  const rightSection = headerPropsWithoutBack.rightSection ?? (
    <>
      {notificationBell && <PageShellNotificationBell {...notificationBell} />}
      {headerActions}
    </>
  )

  return (
    <PageShellBaseRoot
      {...wrapperProps}
      className={clsx(classes.shell, wrapperProps?.className)}
      style={
        {
          ...wrapperProps?.style,
          '--app-shell-page-max-width': maxWidth
        } as CSSWithVars
      }
    >
      <PageShellBaseHeader
        {...headerPropsWithoutBack}
        sticky
        className={clsx(classes.header, scrolled && classes.headerScrolled, headerPropsWithoutBack.className)}
        leftSection={
          headerPropsWithoutBack.leftSection ?? (
            <Group wrap="nowrap" gap={0}>
              <ExpandNavbarButtonPlaceholder />
              {withBack && <PageShellBaseBackButton onClick={onBackClick} />}
            </Group>
          )
        }
        rightSection={rightSection}
      >
        <div className={classes.headerContent}>
          {activeBreadcrumbs && <div className={classes.breadcrumbs}>{activeBreadcrumbs}</div>}
          {title && <PageShellBaseTitle className={classes.title}>{title}</PageShellBaseTitle>}
          {activeSubtitle && <p className={classes.subtitle}>{activeSubtitle}</p>}
          {activeSecondaryNav && <div className={classes.secondaryNav}>{activeSecondaryNav}</div>}
        </div>
      </PageShellBaseHeader>

      <PageShellBaseBody {...bodyProps} ref={bodyRef} className={clsx(classes.body, bodyProps?.className)}>
        <div className={classes.content}>{children}</div>
        {footer && <div className={classes.footer}>{footer}</div>}
      </PageShellBaseBody>
    </PageShellBaseRoot>
  )
}
