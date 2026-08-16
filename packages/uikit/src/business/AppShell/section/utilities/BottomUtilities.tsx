import clsx from 'clsx'

import { ActionIcon, Group, Stack } from '../../../../primitive/index.js'
import type { AppSidenavUtilityAction } from '../../types.js'

import classes from './index.module.css'

export interface BottomUtilitiesProps {
  utilitiesAriaLabel: string
  utilityActions: AppSidenavUtilityAction[]
  collapsed?: boolean
}

export const BottomUtilities = ({ utilitiesAriaLabel, utilityActions, collapsed = false }: BottomUtilitiesProps) => {
  return (
    <Stack
      className={clsx(classes.bottomUtilities, collapsed && classes.bottomUtilitiesCollapsed)}
      aria-label={utilitiesAriaLabel}
    >
      <Group gap={8} wrap="nowrap" justify="center" className={clsx(collapsed && classes.utilitiesGroupCollapsed)}>
        {utilityActions.map((action) => {
          const iconButtonClassName = clsx(classes.iconButton, collapsed && classes.railIconButton)

          if (action.renderLink) {
            return (
              <span key={action.id}>
                {action.renderLink({
                  className: iconButtonClassName,
                  'aria-label': action.ariaLabel,
                  onClick: () => action.onClick?.()
                })}
              </span>
            )
          }

          return action.href ? (
            <ActionIcon
              key={action.id}
              component="a"
              href={action.href}
              aria-label={action.ariaLabel}
              className={iconButtonClassName}
              variant="subtle"
            >
              {action.icon}
            </ActionIcon>
          ) : (
            <ActionIcon
              key={action.id}
              type="button"
              aria-label={action.ariaLabel}
              className={iconButtonClassName}
              variant="subtle"
              onClick={action.onClick}
            >
              {action.icon}
            </ActionIcon>
          )
        })}
      </Group>
    </Stack>
  )
}
