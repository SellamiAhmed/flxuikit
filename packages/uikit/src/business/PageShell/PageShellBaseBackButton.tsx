import { IconChevronLeft } from '@tabler/icons-react'
import clsx from 'clsx'

import { ActionIcon, ActionIconProps } from '../../primitive/index.js'

import classes from './PageShellBase.module.css'

export interface PageShellBaseBackButtonProps extends ActionIconProps {
  onClick?: () => void
}

export const PageShellBaseBackButton = ({ className, onClick, ...rest }: PageShellBaseBackButtonProps) => {
  const handleClick = () => {
    if (onClick) onClick()
    else history.back()
  }

  return (
    <ActionIcon
      variant="default"
      onClick={handleClick}
      aria-label="Navigate Back"
      {...rest}
      className={clsx(classes.backButton, className)}
    >
      <IconChevronLeft size={20} />
    </ActionIcon>
  )
}
