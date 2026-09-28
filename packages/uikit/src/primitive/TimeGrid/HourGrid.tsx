import { forwardRef } from 'react'

import classes from './index.module.css'
import type { HourGridProps } from './types'

export const HourGrid = forwardRef<HTMLDivElement, HourGridProps>(
  ({ startHour, endHour, pxPerHour, columnCount, todayIndex, className }, ref) => {
    const hourCount = endHour - startHour + 1
    const totalHeight = hourCount * pxPerHour

    return (
      <div
        ref={ref}
        className={`${classes.hourGrid} ${className ?? ''}`}
        style={{
          height: totalHeight,
          gridTemplateColumns: `repeat(${columnCount}, minmax(140px, 1fr))`, // was: repeat(N, 1fr)
          backgroundSize: `100% ${pxPerHour}px`
        }}
      >
        {Array.from({ length: columnCount }, (_, i) => (
          <div key={i} className={classes.dayColumn} data-today={i === todayIndex || undefined} />
        ))}
      </div>
    )
  }
)
HourGrid.displayName = 'HourGrid'
