import { Indicator, Avatar as MantineAvatar, Tooltip, type AvatarProps as MantineAvatarProps } from '@mantine/core'
import clsx from 'clsx'
import { forwardRef } from 'react'

import {
    AVATAR_SIZES,
    getColorFromString,
    getInitials,
    resolveDisplayName,
    type AvatarColor,
    type AvatarNameInput,
    type AvatarSize
} from './helpers.js'
import styles from './index.module.css'

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

export interface AvatarProps extends Omit<MantineAvatarProps, 'size' | 'color' | 'children' | 'name'> {
  /** Full name string, OR { firstName, lastName } straight from your DB record.
   *  Drives initials fallback AND deterministic color when `color` isn't set. */
  name: AvatarNameInput
  src?: string
  size?: AvatarSize | number
  color?: AvatarColor
  status?: AvatarStatus
  withTooltip?: boolean
  className?: string
}

const STATUS_COLOR_TOKEN: Record<AvatarStatus, string> = {
  online: 'var(--ds-color-background-success-bold)',
  offline: 'var(--ds-color-background-neutral-bold)',
  away: 'var(--ds-color-background-warning-bold)',
  busy: 'var(--ds-color-background-danger-bold)'
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { name, src, size = 'md', color, status, withTooltip = false, className, ...rest },
  ref
) {
  const displayName = resolveDisplayName(name) || 'Unknown user'
  const resolvedSize = typeof size === 'number' ? size : AVATAR_SIZES[size]
  const resolvedColor = color ?? getColorFromString(name)

  const avatar = (
    <MantineAvatar
      ref={ref}
      src={src}
      alt={displayName}
      size={resolvedSize}
      color={resolvedColor}
      className={clsx(styles.root, className)}
      {...rest}
    >
      {getInitials(name)}
    </MantineAvatar>
  )

  const withStatus = status ? (
    <Indicator
      color={STATUS_COLOR_TOKEN[status]}
      size={Math.max(8, resolvedSize * 0.25)}
      offset={resolvedSize * 0.08}
      position="bottom-end"
      withBorder
      className={styles.indicatorWrapper}
    >
      {avatar}
    </Indicator>
  ) : (
    avatar
  )

  if (!withTooltip) return withStatus

  return (
    <Tooltip label={displayName} withArrow openDelay={300}>
      {withStatus}
    </Tooltip>
  )
})
