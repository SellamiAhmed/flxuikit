import { IconClock } from '@tabler/icons-react'
import { useMemoizedFn } from 'ahooks'
import { useMemo, useState } from 'react'

import { useDisclosure, useUncontrolled } from '../../hooks/index.js'
import {
    Box,
    DatePicker,
    Divider,
    Group,
    Loader,
    MantineSize,
    Popover,
    PopoverProps,
    Stack,
    TextInput,
    TimeInput,
    TimeInputProps
} from '../../primitive/index.js'
import { dayjs, type Dayjs } from '../../utils/dayjs.js'
import { DEFAULT_TIME_FORMAT } from '../TimeRangePicker/helper.js'; // ← fixed: was 'helpers.js'

import classes from './index.module.css'
import { CurrentValueChangedBy, TimeScrollerPicker } from './TimeScollerPicker.js'; // ← fixed name
import { DateTimePickerProps } from './types.js'

export { useDateTimePicker } from './helpers.js'
export type { DateTimePickerProps } from './types.js'

const HighlightRow = () => (
  <div className={classes.highlightRow}>
    <span className={classes.highlightCell} />
    <span className={classes.highlightCell} />
    <span className={classes.highlightCell} />
  </div>
)

export const DateTimePicker = ({
  placeholder = 'Select time',
  format = DEFAULT_TIME_FORMAT,
  formatter,
  defaultValue,
  value,
  startDate = dayjs().subtract(10, 'year').toDate(),
  endDate = dayjs().add(10, 'year').toDate(),
  onChange,
  disable = false,
  withinPortal = true,
  className,
  loading = false,
  size,
  footer
}: DateTimePickerProps) => {
  const [opened, { close, open }] = useDisclosure(false)
  const [currentValue, setCurrentValue] = useUncontrolled({
    value: value ? dayjs(value) : undefined,
    defaultValue: defaultValue ? dayjs(defaultValue) : dayjs(),
    onChange: (v) => {
      onChange?.(v.toDate())
    }
  })
  const [currentValueChangedBy, setCurrentValueChangedBy] = useState<CurrentValueChangedBy | null>(null)

  const updateCurrentValue = useMemoizedFn((val: Dayjs, from: typeof currentValueChangedBy) => {
    let next = val

    if (!next.isValid()) return
    if (currentValue?.unix() === next.unix()) return

    if (startDate && next.isBefore(startDate)) {
      next = dayjs(startDate)
    } else if (endDate && next.isAfter(endDate)) {
      next = dayjs(endDate)
    }

    setCurrentValue(next)
    setCurrentValueChangedBy(from)
    setTimeout(() => {
      setCurrentValueChangedBy(null)
    }, 20)
  })

  const inputStr = formatter ? formatter(currentValue.toDate()) : currentValue.format(format)

  const calendarChange = useMemoizedFn((v: Date | null) => {
    if (!v) return
    const next = currentValue.year(v.getFullYear()).month(v.getMonth()).date(v.getDate())
    updateCurrentValue(next, 'calendar')
  })

  const timeInputChange = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = dayjs(e.currentTarget.value, 'HH:mm:ss').toDate()
    const next = currentValue.hour(v.getHours()).minute(v.getMinutes()).second(v.getSeconds())
    updateCurrentValue(next, 'timeInput')
  })

  const timeScrollPickerChange = useMemoizedFn((v: [number, number, number]) => {
    const [h, m, s] = v
    const next = currentValue.hour(h).minute(m).second(s)
    updateCurrentValue(next, 'timeScroller')
  })

  return (
    <Popover
      position="bottom-end"
      opened={opened}
      withinPortal={withinPortal}
      shadow="md"
      closeOnClickOutside
      onChange={(isOpen) => (isOpen ? open() : close())}
    >
      <Popover.Target>
        <TextInput
          readOnly
          disabled={disable}
          placeholder={placeholder}
          value={inputStr}
          rightSection={loading ? <Loader size="xs" /> : <IconClock size={18} />}
          className={className}
          size={size}
          onClick={open}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Group align="flex-start">
            <DatePicker
              minDate={startDate}
              maxDate={endDate}
              value={currentValue.toDate()}
              onChange={calendarChange}
              withCellSpacing={false}
              size="sm"
            />

            <Divider orientation="vertical" mt={-12} mb={-16} />

            <Stack justify="flex-start">
              <TimeInput
                withSeconds
                value={currentValue.format('HH:mm:ss')}
                onChange={timeInputChange}
                size="md"
                w={112}
                className={classes.timeInput}
              />

              <Box className={classes.scrollerWrap}>
                <HighlightRow />
                <TimeScrollerPicker
                  currentValue={currentValue}
                  currentValueChangedBy={currentValueChangedBy}
                  onChange={timeScrollPickerChange}
                  start={startDate}
                  end={endDate}
                />
              </Box>
            </Stack>
          </Group>
          {footer && (
            <>
              <Divider mx={-16} />
              {footer}
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export interface TimePickerProps
  extends
    Omit<TimeInputProps, 'value' | 'onChange' | 'defaultValue'>,
    Pick<PopoverProps, 'withinPortal' | 'withArrow' | 'position' | 'shadow'> {
  defaultValue?: string
  /** with format of `HH:mm:ss` */
  value?: string
  onChange?: (val: string) => void
  disable?: boolean
  size?: MantineSize
}

export const TimePicker = ({
  value,
  onChange,
  defaultValue,
  disable = false,
  className,
  size,
  minTime,
  maxTime,
  withinPortal,
  withArrow,
  position,
  shadow,
  ...rest
}: TimePickerProps) => {
  const [currentValue, setCurrentValue] = useUncontrolled({
    value: value ? dayjs(value, 'HH:mm:ss') : undefined,
    defaultValue: defaultValue ? dayjs(defaultValue, 'HH:mm:ss') : dayjs(),
    onChange: (v) => {
      onChange?.(v.format('HH:mm:ss'))
    }
  })
  const [currentValueChangedBy, setCurrentValueChangedBy] = useState<CurrentValueChangedBy | null>(null)
  const startDate = useMemo(() => dayjs(minTime, 'HH:mm:ss'), [minTime])
  const endDate = useMemo(() => dayjs(maxTime, 'HH:mm:ss'), [maxTime])

  const updateCurrentValue = useMemoizedFn((val: Dayjs, from: typeof currentValueChangedBy) => {
    let next = val

    if (!next.isValid()) return
    if (currentValue?.unix() === next.unix()) return

    const baseDate = next.format('YYYY-MM-DD')

    if (startDate?.isValid()) {
      const startOnSameDate = dayjs(`${baseDate} ${startDate.format('HH:mm:ss')}`)
      if (next.isBefore(startOnSameDate)) {
        next = next.hour(startDate.hour()).minute(startDate.minute()).second(startDate.second())
      }
    }

    if (endDate?.isValid()) {
      const endOnSameDate = dayjs(`${baseDate} ${endDate.format('HH:mm:ss')}`)
      if (next.isAfter(endOnSameDate)) {
        next = next.hour(endDate.hour()).minute(endDate.minute()).second(endDate.second())
      }
    }

    setCurrentValue(next)
    setCurrentValueChangedBy(from)
    setTimeout(() => {
      setCurrentValueChangedBy(null)
    }, 20)
  })

  const timeInputChange = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = dayjs(e.currentTarget.value, 'HH:mm:ss').toDate()
    const next = currentValue.hour(v.getHours()).minute(v.getMinutes()).second(v.getSeconds())
    updateCurrentValue(next, 'timeInput')
  })

  const timeScrollPickerChange = useMemoizedFn((v: [number, number, number]) => {
    const [h, m, s] = v
    const next = currentValue.hour(h).minute(m).second(s)
    updateCurrentValue(next, 'timeScroller')
  })

  return (
    <Popover withinPortal={withinPortal} withArrow={withArrow} position={position} shadow={shadow}>
      <Popover.Target>
        <TimeInput
          {...rest}
          disabled={disable}
          withSeconds
          value={currentValue.format('HH:mm:ss')}
          onChange={timeInputChange}
          size={size}
          className={className}
          rightSection={<IconClock size={16} />}
        />
      </Popover.Target>

      <Popover.Dropdown>
        <Box className={classes.scrollerWrap}>
          <HighlightRow />
          <TimeScrollerPicker
            currentValue={currentValue}
            currentValueChangedBy={currentValueChangedBy}
            onChange={timeScrollPickerChange}
            start={startDate.toDate()}
            end={endDate.toDate()}
          />
        </Box>
      </Popover.Dropdown>
    </Popover>
  )
}
