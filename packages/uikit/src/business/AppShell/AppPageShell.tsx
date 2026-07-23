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

import classes from './AppPageShell.module.css'
import { ExpandNavbarButtonPlaceholder } from './navbar/ExpandNavbarButtonPlaceholder.js'

type CSSWithVars = React.CSSProperties & {
  [key: `--${string}`]: string | number
}

export interface AppPageShellProps {
  maxWidth?: string
  withHeader?: boolean
  title?: React.ReactNode
  subtitle?: React.ReactNode
  breadcrumbs?: React.ReactNode
  children?: React.ReactNode
  headerActions?: React.ReactNode
  secondaryNav?: React.ReactNode
  footer?: React.ReactNode
  wrapperProps?: PageShellBaseRootProps
  headerProps?: PageShellBaseHeaderProps & {
    withBack?: boolean
    onBackClick?: () => void
  }
  bodyProps?: PageShellBaseBodyProps
}

export const AppPageShell = ({
  withHeader = true,
  headerProps,
  bodyProps,
  wrapperProps,
  maxWidth = '100%',
  title,
  subtitle,
  breadcrumbs,
  children,
  headerActions,
  secondaryNav,
  footer,
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
        style={{
          ...bodyProps?.style,
          '--app-shell-page-max-width': maxWidth,
        } as CSSWithVars}
      >
        {children}
      </PageShellBaseRoot>
    )
  }

  const { withBack, onBackClick, ...headerPropsWithoutBack } = headerProps ?? {}

  return (
    <PageShellBaseRoot
      {...wrapperProps}
      className={clsx(classes.shell, wrapperProps?.className)}
      style={{
        ...wrapperProps?.style,
        '--app-shell-page-max-width': maxWidth,
      } as CSSWithVars}
    >
      <PageShellBaseHeader
        {...headerPropsWithoutBack}
        sticky
        className={clsx(
          classes.header,
          scrolled && classes.headerScrolled,
          headerPropsWithoutBack.className
        )}
        leftSection={
          <Group wrap="nowrap" gap={0}>
            <ExpandNavbarButtonPlaceholder />
            {withBack && <PageShellBaseBackButton onClick={onBackClick} />}
          </Group>
        }
        rightSection={headerActions}
      >
        <div className={classes.headerContent}>
          {breadcrumbs && <div className={classes.breadcrumbs}>{breadcrumbs}</div>}
          {title && <PageShellBaseTitle className={classes.title}>{title}</PageShellBaseTitle>}
          {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
          {secondaryNav && <div className={classes.secondaryNav}>{secondaryNav}</div>}
        </div>
      </PageShellBaseHeader>

      <PageShellBaseBody
        {...bodyProps}
        ref={bodyRef}
        className={clsx(classes.body, bodyProps?.className)}
      >
        <div className={classes.content}>{children}</div>
        {footer && <div className={classes.footer}>{footer}</div>}
      </PageShellBaseBody>
    </PageShellBaseRoot>
  )
}
