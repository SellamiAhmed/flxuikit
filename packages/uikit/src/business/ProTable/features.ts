import {
  columnFilteringFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures
} from '@tanstack/react-table'

export const proTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  rowExpandingFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  rowSelectionFeature,
  columnFilteringFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  filteredRowModel: createFilteredRowModel()
})

// ADD THIS LINE — nothing else in the file changes
export type ProTableFeatures = typeof proTableFeatures
