import { IconBell } from '@tabler/icons-react'

import { Button, Menu } from '../../primitive/index.js'

import classes from './PageShellNotificationBell.module.css'

export interface PageShellNotificationBellProps {
  /** `undefined` hides the bell. `0` shows bell with no badge. `>0` shows count pill. */
  count?: number
  /** Override the bell icon. */
  icon?: React.ReactNode
  /** Accessible label. Auto-appends count when present. */
  ariaLabel?: string
  /** Plain click handler (no dropdown). */
  onClick?: () => void
  /** Mantine Menu dropdown content. When provided, bell opens a menu. */
  menuItems?: React.ReactNode
  /** Dropdown width in px. */
  menuWidth?: number
}

export const PageShellNotificationBell = ({
  count,
  icon,
  ariaLabel = 'Notifications',
  onClick,
  menuItems,
  menuWidth = 280,
}: PageShellNotificationBellProps) => {
  const hasBadge = count !== undefined && count > 0
  const label = hasBadge ? `${ariaLabel} (${count})` : ariaLabel

  const bellContent = (
    <span className={classes.inner}>
      {icon ?? <IconBell size={18} stroke={1.5} aria-hidden="true" />}
      {hasBadge && (
        <span className={classes.badgeCount} aria-hidden="true">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </span>
  )

  // Plain button — no dropdown
  if (!menuItems) {
    return (
      <Button
        variant="subtle"
        size="compact-sm"
        className={classes.trigger}
        aria-label={label}
        onClick={onClick}
      >
        {bellContent}
      </Button>
    )
  }

  // Dropdown — opens BELOW the bell, right-aligned, portaled so it never clips
  return (
    <Menu
      position="bottom-end"
      offset={4}
      width={menuWidth}
      withinPortal
    >
      <Menu.Target>
        <Button
          variant="subtle"
          size="compact-sm"
          className={classes.trigger}
          aria-label={label}
        >
          {bellContent}
        </Button>
      </Menu.Target>
      <Menu.Dropdown className={classes.dropdown}>
        {menuItems}
      </Menu.Dropdown>
    </Menu>
  )
}
