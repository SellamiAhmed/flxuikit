import { getParsedComboboxData, MultiSelect as MantineMultiSelect, Select as MantineSelect } from '@mantine/core'
import type {
  ComboboxItem,
  ComboboxData,
  MultiSelectProps as MantineMultiSelectProps,
  SelectProps as MantineSelectProps
} from '@mantine/core'
import { useUncontrolled } from '@mantine/hooks'
import { useMemo } from 'react'

import classes from './index.module.css'

export interface SelectProps extends MantineSelectProps {
  creatable?: boolean
  getCreateLabel?: (query: string) => string
  onCreate?: (query: string) => ComboboxItem | null | undefined
}

export interface MultiSelectProps extends MantineMultiSelectProps {
  creatable?: boolean
  getCreateLabel?: (query: string) => string
  onCreate?: (query: string) => ComboboxItem | null | undefined
}

const defaultGetCreateLabel = (query: string) => `+ Create ${query}`
const CREATE_VALUE_PREFIX = '$create:'
const defaultGetCreateValue = (query: string) => `${CREATE_VALUE_PREFIX}${query}`

/* ── Internal hook — untyped, logic only ── */
function useCreateableSelect(props: any): any {
  const { creatable = false, getCreateLabel = defaultGetCreateLabel, onCreate, searchable, ...rest } = props

  if (creatable && typeof onCreate !== 'function') {
    throw new Error('`onCreate` is required when `creatable` is true')
  }

  const [value, setValue] = useUncontrolled<any>({
    value: props.value,
    onChange: props.onChange,
    defaultValue: props.defaultValue
  })

  const [searchValue, setSearchValue] = useUncontrolled<string | undefined>({
    value: props.searchValue,
    onChange: (val: string | undefined) => props.onSearchChange?.(val ?? ''),
    defaultValue: ''
  })

  const parsedData = useMemo(() => {
    const parsedData = getParsedComboboxData(props.data)
    if (!creatable || !searchValue) {
      return parsedData
    }
    const placeholder = {
      label: getCreateLabel(searchValue),
      value: defaultGetCreateValue(searchValue)
    }
    if (
      parsedData.findIndex((item: any) => {
        if ('value' in item) {
          return item.value === placeholder.value.slice(CREATE_VALUE_PREFIX.length)
        }
        return false
      }) === -1
    ) {
      parsedData.push(placeholder)
    }
    return parsedData
  }, [props.data, searchValue])

  const handleChange = (value: any, option: ComboboxItem) => {
    const isMultiSelect = Array.isArray(value)
    if (creatable) {
      const values = Array.isArray(value) ? value : [value]
      const clickedCreateItem = values.some((i: any) => typeof i === 'string' && i.startsWith(CREATE_VALUE_PREFIX))

      if (clickedCreateItem) {
        const newItemValue = isMultiSelect
          ? values.find((i: any) => typeof i === 'string' && i.startsWith(CREATE_VALUE_PREFIX))
          : value
        if (newItemValue) {
          const createdItem = onCreate!((newItemValue as string).slice(CREATE_VALUE_PREFIX.length))
          if (createdItem) {
            const nextValue = isMultiSelect
              ? ([
                  ...values.filter((i: any) => !(typeof i === 'string' && i.startsWith(CREATE_VALUE_PREFIX))),
                  createdItem.value
                ] as string[])
              : createdItem.value
            setValue(nextValue, isMultiSelect ? undefined : option)
            setSearchValue('')
            return
          }
        }
      }
    }

    setValue(value, isMultiSelect ? undefined : option)
  }

  return {
    ...rest,
    data: parsedData,
    value,
    onChange: handleChange,
    searchable: searchable || creatable,
    searchValue,
    onSearchChange: setSearchValue
  }
}

/* ── Select (single) ── */

export function Select(props: SelectProps) {
  const allProps = useCreateableSelect(props)

  return (
    <MantineSelect
      {...allProps}
      value={typeof allProps.value === 'string' ? allProps.value : null}
      classNames={{
        input: classes.input,
        error: classes.error,
        dropdown: classes.dropdown,
        option: classes.option,
        empty: classes.empty,
        groupLabel: classes.groupLabel
      }}
    />
  )
}

/* ── MultiSelect ── */

export function MultiSelect(props: MultiSelectProps) {
  const allProps = useCreateableSelect(props)

  return (
    <MantineMultiSelect
      {...allProps}
      value={Array.isArray(allProps.value) ? allProps.value : allProps.value ? [allProps.value] : []}
      onChange={allProps.onChange as (value: string[]) => void}
      classNames={{
        input: classes.input,
        error: classes.error,
        dropdown: classes.dropdown,
        option: classes.option,
        empty: classes.empty,
        groupLabel: classes.groupLabel
      }}
    />
  )
}
