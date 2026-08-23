import {
    columnSizingFeature,
    columnVisibilityFeature,
    createExpandedRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    rowExpandingFeature,
    rowPaginationFeature,
    rowSortingFeature,
    tableFeatures
} from '@tanstack/react-table'

export const proTableFeatures = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  rowExpandingFeature,
  columnVisibilityFeature,
  columnSizingFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  expandedRowModel: createExpandedRowModel()
})

export type ProTableFeatures = typeof proTableFeatures
