// ── Components ──
export { EventCalendar, type EventCalendarProps } from './EventCalendar.js'
export { CalendarToolbar, type CalendarToolbarProps } from './CalendarToolbar.js'
export { EventDetailPanel, type EventDetailPanelProps } from './EventDetailPanel.js'
export { EventContextMenu, type EventContextMenuProps } from './EventContextMenu.js'

// ── Types ──
export type { CalendarEvent, CalendarEventAttendee, CalendarViewMode, PositionedEvent } from './types.js'

// ── Date helpers (used by consumers to build `days` and handle navigation) ──
export {
  addDays,
  addMonths,
  getMonthGridDays,
  getViewRange,
  getWeekDays,
  shiftAnchor,
  startOfDay,
  startOfWeek,
  type ViewRange,
  type WeekStart
} from './dateUtils.js'

// ── Layout (pure function, useful for tests or custom renderers) ──
export { computeEventLayout, type ComputeLayoutOptions } from './eventLayout.js'
