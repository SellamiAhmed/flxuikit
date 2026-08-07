import { IconChevronRight } from '@tabler/icons-react'
import clsx from 'clsx'
import { useContext, useState } from 'react'

import { ActionIcon, Anchor, Box, Collapse, Tooltip, UnstyledButton } from '../../../primitive/index.js'

import { NavMenuRefContext } from './context/nav-menu-ref-context.js'
import { NavbarCollapseContext } from './context/navbar-collapse-context.js'
import { NavMenuPortal } from './context/NavMenuPortal.js'
import classes from './index.module.css'

export interface NavMenuLinkRenderProps {
  className: string
  'aria-disabled'?: boolean
  tabIndex?: number
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
}

export interface NavMenuItemProps {
  icon?: React.ReactNode
  label: string
  href?: string
  /**
   * Escape hatch for router-driven links (e.g. TanStack Router's `Link`,
   * React Router's `Link`, Next's `Link`). When provided, this fully
   * replaces the internal `<Anchor>`/`<ActionIcon as="a">` rendering —
   * you own the actual link element and its `to`/active-state behavior.
   * `href` is ignored when `renderLink` is set.
   *
   * Example (TanStack Router):
   * renderLink={(linkProps) => (
   *   <Link to="/dashboard" preload="intent" activeProps={{ 'data-active': true }} {...linkProps} />
   * )}
   */
  renderLink?: (linkProps: NavMenuLinkRenderProps) => React.ReactNode
  badgeCount?: number
  active?: boolean
  disabled?: boolean
  defaultOpened?: boolean
  opened?: boolean
  children?: React.ReactNode
  onClick?: () => void
  onChange?: (opened: boolean) => void
}

export const NavMenuItem = ({
  icon,
  label,
  href,
  renderLink,
  badgeCount,
  active,
  disabled,
  defaultOpened,
  opened: openedProp,
  children,
  onClick,
  onChange
}: NavMenuItemProps) => {
  const navMenuRef = useContext(NavMenuRefContext)
  const hasChildren = !!children
  const [internalOpened, setInternalOpened] = useState(defaultOpened ?? false)
  const isControlled = openedProp !== undefined
  const opened = isControlled ? openedProp : internalOpened

  const toggle = () => {
    const next = !opened
    if (!isControlled) setInternalOpened(next)
    onChange?.(next)
  }

  const handleLinkClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.()
  }

  // Detect rail mode by checking if portal target is inside collapsed navbar
  const isRail = useContext(NavbarCollapseContext)
  if (isRail) {
    const railIconContent = (
      <>
        <span className={classes.railNavIcon} aria-hidden="true">
          {icon}
        </span>
        {typeof badgeCount === 'number' && badgeCount > 0 && (
          <span className={classes.railBadgeDot} aria-hidden="true" />
        )}
      </>
    )

    const railClassName = clsx(classes.railNavButton, active && classes.railNavButtonActive)

    const railContent = (
      <Box component="li" className={classes.railItem}>
        <Tooltip label={label} position="right" offset={8}>
          {renderLink ? (
            (renderLink({
              className: railClassName,
              'aria-disabled': disabled || undefined,
              tabIndex: disabled ? -1 : undefined,
              onClick: handleLinkClick,
              children: railIconContent
            }) as React.ReactElement)
          ) : (
            <ActionIcon
              component={href ? 'a' : 'button'}
              href={disabled ? undefined : href}
              type={href ? undefined : 'button'}
              disabled={!href ? disabled : undefined}
              aria-disabled={href && disabled ? true : undefined}
              tabIndex={href && disabled ? -1 : undefined}
              className={railClassName}
              aria-label={label}
              onClick={handleLinkClick}
            >
              {railIconContent}
            </ActionIcon>
          )}
        </Tooltip>
      </Box>
    )

    return <NavMenuPortal>{railContent}</NavMenuPortal>
  }

  const leafClassName = clsx(classes.navButton, active && classes.active, disabled && classes.disabled)

  const leafChildren = (
    <>
      {icon && (
        <span className={classes.navLeadIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={classes.navLabel}>{label}</span>
      {typeof badgeCount === 'number' && (
        <span className={classes.badge} aria-label={`${badgeCount} unread`}>
          {badgeCount}
        </span>
      )}
    </>
  )

  const content = (
    <Box component="li" className={classes.navItem} data-highlighted={active || undefined}>
      {hasChildren ? (
        <UnstyledButton
          type="button"
          className={clsx(classes.navButton, active && classes.active, disabled && classes.disabled)}
          aria-expanded={opened}
          disabled={disabled}
          onClick={() => {
            onClick?.()
            toggle()
          }}
        >
          {icon && (
            <span className={classes.navLeadIcon} aria-hidden="true">
              {icon}
            </span>
          )}
          <span className={classes.navLabel}>{label}</span>
          {typeof badgeCount === 'number' && (
            <span className={classes.badge} aria-label={`${badgeCount} unread`}>
              {badgeCount}
            </span>
          )}
          <span className={clsx(classes.navTrailingIcon, opened && classes.navTrailingIconExpanded)} aria-hidden="true">
            <IconChevronRight size={14} />
          </span>
        </UnstyledButton>
      ) : renderLink ? (
        (renderLink({
          className: leafClassName,
          'aria-disabled': disabled || undefined,
          tabIndex: disabled ? -1 : undefined,
          onClick: handleLinkClick,
          children: leafChildren
        }) as React.ReactElement)
      ) : (
        <Anchor
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          className={leafClassName}
          underline="never"
          onClick={handleLinkClick}
        >
          {leafChildren}
        </Anchor>
      )}

      {hasChildren && (
        <Collapse in={opened}>
          <Box component="ul" className={classes.childList}>
            {children}
          </Box>
        </Collapse>
      )}
    </Box>
  )

  return <NavMenuPortal>{content}</NavMenuPortal>
}
