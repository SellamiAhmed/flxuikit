import { MantineSize, TextInputProps } from '../../primitive/index.js'

export interface DateTimePickerProps extends Omit<TextInputProps, 'value' | 'onChange' | 'defaultValue'> {
  placeholder?: string
  format?: string
  formatter?: (val: Date) => string
  /** @deprecated use `formatter` instead to display the time in any timezone. */
  utcOffset?: number
  defaultValue?: Date
  value?: Date
  startDate?: Date
  endDate?: Date
  onChange?: (val: Date) => void
  disable?: boolean
  withinPortal?: boolean
  loading?: boolean
  size?: MantineSize
  footer?: React.ReactNode
}
