import { Menu } from '../../primitive/index.js'

import type { CalendarEvent } from './types.js'

export interface EventContextMenuProps {
  event: CalendarEvent
  children: React.ReactElement
  onEdit?: (event: CalendarEvent) => void
  onDelete?: (event: CalendarEvent) => void
  onDuplicate?: (event: CalendarEvent) => void
}

export function EventContextMenu({ event, children, onEdit, onDelete, onDuplicate }: EventContextMenuProps) {
  // No actions configured — render the trigger with no menu at all, rather
  // than an empty dropdown that opens to nothing on click.
  if (!onEdit && !onDelete && !onDuplicate) return children

  return (
    <Menu position="bottom-end" withinPortal shadow="md">
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
        {onEdit && <Menu.Item onClick={() => onEdit(event)}>Edit</Menu.Item>}
        {onDuplicate && <Menu.Item onClick={() => onDuplicate(event)}>Duplicate</Menu.Item>}
        {(onEdit || onDuplicate) && onDelete && <Menu.Divider />}
        {onDelete && (
          <Menu.Item color="danger" onClick={() => onDelete(event)}>
            Delete
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
