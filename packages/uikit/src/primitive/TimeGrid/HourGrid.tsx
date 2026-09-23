import { forwardRef } from 'react'

import classes from './index.module.css'
import type { HourGridProps } from './types'

export const HourGrid = forwardRef<HTMLDivElement, HourGridProps>(
  ({ startHour, endHour, pxPerHour, columnCount, className }, ref) => {
    const hourCount = endHour - startHour + 1
    const totalHeight = hourCount * pxPerHour

    return (
      <div
        ref={ref}
        className={`${classes.hourGrid} ${className ?? ''}`}
        style={{
          height: totalHeight,
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          backgroundSize: `100% ${pxPerHour}px`
        }}
      >
        {Array.from({ length: columnCount }, (_, i) => (
          <div key={i} className={classes.dayColumn} />
        ))}
      </div>
    )
  }
)

HourGrid.displayName = 'HourGrid'
