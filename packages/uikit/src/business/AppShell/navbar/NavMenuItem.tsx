import { IconChevronRight } from '@tabler/icons-react'
import clsx from 'clsx'
import { useContext, useState } from 'react'

import { ActionIcon, Anchor, Box, Collapse, Tooltip, UnstyledButton } from '../../../primitive/index.js'

import { NavMenuRefContext } from './context/nav-menu-ref-context.js'
import { NavbarCollapseContext } from './context/navbar-collapse-context.js'
import { NavMenuPortal } from './context/NavMenuPortal.js'
import classes from './index.module.css'

export interface NavMenuItemProps {
  icon?: React.ReactNode
  label: string
  href?: string
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

  // Detect rail mode by checking if portal target is inside collapsed navbar
  const isRail = useContext(NavbarCollapseContext)
  if (isRail) {
    console.log('rail label:', label)
    const railContent = (
      <Box component="li" className={classes.railItem}>
        <Tooltip label={label} position="right" offset={8}>
          <ActionIcon
            component={href ? 'a' : 'button'}
            href={href}
            type={href ? undefined : 'button'}
            className={clsx(classes.railNavButton, active && classes.railNavButtonActive)}
            aria-label={label}
            onClick={onClick}
          >
            <span className={classes.railNavIcon} aria-hidden="true">
              {icon}
            </span>
            {typeof badgeCount === 'number' && badgeCount > 0 && (
              <span className={classes.railBadgeDot} aria-hidden="true" />
            )}
          </ActionIcon>
        </Tooltip>
      </Box>
    )

    return <NavMenuPortal>{railContent}</NavMenuPortal>
  }

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
      ) : (
        <Anchor
          href={href}
          className={clsx(classes.navButton, active && classes.active, disabled && classes.disabled)}
          underline="never"
          onClick={onClick}
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
