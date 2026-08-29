import { IconX } from '@tabler/icons-react'
import { useCallback, useMemo } from 'react'

import { Button } from '../../primitive/index.js'

import { ColumnFilterInput } from './ColumnFilterInput.js'
import styles from './ProTable.module.css'
import { ProTableSortList } from './ProTableSortList.js'; // ← add
import type { useProTable } from './useProTable.js'

interface ProTableToolbarProps<TData extends Record<string, any>> {
  table: ReturnType<typeof useProTable<TData>>
  showSort?: boolean   // ← optional, default true — lets consumers opt out
}

export function ProTableToolbar<TData extends Record<string, any>>({
  table,
  showSort = true,
}: ProTableToolbarProps<TData>) {
  const isFiltered = table.state.columnFilters.length > 0

  const filterableColumns = useMemo(
    () => table.getAllColumns().filter((col) => (col.columnDef.meta as any)?.filter),
    [table],
  )

  const onReset = useCallback(() => {
    table.resetColumnFilters()
  }, [table])

  if (filterableColumns.length === 0 && !showSort) return null

  return (
    <div className={styles.toolbar}>
      {filterableColumns.map((col) => (
        <ColumnFilterInput key={col.id} column={col} />
      ))}

      {isFiltered && (
        <Button variant="default" size="sm" leftSection={<IconX size={14} />} onClick={onReset}>
          Reset
        </Button>
      )}

      {showSort && <ProTableSortList table={table} />}
    </div>
  )
}
