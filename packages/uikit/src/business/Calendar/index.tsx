import { forwardRef, useMemo, useState } from 'react'

import { TimeGrid } from '../../primitive/TimeGrid/index.js'

import { EventCard } from './EventCard.js'
import { EventDetailPanel } from './EventDetailPanel.js'
import { computeEventLayout } from './eventLayout.js'
import classes from './index.module.css'
import type { CalendarEvent } from './types.js'

export interface EventCalendarProps {
  events: CalendarEvent[]
  days: Date[]
  today?: Date
  startHour?: number
  endHour?: number
  pxPerHour?: number
  onEventClick?: (event: CalendarEvent) => void
  onEventEdit?: (event: CalendarEvent) => void
  onEventDuplicate?: (event: CalendarEvent) => void
  onEventDelete?: (event: CalendarEvent) => void
  className?: string
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isEventOnDay(event: CalendarEvent, day: Date): boolean {
  return isSameDay(event.start, day)
}

export const EventCalendar = forwardRef<HTMLDivElement, EventCalendarProps>(
  (
    {
      events,
      days,
      today,
      startHour = 0,
      endHour = 23,
      pxPerHour = 60,
      onEventClick,
      onEventEdit,
      onEventDuplicate,
      onEventDelete,
      className
    },
    ref
  ) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

    const layoutByDay = useMemo(() => {
      const map = new Map<string, ReturnType<typeof computeEventLayout>>()
      for (const day of days) {
        const dayEvents = events.filter((e) => isEventOnDay(e, day))
        map.set(day.toDateString(), computeEventLayout(dayEvents, { startHour, pxPerHour }))
      }
      return map
    }, [events, days, startHour, pxPerHour])

    function handleEventClick(event: CalendarEvent) {
      setSelectedEvent(event)
      onEventClick?.(event)
    }

    return (
      <>
        <TimeGrid
          ref={ref}
          className={className ?? classes.wrapper}
          days={days}
          today={today}
          startHour={startHour}
          endHour={endHour}
          pxPerHour={pxPerHour}
          renderDayContent={(day) => {
            const positioned = layoutByDay.get(day.toDateString()) ?? []
            return positioned.map((p) => (
              <EventCard
                key={p.event.id}
                positioned={p}
                onClick={handleEventClick}
                onEdit={onEventEdit}
                onDuplicate={onEventDuplicate}
                onDelete={onEventDelete}
              />
            ))
          }}
        />

        <EventDetailPanel
          event={selectedEvent}
          opened={selectedEvent !== null}
          onClose={() => setSelectedEvent(null)}
          onEdit={onEventEdit}
          onDelete={onEventDelete}
        />
      </>
    )
  }
)

EventCalendar.displayName = 'EventCalendar'
