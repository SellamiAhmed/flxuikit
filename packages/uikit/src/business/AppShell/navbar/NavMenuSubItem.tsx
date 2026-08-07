import clsx from 'clsx'

import { Anchor, Box } from '../../../primitive/index.js'

import classes from './index.module.css'

export interface NavMenuSubItemLinkRenderProps {
  className: string
  'aria-disabled'?: boolean
  tabIndex?: number
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
}

export interface NavMenuSubItemProps {
  label: string
  href?: string
  /**
   * Escape hatch for router-driven links (e.g. TanStack Router's `Link`).
   * When provided, this fully replaces the internal `<Anchor>` — `href` is
   * ignored when `renderLink` is set. See NavMenuItem for the same pattern.
   */
  renderLink?: (linkProps: NavMenuSubItemLinkRenderProps) => React.ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const NavMenuSubItem = ({ label, href, renderLink, active, disabled, onClick }: NavMenuSubItemProps) => {
  const className = clsx(classes.childLink, active && classes.active, disabled && classes.disabled)

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.()
  }

  return (
    <Box component="li" className={classes.childItem}>
      {renderLink ? (
        (renderLink({
          className,
          'aria-disabled': disabled || undefined,
          tabIndex: disabled ? -1 : undefined,
          onClick: handleClick,
          children: label
        }) as React.ReactElement)
      ) : (
        <Anchor
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          className={className}
          underline="never"
          onClick={handleClick}
        >
          {label}
        </Anchor>
      )}
    </Box>
  )
}
