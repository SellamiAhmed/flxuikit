import { describe, expect, it } from 'vitest'

import {
  addOffsetUTC,
  formatDuration,
  fromTimeRangeValue,
  getUTCString,
  timeFormatter,
  toTimeRangeValue,
  toURLTimeRange,
  urlToTimeRange,
  urlToTimeRangeValue
} from '../../../business/TimeRangePicker/helper.js'

// NOTE: assumed path 'business/TimeRangePicker/helper.js' — same folder as index.js,
// matching the './helper.js' import used inside index.js itself.

describe('formatDuration', () => {
  // Deliberately NOT asserting exact pretty-ms output strings here — its separator/rounding
  // behavior (comma vs space, floor vs round in compact mode) varies enough across versions
  // that hard-coding a guessed string is more likely to break on first run than catch a
  // real regression. Asserting the structural difference between verbose/compact is safer
  // and still verifies formatDuration is wiring the `short` flag to the right pretty-ms option.
  it('verbose format spells out unit words for hours and minutes', () => {
    const result = formatDuration(90 * 60) // 90 minutes
    expect(result).toMatch(/1 hour/)
    expect(result).toMatch(/minute/)
  })

  it('compact format is shorter than verbose and drops full unit words', () => {
    const compact = formatDuration(90 * 60, true)
    const verbose = formatDuration(90 * 60)
    expect(compact.length).toBeLessThan(verbose.length)
    expect(compact).not.toMatch(/hour/)
  })

  it('handles sub-minute durations', () => {
    expect(formatDuration(45)).toMatch(/45 second/)
  })
})

describe('toTimeRangeValue', () => {
  it('absolute range passes through unchanged with no offset', () => {
    expect(toTimeRangeValue({ type: 'absolute', value: [100, 200] })).toEqual([100, 200])
  })

  it('absolute range applies offset to both ends', () => {
    expect(toTimeRangeValue({ type: 'absolute', value: [100, 200] }, 50)).toEqual([150, 250])
  })

  it('relative, non-future range is [now - value, now]', () => {
    const before = Math.floor(Date.now() / 1000)
    const [from, to] = toTimeRangeValue({ type: 'relative', value: 300 })
    const after = Math.floor(Date.now() / 1000)

    // "now" is read inside the function, so pin it to a window rather than an exact value
    expect(to).toBeGreaterThanOrEqual(before)
    expect(to).toBeLessThanOrEqual(after)
    expect(from).toBe(to - 300)
  })

  it('relative, future range is [now, now + value]', () => {
    const before = Math.floor(Date.now() / 1000)
    const [from, to] = toTimeRangeValue({ type: 'relative', value: 300, isFuture: true })
    const after = Math.floor(Date.now() / 1000)

    expect(from).toBeGreaterThanOrEqual(before)
    expect(from).toBeLessThanOrEqual(after)
    expect(to).toBe(from + 300)
  })
})

describe('fromTimeRangeValue', () => {
  it('wraps a [from, to] tuple as an absolute range', () => {
    expect(fromTimeRangeValue([10, 20])).toEqual({ type: 'absolute', value: [10, 20] })
  })

  it('does not mutate the input array reference', () => {
    const input: [number, number] = [10, 20]
    const result = fromTimeRangeValue(input)
    result.value[0] = 999
    expect(input[0]).toBe(10) // spread copy, not the same array
  })
})

describe('toURLTimeRange / urlToTimeRange round-trip', () => {
  it('relative, past range encodes as { from: value, to: "now" }', () => {
    expect(toURLTimeRange({ type: 'relative', value: 1800 })).toEqual({ from: '1800', to: 'now' })
  })

  it('relative, future range encodes as { from: "now", to: value }', () => {
    expect(toURLTimeRange({ type: 'relative', value: 1800, isFuture: true })).toEqual({ from: 'now', to: '1800' })
  })

  it('absolute range encodes both bounds as numeric strings', () => {
    expect(toURLTimeRange({ type: 'absolute', value: [100, 200] })).toEqual({ from: '100', to: '200' })
  })

  it('decodes { from, to: "now" } back to a relative, non-future range', () => {
    expect(urlToTimeRange({ from: '1800', to: 'now' })).toEqual({ type: 'relative', value: 1800, isFuture: false })
  })

  it('decodes { from: "now", to } back to a relative, future range', () => {
    expect(urlToTimeRange({ from: 'now', to: '1800' })).toEqual({ type: 'relative', value: 1800, isFuture: true })
  })

  it('decodes two numeric strings back to an absolute range', () => {
    expect(urlToTimeRange({ from: '100', to: '200' })).toEqual({ type: 'absolute', value: [100, 200] })
  })

  it('urlToTimeRangeValue composes decode + toTimeRangeValue for the absolute case', () => {
    expect(urlToTimeRangeValue({ from: '100', to: '200' })).toEqual([100, 200])
  })
})

describe('getUTCString', () => {
  it('formats a positive whole-hour offset', () => {
    expect(getUTCString(8)).toBe('UTC+08:00')
  })

  it('formats a negative whole-hour offset', () => {
    expect(getUTCString(-5)).toBe('UTC-05:00')
  })

  it('formats zero as UTC±00:00', () => {
    expect(getUTCString(0)).toBe('UTC±00:00')
  })

  it('formats a fractional offset like 8.5', () => {
    // NOTE: current implementation does Number.parseFloat(`0.${'5'}`) * 60 = 30
    expect(getUTCString(8.5)).toBe('UTC+08:30')
  })
})

describe('addOffsetUTC', () => {
  // These pin an explicit utcOffset and check the *relative* shift rather than an
  // absolute wall-clock value, so the test doesn't depend on the machine/CI's local TZ.
  it('shifts time forward when utcOffset is greater than local offset', () => {
    const base = new Date('2026-01-01T00:00:00.000Z')
    const localOffsetMinutes = base.getTimezoneOffset() // minutes to ADD to local to get UTC
    const utcOffsetHours = 5
    const result = addOffsetUTC(base, utcOffsetHours)

    const expectedDeltaMs = (utcOffsetHours * 60 + localOffsetMinutes) * 60 * 1000
    expect(result.getTime() - base.getTime()).toBe(expectedDeltaMs)
  })

  it('is a no-op in delta terms when utcOffset cancels out the local offset', () => {
    const base = new Date('2026-01-01T00:00:00.000Z')
    const localOffsetMinutes = base.getTimezoneOffset()
    const utcOffsetHours = -localOffsetMinutes / 60
    const result = addOffsetUTC(base, utcOffsetHours)
    expect(result.getTime()).toBe(base.getTime())
  })
})

describe('timeFormatter', () => {
  it('returns "-" for falsy input (0, undefined, "")', () => {
    expect(timeFormatter(0)).toBe('-')
    // @ts-expect-error intentionally testing undefined
    expect(timeFormatter(undefined)).toBe('-')
    expect(timeFormatter('')).toBe('-')
  })

  it('formats a unix-seconds timestamp with an explicit utcOffset, no "Z" in format', () => {
    // 2026-01-01T00:00:00Z as unix seconds
    const unixSeconds = Math.floor(new Date('2026-01-01T00:00:00.000Z').getTime() / 1000)
    expect(timeFormatter(unixSeconds, 0, 'YYYY-MM-DD HH:mm:ss')).toBe('2026-01-01 00:00:00')
  })

  it('appends a UTC offset suffix when the format string includes "Z"', () => {
    const unixSeconds = Math.floor(new Date('2026-01-01T00:00:00.000Z').getTime() / 1000)
    // NOTE: lodash's trim(format, 'Z') only strips the literal "Z" character from each end —
    // it does NOT strip the space in front of it, so 'YYYY-MM-DD HH:mm:ss Z' becomes
    // 'YYYY-MM-DD HH:mm:ss ' (trailing space intact), and the UTC suffix is appended right
    // after that space. My first pass assumed no space here; this is the corrected expectation.
    expect(timeFormatter(unixSeconds, 8, 'YYYY-MM-DD HH:mm:ss Z')).toBe('2026-01-01 08:00:00 UTC+08:00')
  })

  it('accepts a Date instance directly, not just a unix timestamp', () => {
    const date = new Date('2026-06-15T12:00:00.000Z')
    expect(timeFormatter(date, 0, 'YYYY-MM-DD')).toBe('2026-06-15')
  })
})
