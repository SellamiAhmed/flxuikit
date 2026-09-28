import { IconDots } from '@tabler/icons-react'
import { forwardRef } from 'react'

import { truncateForGroup } from '../../primitive/Avatar/helpers.js'
import { ActionIcon, Tooltip } from '../../primitive/index.js'
import { Avatar } from '../../primitive/index.js'

import { EVENT_CARD_DENSITY_THRESHOLDS } from './constants.js'
import classes from './EventCard.module.css'
import { getEventColorVars } from './eventColors.js'
import { EventContextMenu } from './EventContextMenu.js'
import type { CalendarEvent, PositionedEvent } from './types.js'

export interface EventCardProps {
  positioned: PositionedEvent
  onClick?: (event: CalendarEvent) => void
  onEdit?: (event: CalendarEvent) => void
  onDuplicate?: (event: CalendarEvent) => void
  onDelete?: (event: CalendarEvent) => void
}

type EventCardDensity = 'full' | 'compact' | 'minimal'

/** Horizontal breathing room between a card and its column edge / neighbors, in px. */
const CARD_GUTTER_PX = 4

function getDensity(height: number): EventCardDensity {
  if (height >= EVENT_CARD_DENSITY_THRESHOLDS.full) return 'full'
  if (height >= EVENT_CARD_DENSITY_THRESHOLDS.compact) return 'compact'
  return 'minimal'
}

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' })

function formatTimeRange(start: Date, end: Date): string {
  return `${TIME_FORMAT.format(start)} - ${TIME_FORMAT.format(end)}`
}

function formatStartTimeOnly(start: Date): string {
  return TIME_FORMAT.format(start)
}

export const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  ({ positioned, onClick, onEdit, onDuplicate, onDelete }, ref) => {
    const { event, top, height, columnIndex, columnCount } = positioned
    const colorVars = getEventColorVars(event.color)
    const density = getDensity(height)
    const hasMenuActions = onEdit || onDuplicate || onDelete

    const cardContent = (
      <div
        ref={ref}
        className={classes.card}
        data-strikethrough={event.strikethrough || undefined}
        data-density={density}
        style={{
          ...colorVars,
          top,
          height,
          left: `calc(${(columnIndex / columnCount) * 100}% + ${CARD_GUTTER_PX}px)`,
          width: `calc(${(1 / columnCount) * 100}% - ${CARD_GUTTER_PX * 2}px)`
        }}
        onClick={() => onClick?.(event)}
        role="button"
        tabIndex={0}
      >
        {event.icon && <span className={classes.icon}>{event.icon}</span>}

        <div className={classes.body}>
          {density === 'full' && (
            <>
              <span className={classes.title}>{event.title}</span>
              <span className={classes.time}>{formatTimeRange(event.start, event.end)}</span>
              {event.location && <span className={classes.location}>📍 {event.location}</span>}
            </>
          )}

          {density === 'compact' && (
            <span className={classes.titleInlineRow}>
              <span className={classes.title}>{event.title}</span>
              <span className={classes.timeInline}>{formatStartTimeOnly(event.start)}</span>
            </span>
          )}

          {density === 'minimal' && <span className={classes.title}>{event.title}</span>}
        </div>

        {density === 'full' &&
          event.attendees &&
          event.attendees.length > 0 &&
          (() => {
            const { visible, overflow } = truncateForGroup(event.attendees, 3)
            return (
              <div className={classes.footer}>
                <div className={classes.avatarStack}>
                  {visible.map((a) => (
                    <Avatar key={a.id} src={a.avatarUrl} size="xs" name={a.name} />
                  ))}
                  {overflow > 0 && <span className={classes.overflowBadge}>+{overflow}</span>}
                </div>
                {hasMenuActions && (
                  <EventContextMenu event={event} onEdit={onEdit} onDuplicate={onDuplicate} onDelete={onDelete}>
                    <ActionIcon
                      variant="subtle"
                      size="xs"
                      style={{ color: 'var(--event-text)' }}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      aria-label="Event options"
                    >
                      <IconDots size={14} />
                    </ActionIcon>
                  </EventContextMenu>
                )}
              </div>
            )
          })()}
      </div>
    )

    if (density === 'full') return cardContent

    return (
      <Tooltip
        label={`${event.title} · ${formatTimeRange(event.start, event.end)}${event.location ? ` · ${event.location}` : ''}`}
        withArrow
        openDelay={300}
      >
        {cardContent}
      </Tooltip>
    )
  }
)

EventCard.displayName = 'EventCard'
