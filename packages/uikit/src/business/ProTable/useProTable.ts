import type { ColumnFiltersState, ExpandedState, PaginationState, SortingState } from '@tanstack/react-table';
import { useTable } from '@tanstack/react-table';
import { useState } from 'react';

import type { ProTableFeatures } from './features.js'; // ADD THIS LINE
import { proTableFeatures } from './features.js';
import type { ProTableProps } from './types.js';

export function useProTable<TData extends Record<string, any>>(props: ProTableProps<TData>) {
  const {
    data,
    columns,
    sorting: controlledSorting,
    onSortingChange,
    pagination: controlledPagination,
    onPaginationChange,
    columnFilters: controlledColumnFilters,       // ← new
    onColumnFiltersChange,                         // ← new
    manualFiltering = false,
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
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([])  // ← add this

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
    manualFiltering,
    rowCount,
    state: {
      sorting: controlledSorting ?? internalSorting,
      pagination: controlledPagination ?? internalPagination,
      expanded: controlledExpanded ?? internalExpanded,
      columnFilters: controlledColumnFilters ?? internalColumnFilters,
    },
    onSortingChange: onSortingChange ?? setInternalSorting,
    onPaginationChange: onPaginationChange ?? setInternalPagination,
    onExpandedChange: onExpandedChange ?? setInternalExpanded,
    onColumnFiltersChange: onColumnFiltersChange ?? setInternalColumnFilters,  // ← new
  })
}
