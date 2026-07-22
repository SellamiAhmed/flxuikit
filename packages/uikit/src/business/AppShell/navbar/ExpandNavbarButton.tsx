import { IconChevronRight, IconLayout, IconLayoutSidebar } from '@tabler/icons-react'
import clsx from 'clsx'

import { ActionIcon, Box } from '../../../primitive/index.js'

import classes from './index.module.css'

interface ExpandNavbarButtonProps {
  logo?: React.ReactNode
  onClick?: () => void
}

export const ExpandNavbarButton = ({ logo, onClick }: ExpandNavbarButtonProps) => {
  return (
    <Box className={classes.expandNavbarButtonWrap}>
      {logo && <Box className={classes.expandNavbarButtonLogo}>{logo}</Box>}
      <ActionIcon
        type="button"
        variant="subtle"
        className={classes.expandNavbarButton}
        aria-label="Expand sidebar"
        onClick={onClick}
      >
        <IconLayoutSidebar size={16} />
      </ActionIcon>
    </Box>
  )
}
