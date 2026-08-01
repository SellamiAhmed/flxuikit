import { useHover } from '@mantine/hooks'
import { IconChevronRight, IconSelector, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import {
  ActionIcon,
  Button,
  ButtonProps,
  DatePickerProps,
  Divider,
  Menu,
  Text,
  Tooltip
} from '../../primitive/index.js'

import AbsoluteTimeRangePicker, { Localization } from './AbsoluteTimeRangePicker.js'
import {
  DEFAULT_QUICK_RANGES,
  TimeRange,
  formatDuration,
  toTimeRangeValue,
  timeFormatter,
  AbsoluteTimeRange,
  RelativeTimeRange
} from './helper.js'
import classes from './index.module.css'

export interface TimeRangePickerProps extends TimeRangePickerBaseProps {
  value?: TimeRange
  onChange?: (value?: TimeRange) => void
  clearable?: boolean
}

export interface TimeRangePickerBaseProps extends ButtonProps {
  loading?: boolean
  placeholder?: string
  badgePlaceholder?: string
  relativeFormatter?: (relativeRange: RelativeTimeRange) => string
  absoluteFormatter?: (absoluteRange: AbsoluteTimeRange) => string
  footer?: React.ReactNode

  minDateTime?: () => Date
  maxDateTime?: () => Date
  maxDuration?: number // unit: seconds

  quickRanges?: (number | QuickRange)[]
  disableAbsoluteRanges?: boolean

  timezone?: number

  datePickerProps?: DatePickerProps<'range'>
  dateInputFormat?: (date: Date) => string
  localization?: Localization
}

type QuickRange = {
  value: number
  label?: React.ReactNode
  isFuture?: boolean
}

export const TimeRangePicker = ({
  className,
  value,
  minDateTime,
  maxDateTime,
  maxDuration,
  disableAbsoluteRanges = false,
  onChange,
  quickRanges = DEFAULT_QUICK_RANGES,
  loading,
  placeholder,
  badgePlaceholder,
  clearable,
  timezone,
  dateInputFormat,
  datePickerProps,
  localization,
  relativeFormatter,
  absoluteFormatter,
  footer,
  ...rest
}: React.PropsWithChildren<TimeRangePickerProps>) => {
  const [opened, setOpened] = useState(false)
  const [customMode, setCustomMode] = useState(false)
  const isEmptyValue = !value
  const isRelativeRange = value?.type === 'relative'
  const isFuture = isRelativeRange && value?.isFuture
  const { hovered, ref: targetRef } = useHover()

  const timeRangeValue = isEmptyValue ? undefined : toTimeRangeValue(value)
  const duration = isEmptyValue ? undefined : timeRangeValue![1] - timeRangeValue![0]

  const selectedRelativeItem = useMemo(() => {
    if (!value || value.type === 'absolute') {
      return
    }
    return quickRanges.find((it) => it === value.value)
  }, [quickRanges, value])

  const formattedAbsDateTime = useMemo(() => {
    if (!timeRangeValue) {
      return ''
    }
    if (absoluteFormatter) {
      return absoluteFormatter(value as AbsoluteTimeRange)
    }
    return `${timeFormatter(timeRangeValue[0], timezone ?? null, 'MMM D, YYYY HH:mm')} - ${timeFormatter(
      timeRangeValue[1],
      timezone ?? null,
      'MMM D, YYYY HH:mm'
    )}`
  }, [value, timeRangeValue, timezone, absoluteFormatter])

  const formattedRelativeDateTime = useMemo(() => {
    if (!value || value.type === 'absolute') {
      return ''
    }
    if (relativeFormatter) {
      return relativeFormatter(value as RelativeTimeRange)
    }
    return `${isFuture ? 'Next' : 'Past'} ${formatDuration(duration!)}`
  }, [value, duration, isFuture, relativeFormatter])

  const widthClass = disableAbsoluteRanges ? classes.widthCompact : classes.widthDefault

  return (
    <Menu
      width={customMode ? 'auto' : disableAbsoluteRanges ? 200 : 280}
      position="bottom-end"
      opened={opened}
      onOpen={() => {
        setOpened(true)
        setCustomMode(false)
      }}
      onClose={() => setOpened(false)}
    >
      <Menu.Target>
        <Tooltip label={formattedAbsDateTime} disabled={isRelativeRange || isEmptyValue} withArrow>
          <Button
            ref={targetRef}
            variant="default"
            className={clsx(classes.trigger, widthClass, className)}
            data-opened={opened}
            loading={loading}
            rightSection={
              <span className={classes.triggerIcon}>
                {clearable && !!value && hovered ? (
                  <ActionIcon
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      onChange?.()
                    }}
                  >
                    <IconX size={16} />
                  </ActionIcon>
                ) : (
                  <IconSelector size={16} />
                )}
              </span>
            }
            {...rest}
          >
            <span className={classes.triggerInner}>
              <span className={classes.badge}>
                {isEmptyValue ? badgePlaceholder || 'All' : formatDuration(duration!, true)}
              </span>
              <span
                className={clsx(
                  classes.triggerText,
                  isEmptyValue ? classes.triggerTextEmpty : classes.triggerTextFilled
                )}
              >
                {isEmptyValue
                  ? placeholder || 'Time Range'
                  : isRelativeRange
                    ? formattedRelativeDateTime
                    : formattedAbsDateTime}
              </span>
            </span>
          </Button>
        </Tooltip>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        {customMode ? (
          <AbsoluteTimeRangePicker
            value={timeRangeValue}
            minDateTime={minDateTime?.()}
            maxDateTime={maxDateTime?.()}
            maxDuration={maxDuration}
            onChange={(v) => {
              onChange?.(v)
              setOpened(false)
            }}
            onCancel={() => setOpened(false)}
            onReturnClick={() => setCustomMode(false)}
            dateInputFormat={dateInputFormat}
            datePickerProps={datePickerProps}
            localization={localization}
          />
        ) : (
          <>
            {!disableAbsoluteRanges && (
              <>
                <Menu.Item
                  rightSection={<IconChevronRight size={16} />}
                  closeMenuOnClick={false}
                  onClick={() => setCustomMode(true)}
                  className={classes.menuItem}
                >
                  {localization?.entry || 'Custom'}
                </Menu.Item>
                <Divider />
              </>
            )}

            {quickRanges.map((item) => {
              const isNumber = typeof item === 'number'
              const seconds = isNumber ? item : item.value
              const itemIsFuture = isNumber ? false : item.isFuture
              let label = isNumber ? `Past ${formatDuration(seconds)}` : item.label

              if (!label) {
                label = itemIsFuture ? `Next ${formatDuration(seconds)}` : `Past ${formatDuration(seconds)}`
              }

              return (
                <Menu.Item
                  key={seconds}
                  className={clsx(classes.menuItem, seconds === selectedRelativeItem && classes.menuItemActive)}
                  onClick={() => onChange?.({ type: 'relative', value: seconds, isFuture: itemIsFuture })}
                >
                  <Text size="sm">{label}</Text>
                </Menu.Item>
              )
            })}
          </>
        )}

        {footer && (
          <>
            <Divider className={classes.footerDivider} />
            {footer}
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}

export * from './helper.js'
