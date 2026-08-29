import { IconCalendar, IconX } from '@tabler/icons-react'
import type { Column } from '@tanstack/react-table'
import { useState } from 'react'

import {
    ActionIcon,
    Button,
    DatePicker,
    MultiSelect,
    Popover,
    Select,
    TextInput
} from '../../primitive/index.js'

import type { ProColumnMeta } from './cells.js'
import type { ProTableFeatures } from './features.js'
import styles from './ProTable.module.css'

interface ColumnFilterInputProps<TData extends Record<string, any>> {
  column: Column<ProTableFeatures, TData, unknown>
}

export function ColumnFilterInput<TData extends Record<string, any>>({ column }: ColumnFilterInputProps<TData>) {
  const meta = (column.columnDef.meta as ProColumnMeta | undefined)?.filter
  const [opened, setOpened] = useState(false)

  if (!meta) return null

  switch (meta.variant) {
    case 'text':
      return (
        <TextInput
          placeholder={meta.placeholder ?? meta.label}
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.currentTarget.value || undefined)}
          size="sm"
          className={styles.filterControl}
        />
      )

    case 'number':
      return (
        <TextInput
          type="number"
          inputMode="numeric"
          placeholder={meta.placeholder ?? meta.label}
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(e) => column.setFilterValue(e.currentTarget.value || undefined)}
          size="sm"
          rightSection={meta.unit ? <span className={styles.filterUnit}>{meta.unit}</span> : undefined}
          className={styles.filterControl}
        />
      )

    case 'boolean':
      return (
        <Select
          placeholder={meta.label}
          data={[
            { value: 'true', label: 'True' },
            { value: 'false', label: 'False' },
          ]}
          value={(column.getFilterValue() as string) ?? null}
          onChange={(v) => column.setFilterValue(v ?? undefined)}
          size="sm"
          clearable
          className={styles.filterControl}
        />
      )

    case 'select':
      return (
        <Select
          placeholder={meta.placeholder ?? meta.label}
          data={meta.options?.map((o) => ({ value: o.value, label: o.label })) ?? []}
          value={(column.getFilterValue() as string[] | undefined)?.[0] ?? null}
          onChange={(v) => column.setFilterValue(v ? [v] : undefined)}
          size="sm"
          clearable
          searchable
          className={styles.filterControl}
        />
      )

    case 'multiSelect':
      return (
        <MultiSelect
          placeholder={meta.placeholder ?? meta.label}
          data={meta.options?.map((o) => ({ value: o.value, label: o.label })) ?? []}
          value={(column.getFilterValue() as string[]) ?? []}
          onChange={(v) => column.setFilterValue(v.length ? v : undefined)}
          size="sm"
          clearable
          searchable
          className={styles.filterControl}
        />
      )

    /* ── date: day-only, calendar popover + clear, no time-of-day ── */
    case 'date': {
      const filterValue = column.getFilterValue() as number | undefined
      const selectedDate = filterValue ? new Date(filterValue) : null

      return (
        <Popover opened={opened} onChange={setOpened} withinPortal shadow="md">
          <Popover.Target>
            <Button
              variant="default"
              size="sm"
              className={styles.filterControl}
              leftSection={
                filterValue ? (
                  <ActionIcon
                    variant="transparent"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      column.setFilterValue(undefined)
                    }}
                  >
                    <IconX size={14} />
                  </ActionIcon>
                ) : (
                  <IconCalendar size={14} />
                )
              }
              onClick={() => setOpened((o) => !o)}
            >
              {selectedDate ? selectedDate.toLocaleDateString() : meta.placeholder ?? meta.label}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker
              value={selectedDate}
              onChange={(d) => {
                column.setFilterValue(d ? d.getTime() : undefined)
                setOpened(false)
              }}
            />
          </Popover.Dropdown>
        </Popover>
      )
    }

    /* ── dateRange: calendar in range mode, not TimeRangePicker ── */
    case 'dateRange': {
      const filterValue = column.getFilterValue() as [number, number] | undefined
      const rangeValue: [Date | null, Date | null] = filterValue
        ? [new Date(filterValue[0]), new Date(filterValue[1])]
        : [null, null]

      const label =
        rangeValue[0] && rangeValue[1]
          ? `${rangeValue[0].toLocaleDateString()} - ${rangeValue[1].toLocaleDateString()}`
          : meta.placeholder ?? meta.label

      return (
        <Popover opened={opened} onChange={setOpened} withinPortal shadow="md">
          <Popover.Target>
            <Button
              variant="default"
              size="sm"
              className={styles.filterControl}
              leftSection={
                filterValue ? (
                  <ActionIcon
                    variant="transparent"
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      column.setFilterValue(undefined)
                    }}
                  >
                    <IconX size={14} />
                  </ActionIcon>
                ) : (
                  <IconCalendar size={14} />
                )
              }
              onClick={() => setOpened((o) => !o)}
            >
              {label}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker
              type="range"
              value={rangeValue}
              onChange={(range) => {
                const [start, end] = range
                column.setFilterValue(start && end ? [start.getTime(), end.getTime()] : undefined)
              }}
            />
          </Popover.Dropdown>
        </Popover>
      )
    }

    case 'range':
      return null // still needs a RangeSlider primitive — confirm if you have one

    default:
      return null
  }
}
