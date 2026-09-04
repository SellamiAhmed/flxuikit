import type { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '../../primitive/index.js'

import type { ProColumnMeta } from './cells.js'
import type { ProTableFeatures } from './features.js'
/**
 * Meta for the checkbox column. Reuses `shrink` for width-calc purposes
 * (ProTable.tsx special-cases `selection: true` to a narrower fixed width
 * than the standard 180px shrink columns — see CHECKBOX_COLUMN_WIDTH there).
 */
export function selectionColumnMeta(): ProColumnMeta {
  return { shrink: true, selection: true }
}
/**
 * Drop this into your `columns` array (usually first) to get a checkbox
 * column wired to TanStack v9's row-selection APIs. Requires
 * `enableRowSelection` (and optionally `enableMultiRowSelection`) to be
 * passed to `useProTable`/`ProTable` — see types.ts / useProTable.ts.
 *
 * @example
 * const columns = [
 *   createSelectionColumn<User>(),
 *   { accessorKey: 'name', meta: { label: 'Name' } },
 *   // ...
 * ]
 *
 * <ProTable data={data} columns={columns} enableRowSelection />
 */
export function createSelectionColumn<
  TData extends Record<string, any>
>(): ColumnDef<ProTableFeatures, TData, unknown> {
  return {
    id: 'select',
    meta: selectionColumnMeta(),
    enableSorting: false,
    enableHiding: false,
    // NOTE: no `enableResizing` here — that property belongs to TanStack's
    // column-resizing feature, which isn't included in proTableFeatures
    // (only columnSizingFeature is, which is a different, unrelated feature
    // that governs width, not drag-to-resize). Setting it throws TS2353
    // since ColumnDef<ProTableFeatures, ...> doesn't know that property.
    // If columnResizingFeature is ever added to proTableFeatures, add
    // `enableResizing: false` back here — checkbox columns shouldn't be
    // user-resizable.
    header: ({ table }) => {
      const allSelected = table.getIsAllRowsSelected()
      const someSelected = table.getIsSomeRowsSelected()
      return (
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected && !allSelected}
          onChange={(e) => table.toggleAllRowsSelected(e.currentTarget.checked)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select all rows"
        />
      )
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        // Only meaningful for parent rows with sub-rows (expanding + selection
        // combined) — some TanStack versions omit getIsSomeSelected() on Row
        // when expanding isn't enabled, hence the optional chaining.
        indeterminate={row.getIsSomeSelected?.() ?? false}
        onChange={row.getToggleSelectedHandler()}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Select row ${row.id}`}
      />
    )
  }
}
