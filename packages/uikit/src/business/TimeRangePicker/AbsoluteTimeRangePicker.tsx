import { IconAlertCircle, IconChevronLeft } from '@tabler/icons-react'
import { MouseEventHandler, useState } from 'react'

import { Alert, Button, DatePicker, DatePickerProps, Input, TimeInput } from '../../primitive/index.js'
import { dayjs } from '../../utils/dayjs.js'

import classes from './AbsoluteTimeRangePicker.module.css'
import { AbsoluteTimeRange, formatDuration, timeFormatter, TimeRangeValue } from './helper.js'

export interface Localization {
  entry?: string
  back?: string
  start?: string
  end?: string
  apply?: string
  cancel?: string
  errors?: {
    startAfterEnd?: string
    beyondMin?: (min: Date) => string
    beyondMax?: (max: Date) => string
    beyondDuration?: (duration: number) => string
  }
}

interface AbsoluteTimeRangePickerProps {
  value?: TimeRangeValue
  minDateTime?: Date
  maxDateTime?: Date
  maxDuration?: number // unit: seconds
  onChange?: (v: AbsoluteTimeRange) => void
  onCancel?: () => void
  onReturnClick?: MouseEventHandler<HTMLElement>

  dateInputFormat?: (date: Date) => string
  datePickerProps?: DatePickerProps<'range'>
  localization?: Localization
}

const AbsoluteTimeRangePicker = ({
  value,
  maxDateTime,
  minDateTime,
  maxDuration,
  onChange,
  onCancel,
  onReturnClick,
  dateInputFormat,
  datePickerProps,
  localization
}: AbsoluteTimeRangePickerProps) => {
  const [start, setStart] = useState<Date | null>(() => (value ? new Date(value[0] * 1000) : null))
  const [end, setEnd] = useState<Date | null>(() => (value ? new Date(value[1] * 1000) : null))

  const [displayRangeDate, setDisplayRangeDate] = useState<[Date | null, Date | null]>([start, end])

  const startDate = start ? dateInputFormat?.(start) || dayjs(start).format('MMM D, YYYY') : 'Select date'
  const endDate = end ? dateInputFormat?.(end) || dayjs(end).format('MMM D, YYYY') : 'Select date'
  const startTime = start ? dayjs(start).format('HH:mm:ss') : 'Select time'
  const endTime = end ? dayjs(end).format('HH:mm:ss') : 'Select time'

  // Validation
  const isRangeComplete = !!start && !!end
  const startAfterEnd = isRangeComplete && start.valueOf() > end.valueOf()
  const beyondMin = isRangeComplete && minDateTime && start.valueOf() < minDateTime.valueOf()
  const beyondMax = isRangeComplete && maxDateTime && end.valueOf() > maxDateTime.valueOf()
  const beyondDuration = isRangeComplete && !!maxDuration && end.valueOf() - start.valueOf() > maxDuration * 1000

  const hasError = startAfterEnd || beyondMin || beyondMax || beyondDuration

  const updateRangeDate = (dates: [Date | null, Date | null]) => {
    setDisplayRangeDate(dates)

    const newStart = dates[0] ? new Date(dates[0]) : null
    if (newStart && start) {
      newStart.setHours(start.getHours())
      newStart.setMinutes(start.getMinutes())
      newStart.setSeconds(start.getSeconds())
    }
    setStart(newStart)

    const newEnd = dates[1] ? new Date(dates[1]) : dates[0] ? new Date(dates[0]) : null
    if (newEnd && end) {
      newEnd.setHours(end.getHours())
      newEnd.setMinutes(end.getMinutes())
      newEnd.setSeconds(end.getSeconds())
    }
    setEnd(newEnd)
  }

  const updateTime = (v: string, setter: React.Dispatch<React.SetStateAction<Date | null>>) => {
    if (!dayjs(v, 'HH:mm:ss').isValid()) return
    setter((old: Date | null) => {
      if (!old) return old
      const d = dayjs(v, 'HH:mm:ss').toDate()
      const newD = new Date(old)
      newD.setHours(d.getHours())
      newD.setMinutes(d.getMinutes())
      newD.setSeconds(d.getSeconds())
      return newD
    })
  }

  const apply = () => {
    if (!start || !end) return
    onChange?.({
      type: 'absolute',
      value: [dayjs(start).unix(), dayjs(end).unix()]
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.backRow} onClick={onReturnClick}>
        <IconChevronLeft size={16} />
        <span className={classes.backLabel}>{localization?.back || 'Back'}</span>
      </div>
      {/* Start */}
      <div className={classes.fieldRow}>
        <span className={classes.fieldLabel}>{localization?.start || 'Start'}</span>
        <div className={classes.inputs}>
          <Input
            className={classes.dateInput}
            data-empty={!start || undefined}
            value={startDate}
            error={beyondMin || startAfterEnd || beyondDuration}
          />
          <TimeInput
            className={classes.timeInput}
            withSeconds
            value={startTime}
            onChange={(d) => updateTime(d.currentTarget.value, setStart)}
            error={beyondMin || startAfterEnd || beyondDuration}
          />
        </div>
      </div>

      {/* End */}
      <div className={classes.fieldRow}>
        <span className={classes.fieldLabel}>{localization?.end || 'End'}</span>
        <div className={classes.inputs}>
          <Input
            className={classes.dateInput}
            data-empty={!end || undefined}
            value={endDate}
            error={beyondMax || startAfterEnd || beyondDuration}
          />
          <TimeInput
            className={classes.timeInput}
            withSeconds
            value={endTime}
            onChange={(d) => updateTime(d.currentTarget.value, setEnd)}
            error={beyondMax || startAfterEnd || beyondDuration}
          />
        </div>
      </div>
      {/* Calendar */}
      <div className={classes.calendar}>
        <DatePicker
          {...datePickerProps}
          type="range"
          value={displayRangeDate}
          onChange={updateRangeDate}
          maxDate={maxDateTime}
          minDate={minDateTime}
        />
      </div>

      {/* Errors */}
      {hasError && (
        <Alert icon={<IconAlertCircle size={16} />} color="danger" className={classes.errorAlert}>
          {startAfterEnd && (
            <p className={classes.errorText}>
              {localization?.errors?.startAfterEnd || 'Please select an end time after the start time.'}
            </p>
          )}
          {beyondMin && (
            <p className={classes.errorText}>
              {localization?.errors?.beyondMin?.(minDateTime!) ||
                `Please select a start time after ${timeFormatter(minDateTime!, null, 'MMM D, YYYY HH:mm:ss')}`}
            </p>
          )}
          {beyondMax && (
            <p className={classes.errorText}>
              {localization?.errors?.beyondMax?.(maxDateTime!) ||
                `Please select an end time before ${timeFormatter(maxDateTime!, null, 'MMM D, YYYY HH:mm:ss')}`}
            </p>
          )}
          {beyondDuration && (
            <p className={classes.errorText}>
              {localization?.errors?.beyondDuration?.(maxDuration!) ||
                `The selection exceeds the ${formatDuration(maxDuration!)} limit.`}
            </p>
          )}
        </Alert>
      )}

      {/* Footer */}
      <div className={classes.footer}>
        <Button size="xs" variant="default" onClick={onCancel}>
          {localization?.cancel || 'Cancel'}
        </Button>
        <Button size="xs" onClick={apply} disabled={!start || !end || hasError}>
          {localization?.apply || 'Apply'}
        </Button>
      </div>
    </div>
  )
}

export default AbsoluteTimeRangePicker
