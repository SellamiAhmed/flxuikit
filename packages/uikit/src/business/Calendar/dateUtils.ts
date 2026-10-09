import type { CalendarViewMode } from './types.js'

export type WeekStart = 0 | 1 // 0 = Sunday, 1 = Monday (your app uses Monday)

export function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date: Date, amount: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + amount) // setDate (not ms math) so DST changes can't shift the day
  return d
}

/** Clamps the day so Jan 31 + 1 month = Feb 28, not Mar 3. */
export function addMonths(date: Date, amount: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + amount, 1)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  target.setDate(Math.min(date.getDate(), lastDay))
  return target
}

export function startOfWeek(date: Date, weekStartsOn: WeekStart = 1): Date {
  const d = startOfDay(date)
  d.setDate(d.getDate() - ((d.getDay() - weekStartsOn + 7) % 7))
  return d
}

export function getWeekDays(anchor: Date, weekStartsOn: WeekStart = 1): Date[] {
  const start = startOfWeek(anchor, weekStartsOn)
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

/** Full weeks covering the month, including leading/trailing days of adjacent months. 35 or 42 days. */
export function getMonthGridDays(anchor: Date, weekStartsOn: WeekStart = 1): Date[] {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const last = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  const gridEnd = addDays(startOfWeek(last, weekStartsOn), 6)

  const days: Date[] = []
  for (let d = startOfWeek(first, weekStartsOn); d <= gridEnd; d = addDays(d, 1)) days.push(d)
  return days
}

export interface ViewRange {
  /** Columns/cells to render. */
  days: Date[]
  /** Span to FETCH. For month this includes the adjacent-month days shown in the grid. */
  fetchStart: Date
  fetchEnd: Date
  /** Span to DISPLAY in the toolbar. For month this is the 1st to the last day of the month. */
  labelStart: Date
  labelEnd: Date
}

export function getViewRange(view: CalendarViewMode, anchor: Date, weekStartsOn: WeekStart = 1): ViewRange {
  if (view === 'day') {
    const d = startOfDay(anchor)
    return { days: [d], fetchStart: d, fetchEnd: d, labelStart: d, labelEnd: d }
  }
  if (view === 'week') {
    const days = getWeekDays(anchor, weekStartsOn)
    return { days, fetchStart: days[0], fetchEnd: days[6], labelStart: days[0], labelEnd: days[6] }
  }
  const days = getMonthGridDays(anchor, weekStartsOn)
  return {
    days,
    fetchStart: days[0],
    fetchEnd: days[days.length - 1],
    labelStart: new Date(anchor.getFullYear(), anchor.getMonth(), 1),
    labelEnd: new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0)
  }
}

/** What the toolbar's prev/next buttons should do for each view. */
export function shiftAnchor(view: CalendarViewMode, anchor: Date, direction: 1 | -1): Date {
  if (view === 'day') return addDays(anchor, direction)
  if (view === 'week') return addDays(anchor, 7 * direction)
  return addMonths(anchor, direction)
}
