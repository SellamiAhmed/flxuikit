import { forwardRef } from 'react'

import classes from './index.module.css'
import type { TimeAxisProps } from './types'

function formatHour(hour: number): string {
  const h = hour % 24
  const period = h < 12 ? 'AM' : 'PM'
  const display = h % 12 === 0 ? 12 : h % 12
  return `${display} ${period}`
}

export const TimeAxis = forwardRef<HTMLDivElement, TimeAxisProps>(
  ({ startHour, endHour, pxPerHour, className }, ref) => {
    const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i)

    return (
      <div ref={ref} className={`${classes.timeAxis} ${className ?? ''}`}>
        {hours.map((hour) => (
          <div key={hour} className={classes.hourLabel} style={{ height: pxPerHour }}>
            {hour !== startHour && <span>{formatHour(hour)}</span>}
          </div>
        ))}
      </div>
    )
  }
)

TimeAxis.displayName = 'TimeAxis'
