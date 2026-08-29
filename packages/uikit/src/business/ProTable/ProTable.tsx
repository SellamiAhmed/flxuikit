import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { flexRender, type Row } from '@tanstack/react-table'
import clsx from 'clsx'

import { Box, Skeleton } from '../../primitive/index.js'

import type { ProColumnMeta } from './cells.js'
import type { ProTableFeatures } from './features.js'; // ADD THIS LINE
import styles from './ProTable.module.css'
import { ProTableColumnHeader } from './ProTableColumnHeader.js'; // ← this line, in ProTable.tsx
import { ProTablePagination } from './ProTablePagination.js'
import type { ProTableProps } from './types.js'
import { useProTable } from './useProTable.js'

const SHRINK_COLUMN_WIDTH = 180 // px reserved for shrink columns (e.g. Actions)

export function ProTable<TData extends Record<string, any>>(props: ProTableProps<TData>) {
  const {
    loading = false,
    skeletonRowCount = 5,
    emptyMessage = 'No records to display',
    errorMessage,
    withBorder = true,
    stickyHeader = false,
    onRowClick,
    wrapperProps,
    className,
    enableExpanding = false,
    paginationProps,
    hidePagination = false,
  } = props

  const internalTable = useProTable(props)
  const table = props.table ?? internalTable
  const rows = table.getRowModel().rows
  const leafColumns = table.getAllLeafColumns()
  const columnCount = leafColumns.length
  const showPagination = !hidePagination && (!!paginationProps || table.state.pagination.pageSize > 0)
  // Deterministic column widths, computed once from meta — not from
  // TanStack's columnSizingFeature defaults, which can't be trusted to
  // stay `undefined` for "no explicit size" the way earlier logic assumed.
  const SHRINK_COLUMN_WIDTH = 180

  const shrinkCount = leafColumns.filter((col) => (col.columnDef.meta as ProColumnMeta | undefined)?.shrink).length
  const growCount = columnCount - shrinkCount
  const totalShrinkWidth = shrinkCount * SHRINK_COLUMN_WIDTH

  // was: `${100 / growCount}%` — wrong, ignores the pixel-fixed columns entirely
  const growColumnWidth = growCount > 0 ? `calc((100% - ${totalShrinkWidth}px) / ${growCount})` : '100%'

  return (
    <Box className={clsx(styles.wrapper, className)} data-with-border={withBorder} {...wrapperProps}>
      <Box className={styles.tableContainer}>
        <table className={styles.table}>
          <colgroup>
            {leafColumns.map((col) => {
              const shrink = (col.columnDef.meta as ProColumnMeta | undefined)?.shrink
              return (
                <col
                  key={col.id}
                  style={shrink ? { width: SHRINK_COLUMN_WIDTH } : { width: growColumnWidth }}
                />
              )
            })}
          </colgroup>

          <thead className={styles.thead} data-sticky={stickyHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as ProColumnMeta | undefined
                  const shrink = meta?.shrink

                  return (
                    <th key={header.id} className={styles.th} data-shrink={shrink ? 'true' : undefined}>
                      {header.isPlaceholder ? null : (
                        <ProTableColumnHeader
                          column={header.column}
                          label={meta?.label ?? header.column.id}
                          icon={meta?.icon}
                        />
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: skeletonRowCount }).map((_, i) => (
                <tr key={`skeleton-${i}`} className={styles.tr}>
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <td key={j} className={styles.td}>
                      <Skeleton className={styles.skeletonCell} />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={columnCount} className={styles.emptyState}>
                  {errorMessage ?? emptyMessage}
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((row: Row<ProTableFeatures, TData>) => (
                <tr
                  key={row.id}
                  className={styles.tr}
                  data-clickable={!!onRowClick}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isExpandCell = enableExpanding && cell.column.id === row.getVisibleCells()[0]?.column.id
                    const meta = cell.column.columnDef.meta as ProColumnMeta | undefined
                    const shrink = meta?.shrink

                    return (
                      <td key={cell.id} className={styles.td} data-shrink={shrink ? 'true' : undefined}>
                        {isExpandCell && row.getCanExpand() ? (
                          <div
                            className={styles.expandCell}
                            style={{ paddingLeft: row.depth * 20 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              row.toggleExpanded()
                            }}
                          >
                            {row.getIsExpanded() ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </Box>

      {showPagination && !loading && rows.length > 0 && (
        <ProTablePagination table={table} {...paginationProps} />
      )}
    </Box>
  )
}
