import { DatePicker } from '@mantine/dates'
import {
  IconCalendar,
  IconCircleChevronLeft,
  IconCircleChevronRight,
  IconFilter,
  IconSearch
} from '@tabler/icons-react'
import { useState } from 'react'

import { Button, Divider, Group, Popover, Select, TextInput } from '../../primitive/index.js'

import classes from './CalendarToolbar.module.css'

export type CalendarViewMode = 'day' | 'week' | 'month'

export interface CalendarToolbarProps {
  rangeStart: Date
  rangeEnd: Date
  view: CalendarViewMode
  onViewChange: (view: CalendarViewMode) => void
  onToday: () => void
  onPrevious: () => void
  onNext: () => void
  onDateSelect?: (date: Date) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  onFilterClick?: () => void
  monthLabel?: string
}

const DATE_FORMAT = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
const MONTH_YEAR_FORMAT = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' })

function formatRange(start: Date, end: Date): string {
  return `${DATE_FORMAT.format(start)} - ${DATE_FORMAT.format(end)}`
}

export function CalendarToolbar({
  rangeStart,
  rangeEnd,
  view,
  onViewChange,
  onToday,
  onPrevious,
  onNext,
  onDateSelect,
  searchValue,
  onSearchChange,
  onFilterClick,
  monthLabel
}: CalendarToolbarProps) {
  const [pickerOpened, setPickerOpened] = useState(false)

  return (
    <div className={classes.toolbar}>
      {/* Row 1: today / view select — range pill (now the date-picker trigger) */}
      <div className={classes.topRow}>
        <Group gap="sm">
          <Button variant="default" size="sm" onClick={onToday}>
            Today
          </Button>
          <Select
            value={view}
            onChange={(v) => v && onViewChange(v as CalendarViewMode)}
            data={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' }
            ]}
            size="sm"
            className={classes.viewSelect}
            allowDeselect={false}
          />
        </Group>

        <Group gap="sm">
          <Popover opened={pickerOpened} onChange={setPickerOpened} position="bottom-end" withArrow>
            <Popover.Target>
              <Button
                variant="default"
                size="sm"
                leftSection={<IconCalendar size={14} />}
                onClick={() => setPickerOpened((o) => !o)}
              >
                {formatRange(rangeStart, rangeEnd)}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <DatePicker
                value={rangeStart}
                onChange={(date) => {
                  if (date) {
                    onDateSelect?.(date)
                    setPickerOpened(false)
                  }
                }}
              />
            </Popover.Dropdown>
          </Popover>
        </Group>
      </div>

      <Divider />

      {/* Row 2: prev / month label (plain text, no picker) / next — divider — search / filter */}
      <div className={classes.navRow}>
        <Group gap={4}>
          <Button variant="transparent" size="sm" onClick={onPrevious} aria-label="Previous">
            <IconCircleChevronLeft size={16} />
          </Button>
          <span className={classes.monthLabel}>{monthLabel ?? MONTH_YEAR_FORMAT.format(rangeStart)}</span>
          <Button variant="transparent" size="sm" onClick={onNext} aria-label="Next">
            <IconCircleChevronRight size={16} />
          </Button>
        </Group>

        <Group gap="sm">
          <Divider orientation="vertical" />
          {onSearchChange && (
            <TextInput
              placeholder="Search events"
              leftSection={<IconSearch size={14} />}
              value={searchValue}
              onChange={(e) => onSearchChange(e.currentTarget.value)}
              size="sm"
              className={classes.searchInput}
            />
          )}
          {onFilterClick && (
            <Button variant="default" size="sm" leftSection={<IconFilter size={14} />} onClick={onFilterClick}>
              Filter
            </Button>
          )}
        </Group>
      </div>
    </div>
  )
}
