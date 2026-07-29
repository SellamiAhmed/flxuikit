import { ErrorMessage } from '@hookform/error-message'
import { omit } from 'lodash-es'
import React, { Fragment } from 'react'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'

import {
  Box,
  Flex,
  FlexProps,
  HoverCard,
  HoverCardProps,
  Radio,
  RadioGroupProps,
  RadioProps,
  Tooltip
} from '../../primitive/index.js'

import classes from './RadioGroup.module.css'

interface RadioGroupItemData extends RadioProps {
  tooltip?: React.ReactNode
  tooltipProps?: {
    useTooltip?: boolean
  } & HoverCardProps
}

export interface FormRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  name: string
  rules?: RegisterOptions
  data: RadioGroupItemData[]
  direction?: FlexProps['direction']
  gap?: FlexProps['gap']
}

export const FormRadioGroup = ({
  name,
  rules,
  onChange,
  data,
  direction,
  gap = 'md',
  ...rest
}: FormRadioGroupProps) => {
  const { control, formState, getFieldState } = useFormContext()
  const { error } = getFieldState(name, formState)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const { onChange: handleChange, ...restField } = field
        return (
          <Radio.Group
            {...rest}
            onChange={(value) => {
              handleChange(value)
              onChange?.(value)
            }}
            {...restField}
            error={error ? <ErrorMessage errors={formState.errors} name={name} /> : undefined}
          >
            <Flex direction={direction} gap={gap} className={classes.group}>
              {data.map((i) => {
                const radioProps = omit(i, 'tooltipProps', 'tooltip')
                return (
                  <Fragment key={i.value as any}>
                    {i.tooltip ? (
                      i.tooltipProps?.useTooltip ? (
                        <Tooltip label={i.tooltip} withArrow refProp="rootRef">
                          <Radio {...radioProps} />
                        </Tooltip>
                      ) : (
                        <HoverCard withArrow withinPortal {...i.tooltipProps}>
                          <HoverCard.Target>
                            <Box>
                              <Radio {...radioProps} />
                            </Box>
                          </HoverCard.Target>
                          <HoverCard.Dropdown className={classes.dropdown}>{i.tooltip}</HoverCard.Dropdown>
                        </HoverCard>
                      )
                    ) : (
                      <Radio {...radioProps} />
                    )}
                  </Fragment>
                )
              })}
            </Flex>
          </Radio.Group>
        )
      }}
    />
  )
}
