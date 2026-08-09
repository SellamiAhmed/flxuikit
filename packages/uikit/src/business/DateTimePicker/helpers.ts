import { useMemoizedFn } from 'ahooks'
import { useMemo } from 'react'

import { dayjs, Dayjs } from '../../utils/dayjs.js'

import { DateTimePickerProps } from './types.js'

export interface UseDateTimePickerProps extends Pick<
  DateTimePickerProps,
  'value' | 'onChange' | 'startDate' | 'endDate' | 'format' | 'formatter'
> {
  utcOffset?: number | string
}

export const useDateTimePicker = ({
  value,
  onChange,
  startDate = dayjs().subtract(10, 'year').toDate(),
  endDate = dayjs().add(10, 'year').toDate(),
  utcOffset = dayjs().utcOffset(),
  format,
  formatter
}: UseDateTimePickerProps): Pick<DateTimePickerProps, 'value' | 'onChange' | 'startDate' | 'endDate' | 'formatter'> => {
  const convertToLocal = useMemoizedFn((date: Date): Date => {
    const targetTime = dayjs(date).utcOffset(utcOffset)
    const converted = targetTime.utcOffset(dayjs().utcOffset(), true)
    return new Date(converted.format())
  })

  const convertFromLocal = useMemoizedFn((date: Date) => {
    const targetTime = dayjs(date).utcOffset(utcOffset, true)
    return new Date(targetTime.format())
  })

  const displayValue = useMemo(() => {
    if (!value) return undefined
    return convertToLocal(value)
  }, [value, convertToLocal])

  const displayStartDate = useMemo(() => {
    return convertToLocal(startDate)
  }, [startDate, convertToLocal])

  const displayEndDate = useMemo(() => {
    return convertToLocal(endDate)
  }, [endDate, convertToLocal])

  const handleChange = useMemoizedFn((localTime: Date) => {
    const targetTime = convertFromLocal(localTime)
    onChange?.(targetTime)
  })

  return {
    value: displayValue,
    onChange: handleChange,
    startDate: displayStartDate,
    endDate: displayEndDate,
    formatter: (val) => {
      const targetTime = dayjs(val).utcOffset(utcOffset, true)
      return formatter ? formatter(new Date(targetTime.format())) : targetTime.format(format)
    }
  }
}
