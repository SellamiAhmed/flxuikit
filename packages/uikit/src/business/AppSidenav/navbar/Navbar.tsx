import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'

import { Anchor, Collapse, UnstyledButton } from '../../../primitive/index.js'
import { isExpandable } from '../helpers.js'
import classes from '../index.module.css'
import { type AppSidenavNavChild, type AppSidenavNavItem } from '../types.js'

interface NavbarProps {
  navAriaLabel: string
  navItems: AppSidenavNavItem[]
  expandedIds: Record<string, boolean>
  onItemClick: (item: AppSidenavNavItem) => void
  onItemToggle: (itemId: string) => void
  onChildClick: (child: AppSidenavNavChild, parent: AppSidenavNavItem) => void
}

export const Navbar = ({
  navAriaLabel,
  navItems,
  expandedIds,
  onItemClick,
  onItemToggle,
  onChildClick
}: NavbarProps) => {
  return (
    <nav className={classes.nav} aria-label={navAriaLabel}>
      <ul className={classes.navList}>
        {navItems.map((item) => {
          const expanded = !!expandedIds[item.id]
          const expandable = isExpandable(item)

          return (
            <li key={item.id} className={classes.navItem} data-highlighted={item.highlighted || undefined}>
              {expandable ? (
                <UnstyledButton
                  type="button"
                  className={classes.navButton}
                  aria-expanded={expanded}
                  onClick={() => {
                    onItemClick(item)
                    onItemToggle(item.id)
                  }}
                >
                  <span className={classes.navLeadIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={classes.navLabel}>{item.label}</span>
                  <span className={classes.navTrailingIcon} aria-hidden="true">
                    {expanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                  </span>
                </UnstyledButton>
              ) : (
                <Anchor
                  href={item.href}
                  className={classes.navButton}
                  underline="never"
                  onClick={() => onItemClick(item)}
                >
                  <span className={classes.navLeadIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className={classes.navLabel}>{item.label}</span>

                  {typeof item.badgeCount === 'number' && (
                    <span className={classes.badge} aria-label={`${item.badgeCount} unread`}>
                      {item.badgeCount}
                    </span>
                  )}
                </Anchor>
              )}

              {expandable && (
                <Collapse in={expanded}>
                  <ul className={classes.childList}>
                    {item.children?.map((child) => (
                      <li key={child.id}>
                        <Anchor
                          className={classes.childLink}
                          href={child.href}
                          underline="never"
                          onClick={() => onChildClick(child, item)}
                        >
                          {child.label}
                        </Anchor>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
