import { IconBell } from '@tabler/icons-react'

import { ActionIcon, Menu } from '../../primitive/index.js'

import classes from './PageShellNotificationBell.module.css'

export interface PageShellNotificationBellProps {
  count?: number
  icon?: React.ReactNode
  ariaLabel?: string
  onClick?: () => void
  menuItems?: React.ReactNode
  menuWidth?: number
}

export const PageShellNotificationBell = ({
  count,
  icon,
  ariaLabel = 'Notifications',
  onClick,
  menuItems,
  menuWidth = 280
}: PageShellNotificationBellProps) => {
  const hasBadge = count !== undefined && count > 0
  const label = hasBadge ? `${ariaLabel} (${count})` : ariaLabel

  const bellContent = (
    <span className={classes.inner}>
      {icon ?? <IconBell size={16} stroke={1} aria-hidden="true" />}
      {hasBadge && (
        <span className={classes.badgeCount} aria-hidden="true">
          {count > 99 ? '99+' : count}
        </span>
      )}
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
