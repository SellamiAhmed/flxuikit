import { IconArrowsSort, IconChevronDown, IconChevronUp, IconEyeOff, IconX } from '@tabler/icons-react'
import type { Column } from '@tanstack/react-table'
import clsx from 'clsx'

import { Menu } from '../../primitive/index.js'

import type { ProTableFeatures } from './features.js'
import styles from './ProTable.module.css'

interface ProTableColumnHeaderProps<TData extends Record<string, any>, TValue> {
  column: Column<ProTableFeatures, TData, TValue>
  label: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  className?: string
}

export function ProTableColumnHeader<TData extends Record<string, any>, TValue>({
  column,
  label,
  className,
  icon: Icon,
}: ProTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort()
  const canHide = column.getCanHide()

  if (!canSort && !canHide) {
    return <div className={className}>{label}</div>
  }

  const sorted = column.getIsSorted()

  return (
    <Menu position="bottom-start" shadow="md" width={140}>
      <Menu.Target>
        <div
          className={clsx(styles.sortableHeader, className)}
          data-state-trigger="true"
          role="button"
          tabIndex={0}
        >
          {Icon && <Icon size={14} />}
          <span>{label}</span>
          {canSort &&
            (sorted === 'desc' ? (
              <IconChevronDown size={14} className={styles.sortIcon} data-active="true" />
            ) : sorted === 'asc' ? (
              <IconChevronUp size={14} className={styles.sortIcon} data-active="true" />
            ) : (
              <IconArrowsSort size={14} className={styles.sortIcon} />
            ))}
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {canSort && (
          <>
            <Menu.Item
              leftSection={<IconChevronUp size={14} />}
              onClick={() => column.toggleSorting(false)}
              data-checked={sorted === 'asc'}
            >
              Asc
            </Menu.Item>
            <Menu.Item
              leftSection={<IconChevronDown size={14} />}
              onClick={() => column.toggleSorting(true)}
              data-checked={sorted === 'desc'}
            >
              Desc
            </Menu.Item>
            {sorted && (
              <Menu.Item leftSection={<IconX size={14} />} onClick={() => column.clearSorting()}>
                Reset
              </Menu.Item>
            )}
          </>
        )}

        {canHide && (
          <Menu.Item leftSection={<IconEyeOff size={14} />} onClick={() => column.toggleVisibility(false)}>
            Hide
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
