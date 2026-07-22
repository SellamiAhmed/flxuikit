import { IconChevronLeft, IconLayoutSidebar } from '@tabler/icons-react'
import clsx from 'clsx'

import { ActionIcon, Box } from '../../../primitive/index.js'

import classes from './index.module.css'

interface NavbarHeaderProps {
  logo: React.ReactNode
  logoCollapsed?: React.ReactNode
  collapsed?: boolean
  onLogoClick?: () => void
  onToggleCollapse?: () => void
  onToggleExpand?: () => void
  className?: string
}

export const NavbarHeader = ({
  logo,
  logoCollapsed,
  collapsed,
  onLogoClick,
  onToggleCollapse,
  onToggleExpand,
  className
}: NavbarHeaderProps) => {
  if (collapsed) {
    return (
      <Box className={clsx(classes.railHeader, className)}>
        {logoCollapsed && (
          <Box
            className={classes.railBrand}
            onClick={onLogoClick}
            style={{ cursor: onLogoClick ? 'pointer' : undefined }}
            title="Expand sidebar"
          >
            {logoCollapsed}
          </Box>
        )}
        <ActionIcon
          type="button"
          variant="subtle"
          className={classes.railToggleButton}
          aria-label="Expand sidebar"
          onClick={onToggleExpand}
        >
          <IconLayoutSidebar size={16} />
        </ActionIcon>
      </Box>
    )
  }

  return (
    <Box className={clsx(classes.navbarHeader, className)}>
      <Box
        className={classes.navbarHeaderLogo}
        onClick={onLogoClick}
        style={{ cursor: onLogoClick ? 'pointer' : undefined }}
      >
        {logo}
      </Box>
      {onToggleCollapse && (
        <ActionIcon
          type="button"
          variant="subtle"
          className={classes.collapseToggleButton}
          aria-label="Collapse sidebar"
          onClick={onToggleCollapse}
        >
          <IconLayoutSidebar size={16} />
        </ActionIcon>
      )}
    </Box>
  )
}
