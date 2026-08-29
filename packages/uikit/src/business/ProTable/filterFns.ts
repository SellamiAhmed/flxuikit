import type { FilterFn } from '@tanstack/react-table'

import type { ProColumnFilterMeta } from './cells.js'
import type { ProTableFeatures } from './features.js'

const dateEquals: FilterFn<ProTableFeatures, any> = (row, columnId, filterValue) => {
  if (!filterValue) return true
  const cellValue = row.getValue(columnId)
  const cellDate = cellValue instanceof Date ? cellValue : new Date(cellValue as string | number)
  const filterDate = new Date(Number(filterValue))
  if (Number.isNaN(cellDate.getTime()) || Number.isNaN(filterDate.getTime())) return true
  return cellDate.toDateString() === filterDate.toDateString()
}

const dateRangeBetween: FilterFn<ProTableFeatures, any> = (row, columnId, filterValue) => {
  const [start, end] = (filterValue as [number | undefined, number | undefined]) ?? []
  if (!start && !end) return true
  const cellValue = row.getValue(columnId)
  const cellDate = cellValue instanceof Date ? cellValue : new Date(cellValue as string | number)
  if (Number.isNaN(cellDate.getTime())) return true
  const time = cellDate.getTime()
  if (start && time < start) return false
  if (end && time > end) return false
  return true
}

export function getFilterFn(
  variant: ProColumnFilterMeta['variant']
): FilterFn<ProTableFeatures, any> | string | undefined {
  switch (variant) {
    case 'select':
    case 'multiSelect':
      return 'arrIncludesSome'
    case 'boolean':
      return 'equals'
    case 'number':
    case 'range':
      return 'inNumberRange'
    case 'date':
      return dateEquals
    case 'dateRange':
      return dateRangeBetween
    case 'text':
    default:
      return 'includesString'
  }
}
