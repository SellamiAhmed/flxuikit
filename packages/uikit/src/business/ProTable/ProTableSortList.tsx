import { IconArrowsSort, IconTrash } from '@tabler/icons-react'
import type { ColumnSort } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { ActionIcon, Badge, Button, Menu, Select } from '../../primitive/index.js'

import type { useProTable } from './useProTable.js'

interface ProTableSortListProps<TData extends Record<string, any>> {
  table: ReturnType<typeof useProTable<TData>>
  disabled?: boolean
}

export function ProTableSortList<TData extends Record<string, any>>({
  table,
  disabled,
}: ProTableSortListProps<TData>) {
  const [opened, setOpened] = useState(false)
  const sorting = table.state.sorting
  const onSortingChange = table.setSorting

  const { columnLabels, availableColumns } = useMemo(() => {
    const labels = new Map<string, string>()
    const sortingIds = new Set(sorting.map((s) => s.id))
    const available: { id: string; label: string }[] = []

    for (const column of table.getAllColumns()) {
      if (!column.getCanSort()) continue
      const label = (column.columnDef.meta as any)?.label ?? column.id
      labels.set(column.id, label)
      if (!sortingIds.has(column.id)) available.push({ id: column.id, label })
    }

    return { columnLabels: labels, availableColumns: available }
  }, [sorting, table])

  const onSortAdd = useCallback(() => {
    const first = availableColumns[0]
    if (!first) return
    onSortingChange((prev) => [...prev, { id: first.id, desc: false }])
  }, [availableColumns, onSortingChange])

  const onSortUpdate = useCallback(
    (sortId: string, updates: Partial<ColumnSort>) => {
      onSortingChange((prev) => prev.map((s) => (s.id === sortId ? { ...s, ...updates } : s)))
    },
    [onSortingChange],
  )

  const onSortRemove = useCallback(
    (sortId: string) => {
      onSortingChange((prev) => prev.filter((s) => s.id !== sortId))
    },
    [onSortingChange],
  )

  const onSortingReset = useCallback(() => onSortingChange([]), [onSortingChange])

  return (
    <Menu opened={opened} onChange={setOpened} position="bottom-start" width={320} shadow="md">
      <Menu.Target>
        <Button variant="default" size="sm" leftSection={<IconArrowsSort size={14} />} disabled={disabled}>
          Sort
          {sorting.length > 0 && (
            <Badge size="xs" variant="light" color="blue" ml={4} style={{ border: 'none' }}>
              {sorting.length}
            </Badge>
          )}
        </Button>
      </Menu.Target>

      <Menu.Dropdown p="sm">
        {sorting.length === 0 ? (
          <div style={{ fontSize: 13, color: 'var(--ds-color-text-subtlest)', marginBottom: 8 }}>
            No sorting applied
          </div>
        ) : (
          sorting.map((sort) => (
            <div key={sort.id} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
              <Select
                size="xs"
                value={sort.id}
                data={availableColumns
                  .map((c) => ({ value: c.id, label: c.label }))
                  .concat({ value: sort.id, label: columnLabels.get(sort.id) ?? sort.id })}
                onChange={(v) => v && onSortUpdate(sort.id, { id: v })}
              />
              <Select
                size="xs"
                value={sort.desc ? 'desc' : 'asc'}
                data={[
                  { value: 'asc', label: 'Asc' },
                  { value: 'desc', label: 'Desc' },
                ]}
                onChange={(v) => onSortUpdate(sort.id, { desc: v === 'desc' })}
              />
              <ActionIcon
                variant="subtle"
                size="lg"
                color="gray"
                onClick={() => onSortRemove(sort.id)}
                aria-label="Remove sort"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          ))
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Button size="xs" onClick={onSortAdd} disabled={availableColumns.length === 0}>
            Add sort
          </Button>
          {sorting.length > 0 && (
            <Button size="xs" variant="default" onClick={onSortingReset}>
              Reset sorting
            </Button>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}
