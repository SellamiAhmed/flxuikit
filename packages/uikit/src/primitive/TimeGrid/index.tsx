import { forwardRef } from 'react'

import { DayColumns } from './DayColumns.js'
import { HourGrid } from './HourGrid.js'
import classes from './index.module.css'
import { NowTimeBadge, NowLineTrack } from './NowLine.js'
import { TimeAxis } from './TimeAxis.js'
import type { TimeGridProps } from './types'

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export const TimeGrid = forwardRef<HTMLDivElement, TimeGridProps>(
  ({ startHour = 0, endHour = 23, pxPerHour = 60, days, today, renderDayContent, className }, ref) => {
    const todayColumnIndex = today ? days.findIndex((d) => isSameDay(d, today)) : -1
    const showNowIndicator = todayColumnIndex >= 0

    return (
      <div ref={ref} className={`${classes.wrapper} ${className ?? ''}`}>
        <div className={classes.headerRow}>
          <div className={classes.axisSpacer} />
          <DayColumns days={days} today={today} />
        </div>

        {/* IMPORTANT: TimeAxis and gridArea share this one scroll container
            deliberately — NowTimeBadge (in TimeAxis) and NowLineTrack (in
            gridArea) rely on scrolling together to stay vertically aligned.
            Do not give TimeAxis independent/sticky scroll without also
            re-syncing these two components' scroll offsets manually. */}
        <div className={classes.scrollBody}>
          <div className={classes.axisColumn}>
            <TimeAxis startHour={startHour} endHour={endHour} pxPerHour={pxPerHour} />
            {showNowIndicator && <NowTimeBadge startHour={startHour} pxPerHour={pxPerHour} />}
          </div>

          <div className={classes.gridArea}>
            <HourGrid startHour={startHour} endHour={endHour} pxPerHour={pxPerHour} columnCount={days.length} />
            {showNowIndicator && (
              <NowLineTrack
                startHour={startHour}
                pxPerHour={pxPerHour}
                columnIndex={todayColumnIndex}
                columnCount={days.length}
              />
            )}
            {renderDayContent &&
              days.map((day, i) => (
                <div
                  key={day.toISOString()}
                  className={classes.dayContentSlot}
                  style={{ left: `${(i / days.length) * 100}%`, width: `${(1 / days.length) * 100}%` }}
                >
                  {renderDayContent(day, i)}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
)

TimeGrid.displayName = 'TimeGrid'
