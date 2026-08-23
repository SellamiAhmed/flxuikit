import { Tooltip } from '@mantine/core'
import clsx from 'clsx'

import { Avatar } from './Avatar.js'
import type { AvatarNameInput, AvatarSize } from './helpers.js'
import { AVATAR_SIZES, resolveDisplayName, truncateForGroup } from './helpers.js'
import styles from './index.module.css'

export interface AvatarGroupPerson {
  id: string
  name: AvatarNameInput
  src?: string
}

export interface AvatarGroupProps {
  people: AvatarGroupPerson[]
  max?: number
  size?: AvatarSize
  /** Called when the "+N" overflow chip is clicked — e.g. open a full list popover */
  onOverflowClick?: () => void
}

export function AvatarGroup({ people, max = 4, size = 'sm', onOverflowClick }: AvatarGroupProps) {
  const { visible, overflow } = truncateForGroup(people, max)
  const resolvedSize = AVATAR_SIZES[size]

  if (people.length === 0) return null

  return (
    <div className={styles.group} style={{ '--avatar-overlap': `-${resolvedSize * 0.3}px` } as React.CSSProperties}>
      {visible.map((person) => (
        <Tooltip key={person.id} label={resolveDisplayName(person.name) || 'Unknown user'} withArrow openDelay={200}>
          <div className={styles.groupItem}>
            <Avatar name={person.name} src={person.src} size={size} />
          </div>
        </Tooltip>
      ))}
      {overflow > 0 && (
        <button
          type="button"
          className={clsx(styles.groupItem, onOverflowClick && styles.groupItemClickable)}
          onClick={onOverflowClick}
          disabled={!onOverflowClick}
        >
          <Avatar name={`+${overflow}`} color="neutral" size={size} />
        </button>
      )}
    </div>
  )
}
