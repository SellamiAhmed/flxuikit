import clsx from 'clsx'
import React from 'react'

import { Dot } from '../../primitive/Dot/index.js'
import { Badge, BadgeProps } from '../../primitive/index.js'
import type { Color } from '../../theme/index.js'

import classes from './index.module.css'

const DOT_SIZE_BY_BADGE_SIZE: Record<NonNullable<BadgeProps['size']>, number> = {
  xs: 6,
  sm: 7,
  md: 8,
  lg: 9,
  xl: 10
}

const ICON_SIZE_CLASS_BY_BADGE_SIZE: Record<NonNullable<BadgeProps['size']>, string> = {
  xs: classes.iconXs,
  sm: classes.iconSm,
  md: classes.iconMd,
  lg: classes.iconLg,
  xl: classes.iconXl
}

export interface DotBadgeProps extends Omit<BadgeProps, 'variant' | 'leftSection'> {
  color?: Color
  /** Adds a subtle pulsing animation to the dot — e.g. for "Live" status. Ignored if `icon` is set. */
  pulse?: boolean
  /**
   * Optional icon to render instead of the colored dot — e.g. a status icon,
   * platform logo, or category icon. Sizing is applied automatically to
   * match the badge size.
   */
  icon?: React.ReactNode
}

export const DotBadge: React.FC<DotBadgeProps> = ({
  color = 'success',
  size = 'md',
  pulse,
  icon,
  children,
  ...rest
}) => {
  const dotSize = DOT_SIZE_BY_BADGE_SIZE[size] ?? 8
  const iconSizeClass = ICON_SIZE_CLASS_BY_BADGE_SIZE[size] ?? classes.iconMd

  const left = icon ? (
    <span className={clsx(classes.iconWrapper, iconSizeClass)}>{icon}</span>
  ) : (
    <Dot color={color} size={dotSize} pulse={pulse} />
  )

  return (
    <Badge variant="light" color={color} size={size} leftSection={left} {...rest}>
      {children}
    </Badge>
  )
}
