import { useEffect, useState } from 'react'

import classes from './index.module.css'

interface NowIndicatorProps {
  startHour: number
  pxPerHour: number
}

function useNow(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  return now
}

function getTopOffset(now: Date, startHour: number, pxPerHour: number): number {
  const minutesSinceStart = (now.getHours() - startHour) * 60 + now.getMinutes()
  return (minutesSinceStart / 60) * pxPerHour
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

/** Renders inside the time-axis column — just the time badge, e.g. "10:07 AM" */
export function NowTimeBadge({ startHour, pxPerHour }: NowIndicatorProps) {
  const now = useNow()
  const top = getTopOffset(now, startHour, pxPerHour)
  if (top < 0) return null

  return (
    <div className={classes.nowBadge} style={{ top }}>
      {formatTime(now)}
    </div>
  )
}

/** Renders inside the grid area — just the horizontal line + dot, spanning one day column */
export function NowLineTrack({
  startHour,
  pxPerHour,
  columnIndex,
  columnCount
}: NowIndicatorProps & { columnIndex: number; columnCount: number }) {
  const now = useNow()
  const top = getTopOffset(now, startHour, pxPerHour)
  if (top < 0) return null

  return (
    <div
      className={classes.nowLine}
      style={{
        top,
        left: `${(columnIndex / columnCount) * 100}%`,
        width: `${(1 / columnCount) * 100}%`
      }}
    >
      <div className={classes.nowLineTrack} />
    </div>
  )
}
