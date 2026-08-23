import type {
    ColumnDef,
    ExpandedState,
    OnChangeFn,
    PaginationState,
    SortingState,
    Table as TanTable
} from '@tanstack/react-table'

import type { BoxProps } from '../../primitive/index.js'

import type { ProTableFeatures } from './features.js'
import type { TablePaginationProps } from './ProTablePagination.js'

export interface ProTableProps<TData extends Record<string, any>> {
  data: TData[]
  columns: ColumnDef<ProTableFeatures, TData, any>[]

  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  rowCount?: number

  manualSorting?: boolean
  manualPagination?: boolean
  enableSorting?: boolean
  enableExpanding?: boolean
  enableRowVirtualization?: boolean
  getSubRows?: (row: TData) => TData[] | undefined
  expanded?: ExpandedState
  onExpandedChange?: OnChangeFn<ExpandedState>

  loading?: boolean
  skeletonRowCount?: number
  emptyMessage?: string
  errorMessage?: string

  withBorder?: boolean
  stickyHeader?: boolean
  onRowClick?: (row: TData) => void
  rowKey?: (row: TData, index: number) => string | number

  paginationProps?: TablePaginationProps
  wrapperProps?: BoxProps
  className?: string
}

export type { TanTable }
