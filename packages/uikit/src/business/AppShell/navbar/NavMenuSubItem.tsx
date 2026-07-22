import clsx from 'clsx'

import { Anchor, Box } from '../../../primitive/index.js'

import classes from './index.module.css'

export interface NavMenuSubItemProps {
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}

export const NavMenuSubItem = ({ label, href, active, onClick }: NavMenuSubItemProps) => {
  return (
    <Box component="li" className={classes.childItem}>
      <Anchor
        className={clsx(classes.childLink, active && classes.active)}
        href={href}
        underline="never"
        onClick={onClick}
      >
        {label}
      </Anchor>
    </Box>
  )
}
