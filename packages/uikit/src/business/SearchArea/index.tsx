import { IconEraser, IconRefresh, IconX } from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import { DefaultValues, FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'

import { useDebouncedValue, useURLQueryState } from '../../hooks/index.js'
import { Button, Group, Stack } from '../../primitive/index.js'
import { FormDatePicker } from '../Form/DatePicker.js'
import { FormTimeRangePicker } from '../Form/FormTimeRangePicker.js'
import { FormMultiSelect, FormSelect, FormTextInput } from '../Form/index.js'
import { TimeRange } from '../TimeRangePicker/helper.js'

import classes from './index.module.css'

export type TSearchAreaValue = string | string[] | Date | TimeRange | undefined

interface IFormItemBase {
  name: string
  placeholder?: string
}

interface IFormItemText extends IFormItemBase {
  type: 'text'
}

interface IFormItemDatePicker extends IFormItemBase {
  type: 'datepicker'
}

interface IFormItemSelect extends IFormItemBase {
  type: 'select'
  data: Array<{ label: string; value: string }>
}

interface IFormItemMultiSelect extends IFormItemBase {
  type: 'multiselect'
  data: Array<{ label: string; value: string }>
}

interface IFormItemTimeRangePicker extends IFormItemBase {
  type: 'timerangepicker'
}

export type FormItem =
  IFormItemText | IFormItemSelect | IFormItemDatePicker | IFormItemTimeRangePicker | IFormItemMultiSelect

export interface SearchAreaProps<T extends FieldValues> {
  data: FormItem[]
  onSubmit: (values: T) => void
  onRefresh?: () => void
  recoverFromURLEnabled?: boolean
  debugEnabled?: boolean
  formStateQueryKey?: string
  clearFiltersText?: string
  defaultValues?: DefaultValues<T> // ← RHF's exact type, not Partial<T>
}

export const DEFAULT_FORM_STATE_KEY = '__fs'

interface FormItemRenderProps<T extends FieldValues> {
  data: FormItem
  form: UseFormReturn<T>
  onSubmit: () => void
  defaultValue: TSearchAreaValue
  resetSeed: number
}

function FormItemRender<T extends FieldValues>({
  data,
  form,
  onSubmit,
  defaultValue,
  resetSeed
}: FormItemRenderProps<T>) {
  const { name, placeholder, type } = data
  const [keyword, setKeyword] = useState<TSearchAreaValue>(defaultValue)
  const [debouncedKeyword] = useDebouncedValue(keyword, 800)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (resetSeed > 0) {
      setKeyword(defaultValue)
    }
  }, [resetSeed, defaultValue])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (type === 'text') {
      triggerSubmit()
    }
  }, [debouncedKeyword])

  const triggerSubmit = () => onSubmit?.()

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      triggerSubmit()
    }
  }

  switch (type) {
    case 'text':
      return (
        <FormTextInput
          name={name}
          value={(keyword as string) ?? ''}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={placeholder ?? ''}
          onKeyDown={onKeyDown}
          rightSection={
            !!keyword && (
              <IconX
                size={14}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setKeyword('')
                  form.setValue(name as any, '' as any)
                  triggerSubmit()
                }}
              />
            )
          }
          className={classes.filterItem}
        />
      )

    case 'select':
      return (
        <FormSelect
          name={name}
          data={(data as IFormItemSelect).data}
          value={(keyword as string) || null}
          placeholder={placeholder ?? ''}
          onChange={(val) => {
            setKeyword(val ?? '')
            triggerSubmit()
          }}
          clearable
          searchable
          className={classes.filterItem}
        />
      )

    case 'multiselect':
      return (
        <FormMultiSelect
          name={name}
          data={(data as IFormItemMultiSelect).data}
          value={(keyword as string[]) ?? []}
          placeholder={placeholder ?? ''}
          onChange={(val) => {
            setKeyword(val ?? [])
            triggerSubmit()
          }}
          clearable
          searchable
          className={classes.filterItem}
        />
      )

    case 'datepicker':
      return (
        <FormDatePicker
          name={name}
          value={keyword ? (typeof keyword === 'string' ? new Date(keyword) : (keyword as Date)) : null}
          placeholder={placeholder ?? ''}
          onChange={(val) => {
            setKeyword((val as Date) ?? undefined)
            triggerSubmit()
          }}
          clearable
          className={classes.filterItem}
        />
      )

    case 'timerangepicker':
      return (
        <FormTimeRangePicker
          name={name}
          value={(keyword as TimeRange) ?? undefined}
          placeholder={placeholder ?? ''}
          clearable
          onChange={(val) => {
            setKeyword(val)
            triggerSubmit()
          }}
          className={classes.filterItem}
        />
      )

    default:
      return null
  }
}

export function SearchArea<T extends FieldValues>(props: SearchAreaProps<T>) {
  const { data, onSubmit, onRefresh, recoverFromURLEnabled, defaultValues, formStateQueryKey, clearFiltersText } = props

  const [resetSeed, setResetSeed] = useState(0)
  const [formState, setFormState] = useURLQueryState(formStateQueryKey ?? DEFAULT_FORM_STATE_KEY, defaultValues)

  const state = recoverFromURLEnabled ? formState : defaultValues
  const form = useForm<T>({ defaultValues: state as DefaultValues<T> }) // ← cast here

  const handleSubmit = () => {
    const values = form.getValues()
    onSubmit(values)
    if (recoverFromURLEnabled) {
      setFormState(values)
    }
  }

  const handleReset = () => {
    setResetSeed((s) => s + 1)
    form.reset(defaultValues)
    onSubmit(form.getValues())
    if (recoverFromURLEnabled) {
      setFormState(defaultValues as any)
    }
  }

  const handleRefresh = () => {
    onRefresh?.()
  }

  useEffect(() => {
    if (recoverFromURLEnabled) {
      handleSubmit()
    }
  }, [])

  return (
    <FormProvider {...form}>
      <Stack className={classes.root} gap={0}>
        <Group className={classes.row} align="center" wrap="wrap">
          {data.map((item) => (
            <FormItemRender<T>
              key={item.name}
              data={item}
              form={form}
              onSubmit={handleSubmit}
              defaultValue={(state as any)?.[item.name]}
              resetSeed={resetSeed}
            />
          ))}

          <Group className={classes.actions} gap="xs">
            <Button
              variant="subtle"
              size="compact-sm"
              leftSection={<IconEraser size={14} />}
              onClick={handleReset}
              className={classes.clearButton}
            >
              {clearFiltersText ?? 'Clear Filters'}
            </Button>

            {onRefresh && (
              <Button
                variant="subtle"
                size="compact-sm"
                leftSection={<IconRefresh size={14} />}
                onClick={handleRefresh}
                className={classes.refreshButton}
              >
                Refresh
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
    </FormProvider>
  )
}
