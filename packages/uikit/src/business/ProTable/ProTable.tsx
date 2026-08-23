import { IconArrowDown, IconArrowUp, IconChevronDown, IconChevronRight, IconSwitchVertical } from '@tabler/icons-react'
import { flexRender, type Row } from '@tanstack/react-table'
import clsx from 'clsx'

import { Box, Skeleton } from '../../primitive/index.js'

import type { ProTableFeatures } from './features.js'
import styles from './ProTable.module.css'
import { ProTablePagination } from './ProTablePagination.js'
import type { ProTableProps } from './types.js'
import { useProTable } from './useProTable.js'

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
    paginationProps
  } = props

  const table = useProTable(props)
  const rows = table.getRowModel().rows
  const columnCount = table.getAllLeafColumns().length
  const showPagination = !!paginationProps || table.state.pagination.pageSize > 0

  return (
    <Box className={clsx(styles.wrapper, className)} data-with-border={withBorder} {...wrapperProps}>
      <Box className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.thead} data-sticky={stickyHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortDir = header.column.getIsSorted()

                  return (
                    <th key={header.id} className={styles.th} style={{ width: header.getSize() }}>
                      {header.isPlaceholder ? null : canSort ? (
                        <div className={styles.sortableHeader} onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortDir === 'asc' && <IconArrowUp className={styles.sortIcon} data-active="true" />}
                          {sortDir === 'desc' && <IconArrowDown className={styles.sortIcon} data-active="true" />}
                          {!sortDir && <IconSwitchVertical className={styles.sortIcon} />}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
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
                    return (
                      <td key={cell.id} className={styles.td}>
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
