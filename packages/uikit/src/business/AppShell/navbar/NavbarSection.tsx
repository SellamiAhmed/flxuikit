import clsx from 'clsx'

import { Box } from '../../../primitive/index.js'

import classes from './index.module.css'

interface NavbarSectionProps {
  children: React.ReactNode
  grow?: boolean
  scrollable?: boolean
  className?: string
}

export const NavbarSection = ({ children, grow, scrollable, className }: NavbarSectionProps) => {
  return (
    <Box
      className={clsx(
        classes.navbarSection,
        grow && classes.navbarSectionGrow,
        scrollable && classes.navbarSectionScrollable,
        className
      )}
    >
      {children}
    </Box>
  )
}
