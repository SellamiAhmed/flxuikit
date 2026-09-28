import { Drawer, Text, Avatar as MantineAvatarPlaceholder } from '../../primitive/index.js'
import { Avatar } from '../../primitive/index.js'

import { getEventColorVars } from './eventColors.js'
import classes from './EventDetailPanel.module.css'
import type { CalendarEvent } from './types.js'

export interface EventDetailPanelProps {
  event: CalendarEvent | null
  opened: boolean
  onClose: () => void
  onEdit?: (event: CalendarEvent) => void
  onDelete?: (event: CalendarEvent) => void
}

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })
const DATE_FORMAT = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

function formatTimeRange(start: Date, end: Date): string {
  return `${TIME_FORMAT.format(start)} – ${TIME_FORMAT.format(end)}`
}

export function EventDetailPanel({ event, opened, onClose, onEdit, onDelete }: EventDetailPanelProps) {
  // Render the Drawer even when event is null, so its close transition
  // still plays correctly instead of the content vanishing mid-animation.
  const colorVars = event ? getEventColorVars(event.color) : {}

  return (
    <Drawer opened={opened} onClose={onClose} position="right" size="md" title={event?.title ?? ''}>
      {event && (
        <div className={classes.content} style={colorVars}>
          <div className={classes.colorBar} />

          <div className={classes.section}>
            <Text size="sm" fw={600} className={classes.dateLine}>
              {DATE_FORMAT.format(event.start)}
            </Text>
            <Text size="sm" c="dimmed">
              {formatTimeRange(event.start, event.end)}
            </Text>
          </div>

          {event.location && (
            <div className={classes.section}>
              <Text size="sm" fw={600}>
                📍 Location
              </Text>
              <Text size="sm" c="dimmed">
                {event.location}
              </Text>
            </div>
          )}

          {event.attendees && event.attendees.length > 0 && (
            <div className={classes.section}>
              <Text size="sm" fw={600} mb={8}>
                Attendees ({event.attendees.length})
              </Text>
              <div className={classes.attendeeList}>
                {event.attendees.map((a) => (
                  <div key={a.id} className={classes.attendeeRow}>
                    <Avatar src={a.avatarUrl} size="sm" name={a.name} />
                    <Text size="sm">{a.name}</Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(onEdit || onDelete) && (
            <div className={classes.actions}>
              {onEdit && (
                <button className={classes.editButton} onClick={() => onEdit(event)}>
                  Edit
                </button>
              )}
              {onDelete && (
                <button className={classes.deleteButton} onClick={() => onDelete(event)}>
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Drawer>
  )
}
