import { IconArrowDown, IconArrowUp, IconSwitchVertical } from '@tabler/icons-react'
import type { SortDirection } from '@tanstack/react-table'

import { Avatar } from '../../primitive/index.js'

import styles from './ProTable.module.css'

export function HeaderLabel({
  icon: Icon,
  label,
  sorted
}: {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  sorted?: SortDirection | false
}) {
  return (
    <div className={styles.headerLabel}>
      {Icon && <Icon className={styles.headerIcon} />}
      <span>{label}</span>
      {sorted === 'asc' && <IconArrowUp className={styles.sortIconBtn} data-active="true" />}
      {sorted === 'desc' && <IconArrowDown className={styles.sortIconBtn} data-active="true" />}
      {!sorted && <IconSwitchVertical className={styles.sortIconBtn} />}
    </div>
  )
}

export function PersonCell({
  avatarUrl,
  name,
  subtitle
}: {
  avatarUrl?: string
  name: string
  subtitle: string
}) {
  return (
    <div className={styles.stackWithLeading}>
      <Avatar name={name} src={avatarUrl} size="md" />
      <div className={styles.stack}>
        <span className={styles.primaryText}>{name}</span>
        <span className={styles.secondaryText}>{subtitle}</span>
      </div>
    </div>
  )
}

export function IconStackCell({
  icon: Icon,
  primary,
  secondary
}: {
  icon?: React.ComponentType<{ className?: string }>
  primary: string
  secondary?: string
}) {
  return (
    <div className={styles.stack}>
      <span className={styles.secondaryText}>
        {Icon && <Icon className={styles.inlineIcon} />}
        {primary}
      </span>
      {secondary && <span className={styles.secondaryText}>{secondary}</span>}
    </div>
  )
}

export function CountryCell({ flagUrl, country, city }: { flagUrl: string; country: string; city: string }) {
  return (
    <div className={styles.stackWithLeading}>
      <img src={flagUrl} alt="" className={styles.flagIcon} />
      <div className={styles.stack}>
        <span className={styles.primaryText}>{country}</span>
        <span className={styles.secondaryText}>{city}</span>
      </div>
    </div>
  )
}

export function ActionsCell({
  onEdit,
  onDelete,
  editIcon: EditIcon,
  deleteIcon: DeleteIcon,
  dragIcon: DragIcon
}: {
  onEdit?: () => void
  onDelete?: () => void
  editIcon: React.ComponentType<{ className?: string }>
  deleteIcon: React.ComponentType<{ className?: string }>
  dragIcon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className={styles.actionsCell}>
      <button className={styles.actionButton} onClick={onEdit}>
        <EditIcon className={styles.actionButtonIcon} />
        Edit
      </button>
      <button className={styles.actionButton} data-variant="danger" onClick={onDelete}>
        <DeleteIcon className={styles.actionButtonIcon} />
        Delete
      </button>
      {DragIcon && (
        <span className={styles.dragHandle}>
          <DragIcon className={styles.actionButtonIcon} />
        </span>
      )}
    </div>
  )
}
