// ProTableSkeleton.tsx
import { Box, Flex, Skeleton } from '../../primitive/index.js'

import styles from './ProTable.module.css'

export interface ProTableSkeletonProps {
  columnCount: number
  rowCount?: number
  filterCount?: number
  withToolbar?: boolean
  withPagination?: boolean
  withBorder?: boolean
  columnWidths?: string[] // e.g. ['180px', 'auto', 'auto'] — mirrors your shrink/grow logic
  className?: string
}

export function ProTableSkeleton({
  columnCount,
  rowCount = 5,
  filterCount = 0,
  withToolbar = false,
  withPagination = true,
  withBorder = true,
  columnWidths,
  className,
}: ProTableSkeletonProps) {
  const widths = Array.from(
    { length: columnCount },
    (_, i) => columnWidths?.[i % (columnWidths?.length || 1)] ?? 'auto',
  )

  return (
    <div className={className}>
      {withToolbar && (
        <div className={styles.toolbar}>
          {Array.from({ length: filterCount }).map((_, i) => (
            <Skeleton key={i} className={styles.filterControl} height={32} />
          ))}
        </div>
      )}

      <Box className={styles.wrapper} data-with-border={withBorder}>
        <Box className={styles.tableContainer}>
          <table className={styles.table}>
            <colgroup>
              {widths.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>

            <thead className={styles.thead}>
              <tr>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <th key={j} className={styles.th}>
                    <Skeleton height={16} width="60%" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <tr key={i} className={styles.tr}>
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <td key={j} className={styles.td}>
                      <Skeleton className={styles.skeletonCell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>

      {withPagination && (
        <Flex align="center" justify="space-between" p="xs">
          <Skeleton height={20} width={100} />
          <Flex align="center" gap="lg">
            <Skeleton height={20} width={140} />
            <Skeleton height={20} width={80} />
            <Flex gap={4}>
              <Skeleton height={28} width={28} radius="xl" />
              <Skeleton height={28} width={28} radius="xl" />
              <Skeleton height={28} width={28} radius="xl" />
              <Skeleton height={28} width={28} radius="xl" />
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  )
}
