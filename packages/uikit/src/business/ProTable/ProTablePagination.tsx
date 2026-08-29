import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight
} from '@tabler/icons-react'

import { ActionIcon, Flex, Select, Text, type FlexProps } from '../../primitive/index.js'

import styles from './ProTable.module.css'
import type { useProTable } from './useProTable.js'

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25, 30, 50, 100]

export interface TablePaginationProps {
  pageSizeOptions?: number[]
  showRowsPerPage?: boolean
  showTotal?: boolean
  showSelectedCount?: boolean
  wrapperProps?: FlexProps
  localization?: {
    total?: string
    rowsPerPage?: string
    pageOf?: (current: number, total: number) => string
    rowsSelected?: (selected: number, total: number) => string
  }
}

interface ProTablePaginationProps<TData extends Record<string, any>> extends TablePaginationProps {
  table: ReturnType<typeof useProTable<TData>>
}

export function ProTablePagination<TData extends Record<string, any>>({
  table,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showRowsPerPage = false,
  showTotal = false,
  showSelectedCount = false,
  localization,
  wrapperProps
}: ProTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const numberOfPages = table.getPageCount()
  const currentPage = pageIndex + 1

  // getFilteredRowModel reflects post-filter, client-side count. In manual/server
  // mode the server already filtered, so this equals `data.length` as given —
  // use getRowCount() instead if you need the true server-reported total.
  const filteredRowCount = table.getFilteredRowModel().rows.length
  const totalRowCount = table.getRowCount()

  // getSelectedRowModel only exists once rowSelectionFeature is enabled on
  // proTableFeatures — guard defensively until that feature is added.
  const selectedCount = table.getFilteredSelectedRowModel().rows.length

  const canPreviousPage = table.getCanPreviousPage()
  const canNextPage = table.getCanNextPage()

  const rowsPerPageData = pageSizeOptions.map((n) => ({ value: n.toString(), label: n.toString() }))

  return (
    <Flex align="center" justify="space-between" p="xs" wrap="wrap" gap="sm" {...wrapperProps}>
      <Text c="carbon.7" size="sm">
        {showSelectedCount
          ? (localization?.rowsSelected?.(selectedCount, filteredRowCount) ??
            `${selectedCount} of ${filteredRowCount} row(s) selected.`)
          : showTotal
            ? `${localization?.total ?? 'Total:'} ${totalRowCount.toLocaleString()}`
            : null}
      </Text>

      <Flex align="center" gap="lg" wrap="wrap">
        {showRowsPerPage && (
          <Flex align="center" gap="xs">
            <Text c="carbon.7" size="sm">
              {localization?.rowsPerPage ?? 'Rows per page'}
            </Text>
            <Select
              w={70}
              size="sm"
              allowDeselect={false}
              data={rowsPerPageData}
              value={pageSize.toString()}
              onChange={(v) => v && table.setPageSize(+v)}
            />
          </Flex>
        )}

        <Text c="carbon.8" size="sm">
          {localization?.pageOf?.(currentPage, numberOfPages) ?? `Page ${currentPage} of ${numberOfPages}`}
        </Text>

        <Flex align="center" gap={4}>
          <ActionIcon
            variant="default"
            size="sm"
            radius="xl"
            className={styles.paginationEdgeButton}
            disabled={!canPreviousPage}
            onClick={() => table.setPageIndex(0)}
            aria-label="First page"
          >
            <IconChevronsLeft size={16} stroke={1.75} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="sm"
            radius="xl"
            disabled={!canPreviousPage}
            onClick={() => table.previousPage()}
            aria-label="Previous page"
          >
            <IconChevronLeft size={16} stroke={1.75} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="sm"
            radius="xl"
            disabled={!canNextPage}
            onClick={() => table.nextPage()}
            aria-label="Next page"
          >
            <IconChevronRight size={16} stroke={1.75} />
          </ActionIcon>
          <ActionIcon
            variant="default"
            size="sm"
            radius="xl"
            className={styles.paginationEdgeButton}
            disabled={!canNextPage}
            onClick={() => table.setPageIndex(numberOfPages - 1)}
            aria-label="Last page"
          >
            <IconChevronsRight size={16} stroke={1.75} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Flex>
  )
}
