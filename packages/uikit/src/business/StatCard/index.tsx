import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react'
import clsx from 'clsx'

import { Card, CardProps, Group, Stack, Typography, TypographyProps } from '../../primitive/index.js'

import classes from './index.module.css'

export interface StatCardProps extends CardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  titleProps?: TypographyProps
  valueProps?: TypographyProps
}

export const StatCard = ({
  title,
  value,
  icon,
  titleProps,
  valueProps,
  children,
  className,
  ...rest
}: StatCardProps) => {
  return (
    <Card {...rest} className={clsx(classes.card, className)}>
      <Group justify="space-between" align="flex-start" className={classes.header}>
        <Typography variant="label-lg" className={classes.title} {...titleProps}>
          {title}
        </Typography>
        {icon && (
          <span className={classes.icon} aria-hidden="true">
            {icon}
          </span>
        )}
      </Group>

      <Stack gap={4} className={classes.body}>
        <Typography variant="headline-lg" className={classes.value} {...valueProps}>
          {value}
        </Typography>
        {children}
      </Stack>
    </Card>
  )
}

export interface StatCardTrendProps {
  value: number
  direction: 'up' | 'down'
  description?: string
  invertColor?: boolean
}

const Trend = ({ value, direction, description, invertColor }: StatCardTrendProps) => {
  const isPositive = invertColor ? direction === 'down' : direction === 'up'
  const Icon = direction === 'up' ? IconArrowUpRight : IconArrowDownRight

  return (
    <Group gap={4} className={classes.trend} wrap="nowrap">
      <span
        className={clsx(classes.trendIcon, isPositive ? classes.trendPositive : classes.trendNegative)}
        aria-hidden="true"
      >
        <Icon size={14} />
      </span>
      <Typography
        variant="label-md"
        className={clsx(classes.trendValue, isPositive ? classes.trendPositive : classes.trendNegative)}
      >
        {value}%
      </Typography>
      {description && (
        <Typography variant="label-md" c="dimmed" className={classes.trendDescription}>
          {description}
        </Typography>
      )}
    </Group>
  )
}

StatCard.Trend = Trend
