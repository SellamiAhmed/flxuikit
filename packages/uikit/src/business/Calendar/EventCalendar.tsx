import { forwardRef, useMemo, useState } from 'react'

import { MonthGrid } from '../../primitive/MonthGrid/index.js'
import { TimeGrid } from '../../primitive/TimeGrid/index.js'

import classes from './EventCalendar.module.css'
import { EventCard } from './EventCard.js'
import { EventDetailPanel } from './EventDetailPanel.js'
import { computeEventLayout } from './eventLayout.js'
import { MonthDayEvents } from './MonthDayEvents.js'
import type { CalendarEvent, CalendarViewMode } from './types.js'

export interface EventCalendarProps {
  events: CalendarEvent[]
  /** day = 1 date, week = 7, month = full grid weeks (use getViewRange). */
  days: Date[]
  view?: CalendarViewMode
  /** Month being viewed (month view only). Falls back to the middle day of `days`. */
  anchorDate?: Date
  today?: Date
  startHour?: number
  endHour?: number
  pxPerHour?: number
  /** Month view: events shown per day before "+N more". */
  maxEventsPerDay?: number
  onEventClick?: (event: CalendarEvent) => void
  /** Month view: day number or "+N more" clicked. Typical use: jump to day view. */
  onDateClick?: (date: Date) => void
  onEventEdit?: (event: CalendarEvent) => void
  onEventDuplicate?: (event: CalendarEvent) => void
  onEventDelete?: (event: CalendarEvent) => void
  disableDetailPanel?: boolean
  className?: string
}

function isEventOnDay(event: CalendarEvent, day: Date): boolean {
  return event.start.toDateString() === day.toDateString()
}

export const EventCalendar = forwardRef<HTMLDivElement, EventCalendarProps>(
  (
    {
      events,
      days,
      view = 'week',
      anchorDate,
      today,
      startHour = 0,
      endHour = 23,
      pxPerHour = 60,
      maxEventsPerDay = 3,
      onEventClick,
      onDateClick,
      onEventEdit,
      onEventDuplicate,
      onEventDelete,
      disableDetailPanel = false,
      className
    },
    ref
  ) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

    // Time-grid layout (day/week). Skipped in month view.
    const layoutByDay = useMemo(() => {
      const map = new Map<string, ReturnType<typeof computeEventLayout>>()
      if (view === 'month') return map
      for (const day of days) {
        const dayEvents = events.filter((e) => isEventOnDay(e, day))
        map.set(day.toDateString(), computeEventLayout(dayEvents, { startHour, pxPerHour }))
      }
      return map
    }, [events, days, view, startHour, pxPerHour])

    // Month view: bucket events by day once, sorted by start.
    const eventsByDay = useMemo(() => {
      const map = new Map<string, CalendarEvent[]>()
      if (view !== 'month') return map
      for (const event of events) {
        const key = event.start.toDateString()
        const list = map.get(key)
        if (list) list.push(event)
        else map.set(key, [event])
      }
      for (const list of map.values()) list.sort((a, b) => a.start.getTime() - b.start.getTime())
      return map
    }, [events, view])

    function handleEventClick(event: CalendarEvent) {
      if (!disableDetailPanel) setSelectedEvent(event)
      onEventClick?.(event)
    }

    return (
      <>
        {view === 'month' ? (
          <MonthGrid
            ref={ref}
            className={className ?? classes.wrapper}
            days={days}
            month={anchorDate ?? days[Math.floor(days.length / 2)]}
            today={today}
            onDayClick={onDateClick}
            renderDayContent={(day) => (
              <MonthDayEvents
                events={eventsByDay.get(day.toDateString()) ?? []}
                max={maxEventsPerDay}
                onEventClick={handleEventClick}
                onMore={() => onDateClick?.(day)}
              />
            )}
          />
        ) : (
          <TimeGrid
            ref={ref}
            className={className ?? classes.wrapper}
            days={days}
            today={today}
            startHour={startHour}
            endHour={endHour}
            pxPerHour={pxPerHour}
            renderDayContent={(day) =>
              (layoutByDay.get(day.toDateString()) ?? []).map((p) => (
                <EventCard
                  key={p.event.id}
                  positioned={p}
                  onClick={handleEventClick}
                  onEdit={onEventEdit}
                  onDuplicate={onEventDuplicate}
                  onDelete={onEventDelete}
                />
              ))
            }
          />
        )}

        {!disableDetailPanel && (
          <EventDetailPanel
            event={selectedEvent}
            opened={selectedEvent !== null}
            onClose={() => setSelectedEvent(null)}
            onEdit={onEventEdit}
            onDelete={onEventDelete}
          />
        )}
      </>
    )
  }
)

EventCalendar.displayName = 'EventCalendar'
