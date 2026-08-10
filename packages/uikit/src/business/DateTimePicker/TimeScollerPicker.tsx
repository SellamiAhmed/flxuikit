import { useMemoizedFn } from 'ahooks'
import clsx from 'clsx'
import type { Dayjs } from 'dayjs'
import { padStart, range } from 'lodash-es'
import { useEffect, useMemo, useRef } from 'react'

import { useUncontrolled } from '../../hooks/index.js'
import { Box, Flex, ScrollArea } from '../../primitive/index.js'
import { dayjs } from '../../utils/dayjs.js'

import { CellHeight, CellStyle } from './constant.js'
import classes from './index.module.css'

const getTimeRange = ({
  curr,
  type,
  start,
  end
}: {
  curr: Dayjs
  type: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
  start?: Date
  end?: Date
}): Range => {
  const map = {
    year: { min: dayjs().year(), max: dayjs().year() + 100 },
    month: { min: 1, max: 12 },
    day: { min: 1, max: curr.daysInMonth() },
    hour: { min: 0, max: 23 },
    minute: { min: 0, max: 59 },
    second: { min: 0, max: 59 }
  }

  let { min, max } = map[type]
  const s1 = start ? dayjs(start) : null
  const s2 = end ? dayjs(end) : null

  switch (type) {
    case 'year': {
      if (s1) min = s1.year()
      if (s2) max = s2.year()
      break
    }
    case 'month': {
      if (s1 && curr.isSame(s1, 'year')) min = s1.month() + 1
      if (s2 && curr.isSame(s2, 'year')) max = s2.month() + 1
      break
    }
    case 'day': {
      if (s1 && curr.isSame(s1, 'month')) min = s1.date()
      if (s2 && curr.isSame(s2, 'month')) max = s2.date()
      break
    }
    case 'hour': {
      if (s1 && curr.isSame(s1, 'day')) min = s1.hour()
      if (s2 && curr.isSame(s2, 'day')) max = s2.hour()
      break
    }
    case 'minute': {
      if (s1 && curr.isSame(s1, 'hour')) min = s1.minute()
      if (s2 && curr.isSame(s2, 'hour')) max = s2.minute()
      break
    }
    case 'second': {
      if (s1 && curr.isSame(s1, 'minute')) min = s1.second()
      if (s2 && curr.isSame(s2, 'minute')) max = s2.second()
      break
    }
    default: {
      const exhaustiveCheck = 'should not reach here' as any as never
      throw new Error(exhaustiveCheck)
    }
  }

  return { min, max }
}

interface Options {
  max: number
  min: number
  curr: number
  open: boolean
  render?: (val: number) => any
  title?: string
  onChange?: (v: number) => void
}

type Range = Pick<Options, 'max' | 'min'>

const default2DigitRender = (val: number) => padStart(String(val), 2, '0')

function TimePickerScrollerColumn({
  min,
  max,
  curr,
  render = default2DigitRender,
  onChange,
  name,
  currentValueChangedBy,
  label
}: {
  min: number
  max: number
  curr: number
  render?: (val: number) => React.ReactNode
  onChange?: (v: number) => void
  /** for debugging only */
  name?: string
  currentValueChangedBy: CurrentValueChangedBy | null
  /** accessible name for the listbox, e.g. "Hours" */
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const fullRange = useMemo(() => {
    switch (name) {
      case 'hour':
        return range(0, 24)
      case 'minute':
      case 'second':
        return range(0, 60)
      default:
        return range(min, max + 1)
    }
  }, [name, min, max])

  const numbers = fullRange
  const timeoutRef = useRef<number>()
  const isArtificialScroll = useRef(false)

  const isDisabled = useMemo(() => (val: number) => val < min || val > max, [min, max])

  const [val, setVal] = useUncontrolled({
    value: curr,
    onChange
  })

  const adjustScrollTop = useMemoizedFn((value: number) => {
    if (currentValueChangedBy === 'timeScroller') return

    const i = numbers.findIndex((i) => i === value)

    if (i !== -1 && ref.current) {
      isArtificialScroll.current = true
      ref.current.scrollTop = i * CellHeight

      window.requestAnimationFrame(() => {
        setTimeout(() => {
          isArtificialScroll.current = false
        }, 100)
      })
    }
  })

  const findNearestValidValue = useMemoizedFn((targetIndex: number) => {
    let upIndex = targetIndex
    let downIndex = targetIndex

    while (upIndex >= 0 || downIndex < numbers.length) {
      if (upIndex >= 0 && upIndex < numbers.length) {
        const upVal = numbers[upIndex]
        if (!isDisabled(upVal)) return { value: upVal, index: upIndex }
      }
      if (downIndex >= 0 && downIndex < numbers.length) {
        const downVal = numbers[downIndex]
        if (!isDisabled(downVal)) return { value: downVal, index: downIndex }
      }
      upIndex++
      downIndex--
    }

    return null
  })

  const selectIndex = useMemoizedFn((i: number, behavior: ScrollBehavior = 'smooth') => {
    const value = numbers[i]
    if (typeof value === 'undefined') return
    if (!isDisabled(value)) {
      setVal(value)
      ref.current?.scrollTo({ top: i * CellHeight, behavior })
      return
    }
    const nearest = findNearestValidValue(i)
    if (nearest) {
      setVal(nearest.value)
      ref.current?.scrollTo({ top: nearest.index * CellHeight, behavior })
    }
  })

  const onScroll = useMemoizedFn((position: { x: number; y: number }) => {
    if (isArtificialScroll.current) return
    if (currentValueChangedBy) return

    clearTimeout(timeoutRef.current)

    const i = position.y / CellHeight
    if (i === Math.floor(i)) {
      const val = i >= numbers.length ? numbers.at(-1) : numbers[i]
      if (typeof val !== 'undefined' && !isDisabled(val)) {
        setVal(val)
      } else if (typeof val !== 'undefined' && isDisabled(val)) {
        const nearest = findNearestValidValue(i)
        if (nearest) {
          setVal(nearest.value)
          setTimeout(() => {
            ref.current?.scrollTo({ top: nearest.index * CellHeight, behavior: 'smooth' })
          }, 100)
        }
      }
    } else {
      timeoutRef.current = window.setTimeout(() => {
        const k = Math.round(i)
        const val = k >= numbers.length ? numbers.at(-1) : numbers[k]
        if (typeof val !== 'undefined' && !isDisabled(val)) {
          setVal(val)
        } else if (typeof val !== 'undefined' && isDisabled(val)) {
          const nearest = findNearestValidValue(k)
          if (nearest) {
            setVal(nearest.value)
            setTimeout(() => {
              ref.current?.scrollTo({ top: nearest.index * CellHeight, behavior: 'smooth' })
            }, 100)
          }
        }
      }, 300)
    }
  })

  const handleClickCell = useMemoizedFn((e: React.MouseEvent<HTMLDivElement>, i: number, val: number) => {
    e.stopPropagation()
    e.preventDefault()
    if (!isDisabled(val)) {
      ref.current?.scrollTo({ top: i * CellHeight, behavior: 'smooth' })
    }
  })

  // Keyboard support: Up/Down move one cell, Home/End jump to first/last valid cell.
  const handleKeyDown = useMemoizedFn((e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = numbers.findIndex((n) => n === val)
    if (currentIndex === -1) return

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        selectIndex(Math.max(0, currentIndex - 1))
        break
      case 'ArrowDown':
        e.preventDefault()
        selectIndex(Math.min(numbers.length - 1, currentIndex + 1))
        break
      case 'Home':
        e.preventDefault()
        selectIndex(0)
        break
      case 'End':
        e.preventDefault()
        selectIndex(numbers.length - 1)
        break
      default:
        break
    }
  })

  useEffect(() => {
    adjustScrollTop(val)
  }, [val])

  return (
    <ScrollArea
      viewportRef={ref}
      type="never"
      role="listbox"
      aria-label={label}
      tabIndex={0}
      className={classes.scrollerColumn}
      onKeyDown={handleKeyDown}
      styles={{
        viewport: {
          scrollSnapPointsY: `repeat(${CellHeight}px)`,
          scrollSnapType: 'y mandatory'
        }
      }}
      onScrollPositionChange={onScroll}
    >
      {numbers.map((i, index) => {
        const disabled = isDisabled(i)
        const selected = i === val && !disabled
        return (
          <div
            key={i}
            role="option"
            aria-selected={selected}
            aria-disabled={disabled || undefined}
            className={clsx(disabled ? classes.cellDisabled : classes.cell, selected && classes.cellBold)}
            onClick={(e) => handleClickCell(e, index, i)}
            style={CellStyle}
          >
            {render ? render(i) : i}
          </div>
        )
      })}

      {range(6).map((i) => (
        <Box key={i} className={clsx(classes.cell, classes.cellPlaceholder)} style={CellStyle} />
      ))}
    </ScrollArea>
  )
}

export type CurrentValueChangedBy = 'calendar' | 'timeInput' | 'timeScroller'

export function TimeScrollerPicker({
  currentValue,
  currentValueChangedBy,
  start,
  end,
  onChange
}: {
  currentValue: Dayjs
  currentValueChangedBy: CurrentValueChangedBy | null
  start?: Date
  end?: Date
  onChange?: (v: [number, number, number]) => void
}) {
  const options = useMemo(
    () => ({
      hour: getTimeRange({ curr: currentValue, start, end, type: 'hour' }),
      minute: getTimeRange({ curr: currentValue, start, end, type: 'minute' }),
      second: getTimeRange({ curr: currentValue, start, end, type: 'second' })
    }),
    [currentValue, start, end]
  )
  const hourValue = useMemo(() => currentValue.hour(), [currentValue])
  const minuteValue = useMemo(() => currentValue.minute(), [currentValue])
  const secondValue = useMemo(() => currentValue.second(), [currentValue])

  const onHourChange = useMemoizedFn((v: number) => onChange?.([v, minuteValue, secondValue]))
  const onMinuteChange = useMemoizedFn((v: number) => onChange?.([hourValue, v, secondValue]))
  const onSecondChange = useMemoizedFn((v: number) => onChange?.([hourValue, minuteValue, v]))

  return (
    <Flex mah="100%" gap={8}>
      <TimePickerScrollerColumn
        name="hour"
        label="Hours"
        min={options.hour.min}
        max={options.hour.max}
        curr={hourValue}
        onChange={onHourChange}
        currentValueChangedBy={currentValueChangedBy}
      />
      <TimePickerScrollerColumn
        name="minute"
        label="Minutes"
        min={options.minute.min}
        max={options.minute.max}
        curr={minuteValue}
        onChange={onMinuteChange}
        currentValueChangedBy={currentValueChangedBy}
      />
      <TimePickerScrollerColumn
        name="second"
        label="Seconds"
        min={options.second.min}
        max={options.second.max}
        curr={secondValue}
        onChange={onSecondChange}
        currentValueChangedBy={currentValueChangedBy}
      />
    </Flex>
  )
}
