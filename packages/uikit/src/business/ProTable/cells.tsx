import { IconArrowDown, IconArrowUp, IconSwitchVertical } from '@tabler/icons-react'
import type { SortDirection } from '@tanstack/react-table'

import { Avatar, resolveDisplayName, type AvatarNameInput, type AvatarStatus } from '../../primitive/index.js'

import styles from './ProTable.module.css'

export interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface ProColumnFilterMeta {
  label: string
  variant: 'text' | 'number' | 'range' | 'date' | 'dateRange' | 'boolean' | 'select' | 'multiSelect'
  options?: FilterOption[]
  placeholder?: string
  unit?: string
}

export interface ProColumnMeta {
  shrink?: boolean
  /** Marks this as the checkbox/row-selection column. ProTable.tsx gives it
   *  a narrower fixed width (44px, via .checkboxCell) instead of the regular
   *  180px shrink width, and skips the sort/hide header menu for it.
   *  Set via `selectionColumnMeta()` in selectionColumn.tsx. */
  selection?: boolean
  noEllipsis?: boolean
  label?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  filter?: ProColumnFilterMeta
}

export function actionsColumnMeta(): ProColumnMeta {
  return { shrink: true }
}

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

/* ── Single-line primary + muted secondary, joined by a dot ── */
export function InlinePair({ primary, secondary }: { primary: React.ReactNode; secondary?: React.ReactNode }) {
  return (
    <span className={styles.inlineRow}>
      <span className={styles.primaryTextInline}>{primary}</span>
      {secondary && (
        <>
          <span className={styles.dotSep} aria-hidden="true">·</span>
          <span className={styles.secondaryTextInline}>{secondary}</span>
        </>
      )}
    </span>
  )
}

export function PersonCell({
  avatarUrl,
  name,
  subtitle,
  status,
  withTooltip
}: {
  avatarUrl?: string

  name: AvatarNameInput
  subtitle: string
  status?: AvatarStatus
  withTooltip?: boolean
}) {
  const displayName = resolveDisplayName(name) || 'Unknown user'

  return (
    <div className={styles.stackWithLeading}>
      <Avatar name={displayName} src={avatarUrl} size="sm" status={status} withTooltip={withTooltip} />
      <InlinePair primary={displayName} secondary={subtitle} />
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
    <div className={styles.stackWithLeading}>
      {Icon && <Icon className={styles.inlineIcon} />}
      <InlinePair primary={primary} secondary={secondary} />
    </div>
  )
}

export function CountryCell({ flagUrl, country, city }: { flagUrl: string; country: string; city: string }) {
  return (
    <div className={styles.stackWithLeading}>
      <img src={flagUrl} alt="" className={styles.flagIcon} />
      <InlinePair primary={country} secondary={city} />
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
