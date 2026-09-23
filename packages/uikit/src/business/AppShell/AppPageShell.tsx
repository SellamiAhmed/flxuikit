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
  /** Caps the width of the scrollable content (and footer) independently of
   *  the header, which always spans the shell's full width. Defaults to
   *  1280px — every page should inherit this unless it genuinely needs
   *  full-width content (e.g. a wide table or calendar). */
  contentMaxWidth?: string // NEW
  withHeader?: boolean
  title?: React.ReactNode
  breadcrumbs?: React.ReactNode
  subtitle?: React.ReactNode
  secondaryNav?: React.ReactNode
  children?: React.ReactNode
  headerActions?: React.ReactNode
  footer?: React.ReactNode
  wrapperProps?: PageShellBaseRootProps
  bodyProps?: PageShellBaseBodyProps
  headerProps?: PageShellBaseHeaderProps & {
    withBack?: boolean
    onBackClick?: () => void
    breadcrumbs?: React.ReactNode
    subtitle?: React.ReactNode
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
  contentMaxWidth = '1280px', // NEW — app-wide default, every page inherits this
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
            '--app-shell-page-max-width': maxWidth,
            '--app-shell-content-max-width': contentMaxWidth // NEW
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
          '--app-shell-page-max-width': maxWidth,
          '--app-shell-content-max-width': contentMaxWidth // NEW
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
