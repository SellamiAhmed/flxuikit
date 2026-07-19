import { ActionIcon, Group, Stack } from '../../../primitive/index.js'
import classes from '../index.module.css'
import type { AppSidenavUtilityAction } from '../types.js'

interface BottomUtilitiesProps {
  utilitiesAriaLabel: string
  utilityActions: AppSidenavUtilityAction[]
}

export const BottomUtilities = ({ utilitiesAriaLabel, utilityActions }: BottomUtilitiesProps) => {
  return (
    <Stack className={classes.bottomUtilities} aria-label={utilitiesAriaLabel}>
      <Group gap={8} wrap="nowrap" justify="center">
        {utilityActions.map((action) =>
          action.href ? (
            <ActionIcon
              key={action.id}
              component="a"
              href={action.href}
              aria-label={action.ariaLabel}
              className={classes.iconButton}
              variant="subtle"
            >
              {action.icon}
            </ActionIcon>
          ) : (
            <ActionIcon
              key={action.id}
              type="button"
              aria-label={action.ariaLabel}
              className={classes.iconButton}
              variant="subtle"
              onClick={action.onClick}
            >
              {action.icon}
            </ActionIcon>
          )
        )}
      </Group>
    </Stack>
  )
}
