import { Select as MantineSelect, MultiSelect as MantineMultiSelect, getParsedComboboxData } from '@mantine/core'
import type {
  SelectProps as MantineSelectProps,
  MultiSelectProps as MantineMultiSelectProps,
  ComboboxItem
} from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import clsx from 'clsx'
import { useMemo } from 'react'

import classes from './index.module.css'

/* ═══════════════════════════════════════════════════════ */
/* TYPES                                                  */
/* ═══════════════════════════════════════════════════════ */

export interface CreatableProps {
  creatable?: boolean
  getCreateLabel?: (query: string) => string
  onCreate?: (query: string) => ComboboxItem | null | undefined
}

export interface SelectProps extends MantineSelectProps, CreatableProps {}
export interface MultiSelectProps extends MantineMultiSelectProps, CreatableProps {}

/* ═══════════════════════════════════════════════════════ */
/* CONSTANTS                                              */
/* ═══════════════════════════════════════════════════════ */

const DEFAULT_GET_CREATE_LABEL = (query: string) => `+ Create ${query}`
const CREATE_VALUE_PREFIX = '$create:'
const DEFAULT_GET_CREATE_VALUE = (query: string) => `${CREATE_VALUE_PREFIX}${query}`

/* ═══════════════════════════════════════════════════════ */
/* HOOK                                                   */
/* ═══════════════════════════════════════════════════════ */

type CreatableInput = {
  creatable?: boolean
  getCreateLabel?: (query: string) => string
  onCreate?: (query: string) => ComboboxItem | null | undefined
  data?: any
  searchable?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  value?: any
  defaultValue?: any
  onChange?: (...args: any[]) => any
}

function useCreateableSelect<T extends CreatableInput>(props: T): T {
  const {
    creatable = false,
    getCreateLabel = DEFAULT_GET_CREATE_LABEL,
    onCreate,
    searchable,
    data,
    searchValue: searchValueProp,
    onSearchChange: onSearchChangeProp,
    value: valueProp,
    defaultValue,
    onChange,
    ...rest
  } = props

  if (creatable && typeof onCreate !== 'function') {
    throw new Error('[@flex/uikit] `onCreate` is required when `creatable` is true')
  }

  const [value, setValue] = useUncontrolled({
    value: valueProp,
    onChange,
    defaultValue
  })

  const [searchValue, setSearchValue] = useUncontrolled<string | undefined>({
    value: searchValueProp,
    onChange: (val: string | undefined) => {
      if (val !== undefined && onSearchChangeProp) {
        onSearchChangeProp(val)
      }
    },
    defaultValue: ''
  })

  const parsedData = useMemo(() => {
    const items = getParsedComboboxData(data)
    if (!creatable || !searchValue) {
      return items
    }
    const placeholder = {
      label: getCreateLabel(searchValue),
      value: DEFAULT_GET_CREATE_VALUE(searchValue)
    }
    if (
      items.findIndex((item: any) => {
        if ('value' in item) {
          return item.value === searchValue
        }
        return false
      }) === -1
    ) {
      items.push(placeholder)
    }
    return items
  }, [data, searchValue, creatable, getCreateLabel])

  const handleChange = (nextValue: any, option?: any) => {
    const isMultiSelect = Array.isArray(nextValue)
    if (creatable) {
      const values = Array.isArray(nextValue) ? nextValue : [nextValue]
      const clickedCreateItem = values.some((i: any) => typeof i === 'string' && i.startsWith(CREATE_VALUE_PREFIX))

      if (clickedCreateItem) {
        const newItemValue = isMultiSelect
          ? values.find((i: any) => typeof i === 'string' && i.startsWith(CREATE_VALUE_PREFIX))
          : nextValue
        if (newItemValue) {
          const createdItem = onCreate!(newItemValue?.slice(CREATE_VALUE_PREFIX.length))
          if (createdItem) {
            const nextVal = isMultiSelect
              ? ([...values.filter((i: any) => !i?.startsWith(CREATE_VALUE_PREFIX)), createdItem.value] as string[])
              : createdItem.value
            setValue(nextVal, isMultiSelect ? undefined : option)
            setSearchValue('')
            return
          }
        }
      }
    }

    setValue(nextValue, isMultiSelect ? undefined : option)
  }

  return {
    ...rest,
    data: parsedData,
    value,
    onChange: handleChange,
    searchable: searchable || creatable,
    searchValue: searchValue || '',
    onSearchChange: setSearchValue
  } as T
}

/* ═══════════════════════════════════════════════════════ */
/* SELECT                                                 */
/* ═══════════════════════════════════════════════════════ */

export function Select(props: SelectProps) {
  const { size = 'md', ...rest } = props
  const allProps = useCreateableSelect(rest)

  return (
    <MantineSelect
      {...allProps}
      size={size}
      value={allProps.value || null}
      checkIconPosition="right"
      classNames={{
        wrapper: classes.wrapper,
        input: clsx(classes.input, classes[`size-${size}`]),
        dropdown: clsx(classes.dropdown, classes[`dropdown-${size}`]),
        options: classes.options,
        option: clsx(classes.option, classes[`option-${size}`]),
        empty: classes.empty,
        groupLabel: classes.groupLabel,
        label: classes.label,
        error: classes.error,
        description: classes.description
      }}
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 120 },
        shadow: 'md',
        ...props.comboboxProps
      }}
    />
  )
}
/* ═══════════════════════════════════════════════════════ */
/* MULTISELECT                                            */
/* ═══════════════════════════════════════════════════════ */

export function MultiSelect(props: MultiSelectProps) {
  const { size = 'md', ...rest } = props
  const allProps = useCreateableSelect(rest)

  return (
    <MantineMultiSelect
      {...allProps}
      size={size}
      checkIconPosition="right"
      classNames={{
        wrapper: classes.wrapper,
        input: clsx(classes.input, classes[`size-${size}`]),
        dropdown: clsx(classes.dropdown, classes[`dropdown-${size}`]),
        options: classes.options,
        option: clsx(classes.option, classes[`option-${size}`]),
        empty: classes.empty,
        groupLabel: classes.groupLabel,
        pill: classes.pill,
        label: classes.label,
        error: classes.error,
        description: classes.description
      }}
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 120 },
        shadow: 'md',
        ...props.comboboxProps
      }}
    />
  )
}
