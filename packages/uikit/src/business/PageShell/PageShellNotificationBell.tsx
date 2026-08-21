import { IconBell } from '@tabler/icons-react'

import { ActionIcon, Menu } from '../../primitive/index.js'

import classes from './PageShellNotificationBell.module.css'

export interface PageShellNotificationBellProps {
  count?: number
  /**
   * Show a small presence dot instead of the numeric count badge.
   * Useful when you know there's something unread but don't want to
   * (or can't) surface an exact number.
   */
  dot?: boolean
  icon?: React.ReactNode
  ariaLabel?: string
  onClick?: () => void
  menuItems?: React.ReactNode
  menuWidth?: number
}

export const PageShellNotificationBell = ({
  count,
  dot = false,
  icon,
  ariaLabel = 'Notifications',
  onClick,
  menuItems,
  menuWidth = 280
}: PageShellNotificationBellProps) => {
  const hasCount = count !== undefined && count > 0
  const hasIndicator = dot || hasCount

  const label = hasCount ? `${ariaLabel} (${count})` : hasIndicator ? `${ariaLabel} (unread)` : ariaLabel

  const bellContent = (
    <span className={classes.inner}>
      {icon ?? <IconBell size={16} aria-hidden="true" />}
      {hasIndicator &&
        (dot ? (
          <span className={classes.badgeDot} aria-hidden="true" />
        ) : (
          <span className={classes.badgeCount} aria-hidden="true">
            {count! > 99 ? '99+' : count}
          </span>
        ))}
    </span>
  )

  if (!menuItems) {
    return (
      <ActionIcon variant="subtle" size="sm" aria-label={label} onClick={onClick} style={{ overflow: 'visible' }}>
        {bellContent}
      </ActionIcon>
    )
  }

  return (
    <Menu position="bottom-end" offset={4} width={menuWidth} withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" size="sm" aria-label={label} style={{ overflow: 'visible' }}>
          {bellContent}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown className={classes.dropdown}>{menuItems}</Menu.Dropdown>
    </Menu>
  )
}
