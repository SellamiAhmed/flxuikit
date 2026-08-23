import type { ExpandedState, PaginationState, SortingState } from '@tanstack/react-table'
import { useTable } from '@tanstack/react-table'
import { useState } from 'react'

import { proTableFeatures, type ProTableFeatures } from './features.js'
import type { ProTableProps } from './types.js'

export function useProTable<TData extends Record<string, any>>(props: ProTableProps<TData>) {
  const {
    data,
    columns,
    sorting: controlledSorting,
    onSortingChange,
    pagination: controlledPagination,
    onPaginationChange,
    rowCount,
    manualSorting = false,
    manualPagination = false,
    enableSorting = true,
    enableExpanding = false,
    getSubRows,
    expanded: controlledExpanded,
    onExpandedChange,
    rowKey
  } = props

  const [internalSorting, setInternalSorting] = useState<SortingState>([])
  const [internalPagination, setInternalPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [internalExpanded, setInternalExpanded] = useState<ExpandedState>({})

  return useTable<ProTableFeatures, TData>({
    features: proTableFeatures,
    data,
    columns,
    getRowId: rowKey ? (row: TData, i: number) => String(rowKey(row, i)) : undefined,
    getSubRows,
    enableSorting,
    enableExpanding,
    manualSorting,
    manualPagination,
    rowCount,
    state: {
      sorting: controlledSorting ?? internalSorting,
      pagination: controlledPagination ?? internalPagination,
      expanded: controlledExpanded ?? internalExpanded
    },
    onSortingChange: onSortingChange ?? setInternalSorting,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    onExpandedChange: onExpandedChange ?? setInternalExpanded
  })
}
