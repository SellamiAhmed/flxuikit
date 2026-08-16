import React from 'react'

import { Dot } from '../../primitive/Dot/index.js'
import { Badge, BadgeProps } from '../../primitive/index.js'
import type { Color } from '../../theme/index.js'

export interface DotBadgeProps extends Omit<BadgeProps, 'color' | 'variant' | 'leftSection'> {
  color?: Color
  /** Adds a subtle pulsing animation to the dot — e.g. for "Live" status. */
  pulse?: boolean
}

export const DotBadge: React.FC<DotBadgeProps> = ({ color = 'success', pulse, children, ...rest }) => {
  return (
    <Badge
      variant="light"
      color={color}
      leftSection={<Dot color={color} size={8} pulse={pulse} />}
      {...rest}
    >
      {children}
    </Badge>
  )
}
