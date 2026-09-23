export interface TimeGridProps {
  /** First hour shown, 0–23. Default 0 (midnight). */
  startHour?: number
  /** Last hour shown, 0–23. Default 23 (11 PM). */
  endHour?: number
  /** Pixel height of one hour row. Drives all position math downstream. */
  pxPerHour?: number
  /** Dates to render as columns, in order. */
  days: Date[]
  /** Marks a column as "today" for header styling + enables the now-line on it. */
  today?: Date
  /** Injected per-day-column content (events), keyed by day index. */
  renderDayContent?: (day: Date, dayIndex: number) => React.ReactNode
  className?: string
}

export interface TimeAxisProps {
  startHour: number
  endHour: number
  pxPerHour: number
  className?: string
}

export interface DayColumnsProps {
  days: Date[]
  today?: Date
  className?: string
}

export interface HourGridProps {
  startHour: number
  endHour: number
  pxPerHour: number
  columnCount: number
  className?: string
}

export interface NowLineProps {
  startHour: number
  pxPerHour: number
  /** Which column (0-indexed) the line renders under. */
  columnIndex: number
  columnCount: number
}
