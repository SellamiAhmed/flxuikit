import type { CalendarEvent, PositionedEvent } from './types.js'

function minutesSince(date: Date, startHour: number): number {
  return (date.getHours() - startHour) * 60 + date.getMinutes()
}

function overlaps(a: CalendarEvent, b: CalendarEvent): boolean {
  return a.start < b.end && b.start < a.end
}

function clusterEvents(events: CalendarEvent[]): CalendarEvent[][] {
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime())
  const clusters: CalendarEvent[][] = []

  for (const event of sorted) {
    const cluster = clusters.find((c) => c.some((e) => overlaps(e, event)))
    if (cluster) {
      cluster.push(event)
    } else {
      clusters.push([event])
    }
  }

  return clusters
}

function assignColumns(cluster: CalendarEvent[]): Map<string, number> {
  const sorted = [...cluster].sort((a, b) => a.start.getTime() - b.start.getTime())
  const columnEndTimes: number[] = []
  const columnAssignment = new Map<string, number>()

  for (const event of sorted) {
    const startMs = event.start.getTime()
    let placedColumn = columnEndTimes.findIndex((endMs) => endMs <= startMs)

    if (placedColumn === -1) {
      placedColumn = columnEndTimes.length
      columnEndTimes.push(event.end.getTime())
    } else {
      columnEndTimes[placedColumn] = event.end.getTime()
    }

    columnAssignment.set(event.id, placedColumn)
  }

  return columnAssignment
}

export interface ComputeLayoutOptions {
  startHour: number
  pxPerHour: number
  minHeight?: number
}

/**
 * Verified via eventLayout.test.ts — covers non-overlapping, pairwise
 * overlap, transitive-cluster overlap, min-height clamping, and full
 * simultaneous 3-way overlap. See test file for exact cases.
 */
export function computeEventLayout(
  events: CalendarEvent[],
  { startHour, pxPerHour, minHeight = 20 }: ComputeLayoutOptions
): PositionedEvent[] {
  const clusters = clusterEvents(events)
  const result: PositionedEvent[] = []

  for (const cluster of clusters) {
    const columnAssignment = assignColumns(cluster)
    const columnCount = Math.max(...Array.from(columnAssignment.values())) + 1

    for (const event of cluster) {
      const top = (minutesSince(event.start, startHour) / 60) * pxPerHour
      const durationMinutes = (event.end.getTime() - event.start.getTime()) / 60000
      const height = Math.max((durationMinutes / 60) * pxPerHour, minHeight)

      result.push({
        event,
        top,
        height,
        columnIndex: columnAssignment.get(event.id)!,
        columnCount
      })
    }
  }

  return result
}
