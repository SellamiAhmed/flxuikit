import { getEventColorVars } from './eventColors.js'
import classes from './MonthDayEvents.module.css'
import type { CalendarEvent } from './types.js'

interface MonthDayEventsProps {
  events: CalendarEvent[] // already sorted by start
  max: number
  onEventClick: (event: CalendarEvent) => void
  onMore: () => void
}

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

export function MonthDayEvents({ events, max, onEventClick, onMore }: MonthDayEventsProps) {
  const visible = events.slice(0, max)
  const overflow = events.length - visible.length

  return (
    <>
      {visible.map((event) => (
        <button
          key={event.id}
          type="button"
          className={classes.chip}
          data-strikethrough={event.strikethrough || undefined}
          style={getEventColorVars(event.color)}
          title={`${event.title} · ${TIME_FORMAT.format(event.start)}`}
          onClick={() => onEventClick(event)}
        >
          <span className={classes.time}>{TIME_FORMAT.format(event.start)}</span>
          <span className={classes.title}>{event.title}</span>
        </button>
      ))}
      {overflow > 0 && (
        <button type="button" className={classes.more} onClick={onMore}>
          +{overflow} more
        </button>
      )}
    </>
  )
}
