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
const CHECKBOX_COLUMN_WIDTH = 44 // px reserved for the row-selection column — matches styles.checkboxCell // ← new

// Deterministic width for any column with a fixed (non-growing) width.
// Returns undefined for normal columns, which split the remaining space.
// selection columns (meta.selection) get the narrower checkbox width;
// shrink columns (meta.shrink, e.g. Actions) get the standard 180px.        // ← new
function getFixedColumnWidth(meta: ProColumnMeta | undefined): number | undefined { // ← new
  if (meta?.selection) return CHECKBOX_COLUMN_WIDTH                                 // ← new
  if (meta?.shrink) return SHRINK_COLUMN_WIDTH                                      // ← new
  return undefined                                                                  // ← new
}                                                                                     // ← new

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
  const leafColumns = table.getVisibleLeafColumns()
  const columnCount = leafColumns.length
  const showPagination = !hidePagination && (!!paginationProps || table.state.pagination.pageSize > 0)
  // Deterministic column widths, computed once from meta — not from
  // TanStack's columnSizingFeature defaults, which can't be trusted to
  // stay `undefined` for "no explicit size" the way earlier logic assumed.
  //
  // Fixed-width columns aren't all the same width anymore (shrink columns
  // are 180px, the selection/checkbox column is 44px), so each column's
  // fixed width is looked up individually via getFixedColumnWidth and
  // summed, instead of `shrinkCount * SHRINK_COLUMN_WIDTH`.                 // ← changed comment
  const fixedWidths = leafColumns.map((col) => getFixedColumnWidth(col.columnDef.meta as ProColumnMeta | undefined)) // ← new
  const fixedCount = fixedWidths.filter((w) => w !== undefined).length                                                // ← new
  const totalFixedWidth = fixedWidths.reduce((sum: number, w) => sum + (w ?? 0), 0)                                   // ← new
  const growCount = columnCount - fixedCount                                                                          // ← changed

  // was: `${100 / growCount}%` — wrong, ignores the pixel-fixed columns entirely
  const growColumnWidth = growCount > 0 ? `calc((100% - ${totalFixedWidth}px) / ${growCount})` : '100%' // ← changed (totalShrinkWidth → totalFixedWidth)

  return (
    <Box className={clsx(styles.wrapper, className)} data-with-border={withBorder} {...wrapperProps}>
      <Box className={styles.tableContainer}>
        <table className={styles.table}>
          <colgroup>
            {leafColumns.map((col, i) => {                                 // ← changed (added index `i`)
              const fixedWidth = fixedWidths[i]                            // ← changed (was: reading `shrink` from meta here)
              return (
                <col
                  key={col.id}
                  style={fixedWidth !== undefined ? { width: fixedWidth } : { width: growColumnWidth }} // ← changed
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
                  const isSelection = meta?.selection // ← new

                  return (
                    <th
                      key={header.id}
                      className={clsx(styles.th, isSelection && styles.checkboxCell)} // ← changed (added clsx + checkboxCell)
                      data-shrink={shrink ? 'true' : undefined}
                    >
                      {header.isPlaceholder ? null : isSelection ? (             // ← changed (added isSelection branch)
                        flexRender(header.column.columnDef.header, header.getContext()) // ← new — renders the "select all" checkbox as-is, skipping the sort/hide menu
                      ) : (
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
                  data-selected={row.getIsSelected?.() ? 'true' : undefined} // ← new — lets you style selected rows via [data-selected='true'] in CSS
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isExpandCell = enableExpanding && cell.column.id === row.getVisibleCells()[0]?.column.id
                    const meta = cell.column.columnDef.meta as ProColumnMeta | undefined
                    const shrink = meta?.shrink
                    const isSelection = meta?.selection // ← new

                    return (
                      <td
                        key={cell.id}
                        className={clsx(styles.td, isSelection && styles.checkboxCell)} // ← changed (added clsx + checkboxCell)
                        data-shrink={shrink ? 'true' : undefined}
                      >
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
