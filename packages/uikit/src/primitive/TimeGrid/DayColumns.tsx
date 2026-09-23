import { forwardRef } from 'react'

import classes from './index.module.css'
import type { DayColumnsProps } from './types'

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

const WEEKDAY_FORMAT = new Intl.DateTimeFormat(undefined, { weekday: 'short' })

export const DayColumns = forwardRef<HTMLDivElement, DayColumnsProps>(({ days, today, className }, ref) => {
  return (
    <div ref={ref} className={`${classes.dayColumns} ${className ?? ''}`}>
      {days.map((day) => {
        const isToday = today ? isSameDay(day, today) : false
        return (
          <div key={day.toISOString()} className={classes.dayHeader} data-today={isToday || undefined}>
            <span className={classes.weekday}>{WEEKDAY_FORMAT.format(day)}</span>
            <span className={classes.dayNumber}>{day.getDate()}</span>
          </div>
        )
      })}
    </div>
  )
})

DayColumns.displayName = 'DayColumns'
