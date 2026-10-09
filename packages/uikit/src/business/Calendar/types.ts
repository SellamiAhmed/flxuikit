import type { Color } from '../../theme/theme.js' // reuse your existing token color union

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color?: Color
  icon?: React.ReactNode
  location?: string
  strikethrough?: boolean
  attendees?: CalendarEventAttendee[]
}

export interface CalendarEventAttendee {
  id: string
  name: string
  avatarUrl?: string
  initials?: string
}

/** An event, plus its computed horizontal slot within an overlap cluster. */
export interface PositionedEvent {
  event: CalendarEvent
  /** Pixel offset from the top of the day column. */
  top: number
  /** Pixel height, derived from event duration. */
  height: number
  /** 0-indexed column within its overlap cluster. */
  columnIndex: number
  /** Total columns in this event's overlap cluster — width = 100 / columnCount. */
  columnCount: number
}
export type CalendarViewMode = 'day' | 'week' | 'month'
