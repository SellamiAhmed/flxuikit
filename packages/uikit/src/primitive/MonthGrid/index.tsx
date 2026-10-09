import { forwardRef, type CSSProperties, type ReactNode } from 'react'

import classes from './index.module.css'

export interface MonthGridProps {
  /** Whole weeks, in order (35 or 42 days). Weekday headers come from the first 7. */
  days: Date[]
  /** The month being viewed. Days outside it render dimmed. */
  month: Date
  today?: Date
  renderDayContent?: (day: Date) => ReactNode
  onDayClick?: (day: Date) => void
  className?: string
}

const WEEKDAY_FORMAT = new Intl.DateTimeFormat(undefined, { weekday: 'short' })
const DAY_LABEL_FORMAT = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export const MonthGrid = forwardRef<HTMLDivElement, MonthGridProps>(
  ({ days, month, today, renderDayContent, onDayClick, className }, ref) => {
    const weeks = Math.ceil(days.length / 7)

    return (
      <div ref={ref} className={`${classes.wrapper} ${className ?? ''}`}>
        <div className={classes.weekdays}>
          {days.slice(0, 7).map((d) => (
            <div key={d.getDay()} className={classes.weekday}>
              {WEEKDAY_FORMAT.format(d)}
            </div>
          ))}
        </div>

        <div className={classes.grid} style={{ '--weeks': weeks } as CSSProperties}>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={classes.cell}
              data-outside={day.getMonth() !== month.getMonth() || undefined}
              data-today={(today && isSameDay(day, today)) || undefined}
            >
              <button
                type="button"
                className={classes.dayNumber}
                onClick={() => onDayClick?.(day)}
                aria-label={DAY_LABEL_FORMAT.format(day)}
              >
                {day.getDate()}
              </button>
              <div className={classes.content}>{renderDayContent?.(day)}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

MonthGrid.displayName = 'MonthGrid'
