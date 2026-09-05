import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react'
import clsx from 'clsx'

import { Card, CardProps, Group, Stack, Typography, TypographyProps } from '../../primitive/index.js'

import classes from './index.module.css'

type IconTone = 'brand' | 'neutral' | 'warning' | 'success' | 'danger'

const iconToneClass: Record<IconTone, string | undefined> = {
  brand: undefined, // .icon's default background already covers this
  neutral: classes.iconNeutral,
  warning: classes.iconWarning,
  success: classes.iconSuccess,
  danger: classes.iconDanger
}

export interface StatCardProps extends CardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  /** Visual tone of the icon badge background/color. Defaults to 'brand' (existing behavior, unchanged). */
  iconTone?: IconTone
  titleProps?: TypographyProps
  valueProps?: TypographyProps
  /** Marks the card as clickable: adds hover/active/focus states and a pointer cursor. */
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export const StatCard = ({
  title,
  value,
  icon,
  iconTone = 'brand',
  titleProps,
  valueProps,
  children,
  className,
  onClick,
  ...rest
}: StatCardProps) => {
  return (
    <Card
      {...rest}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      className={clsx(classes.card, onClick && classes.interactive, className)}
    >
      <Group justify="space-between" align="flex-start" className={classes.header}>
        <Typography variant="label-lg" className={classes.title} {...titleProps}>
          {title}
        </Typography>
        {icon && (
          <span className={clsx(classes.icon, iconToneClass[iconTone])} aria-hidden="true">
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
