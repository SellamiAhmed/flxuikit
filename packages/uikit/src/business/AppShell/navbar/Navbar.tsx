import clsx from 'clsx'

import { Box } from '../../../primitive/index.js'

import classes from './index.module.css'

interface NavbarProps {
  children: React.ReactNode
  hidden?: boolean
  collapsed?: boolean
  withBorder?: boolean
  className?: string
}

export const Navbar = ({ children, hidden, collapsed, withBorder, className }: NavbarProps) => {
  return (
    <div
      className={clsx(classes.navbarWrapper, hidden && classes.navbarWrapperHidden)}
      data-hidden={hidden || undefined}
    >
      <Box
        component="nav"
        className={clsx(classes.navbar, withBorder && classes.withBorder, className)}
        data-hidden={hidden || undefined}
      >
        {children}
      </Box>
    </div>
  )
}
