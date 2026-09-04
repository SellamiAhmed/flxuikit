import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table as TanTable
} from '@tanstack/react-table';

import type { BoxProps } from '../../primitive/index.js';

import type { ProTableFeatures } from './features.js';
import type { TablePaginationProps } from './ProTablePagination.js';
import type { useProTable } from './useProTable.js'; // NEW

export interface ProTableProps<TData extends Record<string, any>> {
  data: TData[]
  columns: ColumnDef<ProTableFeatures, TData, any>[]

  // NEW — pass a table instance you built yourself via useProTable(),
  // e.g. when ProTableToolbar also needs it. If omitted, ProTable
  // builds its own internally exactly as before.
  table?: ReturnType<typeof useProTable<TData>>

  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>

  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>
  manualFiltering?: boolean
  rowCount?: number
  manualSorting?: boolean
  manualPagination?: boolean
  enableSorting?: boolean
  enableExpanding?: boolean
  enableRowVirtualization?: boolean
  getSubRows?: (row: TData) => TData[] | undefined
  expanded?: ExpandedState
  onExpandedChange?: OnChangeFn<ExpandedState>
  enableRowSelection?: boolean
  enableMultiRowSelection?: boolean
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  loading?: boolean
  skeletonRowCount?: number
  emptyMessage?: string
  errorMessage?: string
  hidePagination?: boolean
  withBorder?: boolean
  stickyHeader?: boolean
  onRowClick?: (row: TData) => void
  rowKey?: (row: TData, index: number) => string | number

  paginationProps?: TablePaginationProps
  wrapperProps?: BoxProps
  className?: string

}

export type { TanTable };
