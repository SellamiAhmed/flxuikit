import { IconX } from '@tabler/icons-react'

import { ActionIcon, Anchor, Box, Group, MantineText } from '../../../../primitive/index.js'
import type { AppSidenavNotification } from '../../types.js'

import classes from './index.module.css'

export interface NotificationsProps {
  notificationsAriaLabel: string
  notifications: AppSidenavNotification[]
  onDismiss: (notification: AppSidenavNotification) => void
}

export const Notifications = ({ notificationsAriaLabel, notifications, onDismiss }: NotificationsProps) => {
  return (
    <section className={classes.notifications} aria-label={notificationsAriaLabel}>
      {notifications.length > 0 ? (
        notifications.map((item) => (
          <Box component="article" key={item.id} className={classes.card}>
            <Group className={classes.cardHeader} gap={8} wrap="nowrap">
              <Group className={classes.cardTitleWrap} gap={8} wrap="nowrap">
                <span className={classes.cardIcon} aria-hidden="true">
                  {item.icon}
                </span>
                <MantineText component="h3" className={classes.cardTitle}>
                  {item.title}
                </MantineText>
              </Group>

              {item.dismissible !== false && (
                <ActionIcon
                  variant="subtle"
                  aria-label={`Dismiss ${item.title}`}
                  className={classes.dismissButton}
                  onClick={() => onDismiss(item)}
                >
                  <IconX size={14} />
                </ActionIcon>
              )}
            </Group>

            <MantineText className={classes.cardDescription}>{item.description}</MantineText>

            {(item.href || item.onAction) && (
              <Anchor className={classes.cardLink} href={item.href} underline="never" onClick={() => item.onAction?.()}>
                {item.linkLabel ?? 'Update now'} <span aria-hidden="true">→</span>
              </Anchor>
            )}
          </Box>
        ))
      ) : (
        <MantineText className={classes.emptyState}>No active announcements.</MantineText>
      )}
    </section>
  )
}
