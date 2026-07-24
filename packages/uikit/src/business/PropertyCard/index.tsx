import clsx from 'clsx'
import { createContext, useContext, useMemo } from 'react'

import {
    Card,
    CardProps,
    DividerProps,
    Group,
    GroupProps,
    Divider as MantineDivider,
    Stack,
    Typography,
    TypographyProps
} from '../../primitive/index.js'

import classes from './index.module.css'

export interface PropertyCardProps extends CardProps {
  title?: string
  labelProps?: TypographyProps
  valueProps?: TypographyProps
}

interface PropertyCardContextValue {
  labelProps?: TypographyProps
  valueProps?: TypographyProps
}

const PropertyCardContext = createContext<PropertyCardContextValue | undefined>(undefined)

const PropertyCard = ({
  title,
  children,
  labelProps,
  valueProps,
  className,
  ...rest
}: PropertyCardProps) => {
  const contextValue = useMemo(
    () => ({
      labelProps,
      valueProps
    }),
    [labelProps, valueProps]
  )

  return (
    <Card {...rest} className={clsx(classes.card, className)}>
      {title && (
        <Typography variant="headline-sm" className={classes.title}>
          {title}
        </Typography>
      )}
      <PropertyCardContext.Provider value={contextValue}>
        <Stack className={classes.stack}>{children}</Stack>
      </PropertyCardContext.Provider>
    </Card>
  )
}

export interface PropertyCardItemProps extends GroupProps {
  label: string
  labelProps?: TypographyProps
  valueProps?: TypographyProps
}

const Item = ({
  label,
  children,
  labelProps,
  valueProps,
  className,
  ...rest
}: PropertyCardItemProps) => {
  const context = useContext(PropertyCardContext)
  const mergedLabelProps = {
    ...context?.labelProps,
    ...labelProps
  }
  const mergedValueProps = {
    ...context?.valueProps,
    ...valueProps
  }

  return (
    <Group wrap="nowrap" className={clsx(classes.item, className)} {...rest}>
      <Typography variant="label-lg" className={classes.label} {...mergedLabelProps}>
        {label}
      </Typography>
      <Typography variant="body-lg" className={classes.value} {...mergedValueProps}>
        {children}
      </Typography>
    </Group>
  )
}

const Divider = ({ className, ...props }: DividerProps) => {
  return <MantineDivider className={clsx(classes.divider, className)} {...props} />
}

PropertyCard.Item = Item
PropertyCard.Divider = Divider

export { PropertyCard }
