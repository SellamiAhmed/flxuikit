import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react'

import { Flex, Pagination, Select, Text, type ComboboxData, type FlexProps, type PaginationProps } from '../../primitive/index.js'

import type { useProTable } from './useProTable.js'

const defaultRowsPerPage: ComboboxData = [5, 10, 15, 20, 25, 30, 50, 100].map((x) => ({
  value: x.toString(),
  label: `${x} / page`
}))

export interface TablePaginationProps extends Partial<PaginationProps> {
  rowsPerPageOptions?: ComboboxData
  showRowsPerPage?: boolean
  showTotal?: boolean
  wrapperProps?: FlexProps
  localization?: { total?: string }
}

interface ProTablePaginationProps<TData extends Record<string, any>> extends TablePaginationProps {
  table: ReturnType<typeof useProTable<TData>>
}

export function ProTablePagination<TData extends Record<string, any>>({
  table,
  ...props
}: ProTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.state.pagination
  const totalRowCount = table.getRowCount()
  const numberOfPages = table.getPageCount()

  const {
    rowsPerPageOptions = defaultRowsPerPage,
    showRowsPerPage = false,
    showTotal = false,
    withEdges = numberOfPages > 2,
    localization,
    wrapperProps,
    ...rest
  } = props

  return (
    <Flex align="center" justify={showTotal ? 'space-between' : 'flex-end'} p="xs" {...wrapperProps}>
      {showTotal && (
        <Flex align="center" gap={2}>
          <Text c="carbon.7">{localization?.total ?? 'Total:'}</Text>
          <Text c="carbon.8">{totalRowCount.toLocaleString()}</Text>
        </Flex>
      )}
      <Flex align="center" gap="xs">
        <Pagination
          nextIcon={(iconProps) => <IconChevronRight size={16} stroke={1.75} {...iconProps} />}
          previousIcon={(iconProps) => <IconChevronLeft size={16} stroke={1.75} {...iconProps} />}
          firstIcon={(iconProps) => <IconChevronsLeft size={16} stroke={1.75} {...iconProps} />}
          lastIcon={(iconProps) => <IconChevronsRight size={16} stroke={1.75} {...iconProps} />}
          total={numberOfPages}
          value={pageIndex + 1}
          onChange={(p) => table.setPageIndex(p - 1)}
          withEdges={withEdges}
          {...rest}
        />
        {showRowsPerPage && (
          <Select
            w={114}
            size="sm"
            allowDeselect={false}
            data={rowsPerPageOptions}
            value={pageSize.toString()}
            onChange={(v) => v && table.setPageSize(+v)}
          />
        )}
      </Flex>
    </Flex>
  )
}
