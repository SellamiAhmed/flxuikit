# @flex/uikit AppShell

A composable, accessible application shell for React — inspired by the TiDB Cloud UIKit pattern, built with CSS modules and design tokens.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [API Reference](#api-reference)
5. [Portal Nav Injection](#portal-nav-injection)
6. [Collapse & Rail Mode](#collapse--rail-mode)
7. [Rail Tooltips](#rail-tooltips)
8. [Sections](#sections)
9. [Responsive Behavior](#responsive-behavior)
10. [Theming](#theming)
11. [Accessibility](#accessibility)
12. [Migration from AppSidenav](#migration-from-appsidenav)

---

## Architecture

AppShell is a **layout system**, not just a sidebar. It owns the outer flex structure and lets pages inject navigation items via React Portals.

```
AppShellRoot  (flex column, 100vh)
├── Banner (optional)
└── AppShellMain  (flex row)
    ├── Navbar  (flex child, pushes content)
    │   ├── NavbarHeader    (logo + collapse toggle)
    │   ├── NavbarSection   (above-menu slot)
    │   ├── NavbarSection   (menu — grow + scrollable)
    │   │   └── navMenuRef  (portal target)
    │   ├── NavbarSection   (notifications — hidden in rail)
    │   └── NavbarSection   (footer utilities)
    └── AppShellBody  (flex: 1, scrollable)
        └── NavMenuRefContext.Provider
            └── children (page content + portal nav items)
```

### Key Design Decisions

| Decision                      | Rationale                                                       |
| ----------------------------- | --------------------------------------------------------------- |
| **No inline layout styles**   | All flex/overflow/position lives in CSS modules                 |
| **Portal-based nav items**    | Pages own their nav tree; navbar is a layout target             |
| **CSS custom properties**     | `--app-shell-navbar-width` drives collapse transitions          |
| **Sectioned navbar**          | Header / menu / notifications / footer are composable slots     |
| **Pure presentational base**  | `NavMenuItem` has no routing knowledge — business layer is thin |
| **Rail collapse mode**        | Shrinks to icon-only strip (56–72px) instead of hiding          |
| **Context-driven rail state** | `NavbarCollapseContext` guarantees sync between header & items  |

---

## Installation

AppShell is part of `@flex/uikit/business`.

```tsx
import { AppShell, NavMenuItem, NavMenuSubItem } from '@flex/uikit/business'
```

Ensure your app entry imports the design tokens:

```css
@import '@flex/uikit/styles/tokens.css';
```

---

## Quick Start

```tsx
import { useState } from 'react'
import { AppShell, NavMenuItem, NavMenuSubItem } from '@flex/uikit/business'
import { IconHome, IconSettings, IconUser, IconWorkspace } from '@tabler/icons-react'

function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <AppShell
      banner={<div>🚧 Maintenance scheduled for Sunday 2AM UTC</div>}
      navbar={{
        width: 256,
        collapsed,
        logo: <strong>Flex UI</strong>,
        logoCollapsed: <IconLayoutSidebar size={20} />,
        notifications: {
          notificationsAriaLabel: 'Announcements',
          notifications: [{ id: '1', title: 'New version', description: 'v2.0 is live', dismissible: true }],
          onDismiss: (item) => console.log('dismissed', item.id)
        },
        footer: {
          utilitiesAriaLabel: 'Sidebar utilities',
          utilityActions: [
            { id: 'profile', ariaLabel: 'Profile', icon: <IconUser size={16} /> },
            { id: 'settings', ariaLabel: 'Settings', icon: <IconSettings size={16} /> }
          ]
        },
        onCollapse: () => setCollapsed(true),
        onExpand: () => setCollapsed(false)
      }}
    >
      {/* Portal into navbar menu */}
      <NavMenuItem icon={<IconHome size={16} />} label="Overview" href="/overview" active />
      <NavMenuItem icon={<IconWorkspace size={16} />} label="Workspace" defaultOpened>
        <NavMenuSubItem label="Projects" href="/projects" />
        <NavMenuSubItem label="Teams" href="/teams" />
      </NavMenuItem>

      {/* Page content */}
      <main>
        <h1>Dashboard</h1>
      </main>
    </AppShell>
  )
}
```

---

## API Reference

### `AppShell`

```tsx
interface AppShellProps {
  /** Top banner (announcements, alerts) */
  banner?: React.ReactNode

  /** Navbar configuration */
  navbar: {
    /** Custom width in px (default: 256) */
    width?: number

    /** Controlled collapse state */
    collapsed?: boolean

    /** Logo / brand mark — shown in full mode */
    logo: React.ReactNode

    /** Logo shown in rail (collapsed) mode. Falls back to `logo` if omitted. */
    logoCollapsed?: React.ReactNode

    /** Override the left section of the header */
    headerLeftSection?: React.ReactNode

    /** Content between header and menu */
    aboveMenu?: React.ReactNode

    /** Notifications section */
    notifications?: {
      notificationsAriaLabel?: string
      notifications: AppSidenavNotification[]
      onDismiss: (notification: AppSidenavNotification) => void
    }

    /** Bottom utilities (profile, settings, etc.) */
    footer: {
      utilitiesAriaLabel?: string
      utilityActions: AppSidenavUtilityAction[]
    }

    onLogoClick?: () => void
    onCollapse?: () => void
    onExpand?: () => void
  }

  children: React.ReactNode
}
```

### `NavMenuItem`

Renders a top-level nav item. Portals into the navbar menu section.

```tsx
interface NavMenuItemProps {
  icon?: React.ReactNode
  label: string
  href?: string
  badgeCount?: number
  active?: boolean
  disabled?: boolean
  defaultOpened?: boolean
  opened?: boolean
  children?: React.ReactNode // sub-items
  onClick?: () => void
  onChange?: (opened: boolean) => void
}
```

### `NavMenuSubItem`

Renders a child link. Must be a child of `NavMenuItem`.

```tsx
interface NavMenuSubItemProps {
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}
```

### `Navbar`, `NavbarSection`, `NavbarHeader`

Exposed for advanced composition. Most consumers don't need these directly.

---

## Portal Nav Injection

Unlike config-array sidebars, AppShell uses **React Portals** for nav items:

```tsx
<AppShell navbar={{ ... }}>
  <NavMenuItem label="Home" href="/" />
  <YourPage />
</AppShell>
```

`NavMenuItem` renders via `createPortal` into a `ref` inside the navbar's menu section. This means:

- **Pages own their nav tree** — no central `navItems` array to maintain
- **Different routes can have different nav items** — mount/unmount with the page
- **Nav items live next to the content they navigate to** — colocation

### How it works

```
AppShell creates navMenuRef ──► <div ref={navMenuRef} className="navbarMenu" />
                                    ▲
NavMenuItem renders ────────────────┘ createPortal(content, navMenuRef.current)
```

If `navMenuRef.current` is null (SSR, early render), the item renders inline as a fallback.

---

## Collapse & Rail Mode

AppShell owns the collapse state. Toggle via the header button or programmatically.

```tsx
const [collapsed, setCollapsed] = useState(false)

<AppShell
  navbar={{
    logo: <Logo />,
    logoCollapsed: <IconLogo size={20} />,
    footer: { utilityActions: [...] },
    collapsed,
    onCollapse: () => setCollapsed(true),
    onExpand: () => setCollapsed(false),
  }}
>
  ...
</AppShell>
```

| State         | Width | Behavior                                                    |
| ------------- | ----- | ----------------------------------------------------------- |
| **Expanded**  | 256px | Full labels, icons, chevrons, notifications visible         |
| **Collapsed** | 64px  | Icon-only rail. Tooltips via `title`. Notifications hidden. |
| **Mobile**    | 0px   | Off-canvas overlay (extend with mobile props)               |

### Rail behavior

When collapsed, the navbar shrinks to a **rail** instead of hiding completely:

- Only icons are visible — labels hidden
- Sub-items are hidden — no gaps, no expand/collapse
- Browser tooltips show on hover (via `title` attribute)
- Badge numbers become red dots
- Notifications section is hidden
- Footer utilities stack vertically
- Expand button (→) sits in the rail header

### CSS Variables

AppShell injects these on `AppShellMain`:

| Variable                       | Value                                     |
| ------------------------------ | ----------------------------------------- |
| `--app-shell-navbar-width`     | `256px` (full) or `64px` (rail)           |
| `--app-shell-navbar-offset`    | `0px` (rail) or `${navbarWidth}px` (full) |
| `--app-shell-navbar-collapsed` | `"1"` or `"0"`                            |

Page headers can read `--app-shell-navbar-offset` to align with the navbar:

```css
.page-header {
  margin-left: var(--app-shell-navbar-offset);
  transition: margin-left 200ms ease;
}
```

---

## Rail Tooltips

In rail mode, nav items show **custom tooltips** (not browser `title`) for a polished experience:

```tsx
// NavMenuItem.tsx — rail branch
<Tooltip label={label} position="right" offset={8}>
  <ActionIcon ...>
    <span className={classes.railNavIcon}>{icon}</span>
    {badgeCount > 0 && <span className={classes.railBadgeDot} />}
  </ActionIcon>
</Tooltip>
```

The tooltip displays the item's `label` prop (e.g. "Overview", "Workspace") — not the icon name.

| Feature   | Full Mode       | Rail Mode                |
| --------- | --------------- | ------------------------ |
| Label     | Visible text    | Hidden, shown in tooltip |
| Icon      | 16px inline     | 20px centered            |
| Badge     | Number pill     | Red dot                  |
| Sub-items | Expandable list | Hidden completely        |
| Chevron   | Rotates 90°     | Hidden                   |

---

## Sections

The navbar is divided into **sections** that stack vertically:

```
┌─────────────────────────┐
│  NavbarHeader (logo)    │  ← fixed height
├─────────────────────────┤
│  aboveMenu (optional)   │  ← fixed height, hidden in rail
├─────────────────────────┤
│  Menu (grow + scroll)   │  ← flex: 1, scrollable
├─────────────────────────┤
│  Notifications          │  ← fixed height, hidden in rail
├─────────────────────────┤
│  Footer (utilities)     │  ← fixed height, pinned bottom
└─────────────────────────┘
```

### Notifications Section

```tsx
navbar={{
  notifications: {
    notificationsAriaLabel: 'Announcements',
    notifications: [
      { id: '1', title: 'New version', description: '...', dismissible: true },
    ],
    onDismiss: handleDismiss,
  },
}}
```

Renders dismissible announcement cards between the menu and footer. **Hidden in rail mode.**

### Footer Section

```tsx
navbar={{
  footer: {
    utilitiesAriaLabel: 'Sidebar utilities',
    utilityActions: [
      { id: 'profile', ariaLabel: 'Profile', icon: <IconUser size={16} /> },
      { id: 'settings', ariaLabel: 'Settings', icon: <IconSettings size={16} /> },
    ],
  },
}}
```

Renders icon buttons at the bottom of the navbar. In rail mode, icons stack vertically.

---

## Responsive Behavior

AppShell does **not** use `useMediaQuery` internally. Responsive behavior is CSS-driven:

| Breakpoint            | Navbar                        | Body                  |
| --------------------- | ----------------------------- | --------------------- |
| **Desktop (≥ 960px)** | Flex sibling, pushes content  | Fills remaining width |
| **Mobile (< 960px)**  | `position: fixed`, off-canvas | Full width            |

Mobile toggle is consumer-controlled:

```tsx
const [mobileOpen, setMobileOpen] = useState(false)

// In your topbar:
<Button onClick={() => setMobileOpen(v => !v)}>Menu</Button>
```

> **Note:** The current `AppShell` handles desktop collapse and rail mode. For mobile off-canvas, extend `Navbar` with `data-mobile` and `data-open` attributes, or keep `AppSidenav` as the mobile implementation until fully migrated.

---

## Theming

AppShell uses your design tokens exclusively. No hardcoded colors, no Mantine theme coupling.

### Tokens used

| Token                                   | Usage                |
| --------------------------------------- | -------------------- |
| `--ds-elevation-surface`                | Root background      |
| `--ds-color-text`                       | Default text         |
| `--ds-color-text-subtle`                | Muted text           |
| `--ds-color-border`                     | Dividers, borders    |
| `--ds-color-background-selected`        | Active nav item      |
| `--ds-color-text-selected`              | Active nav item text |
| `--ds-color-background-brand-subtlest`  | Active rail icon bg  |
| `--ds-color-text-brand`                 | Active rail icon     |
| `--ds-color-background-danger-bold`     | Badge dot            |
| `--ds-font-family-sans`                 | All text             |
| `--ds-space-*`                          | Padding, gaps        |
| `--ds-font-size-*` / `--ds-font-body-*` | Typography           |

### Dark mode

Dark mode is automatic via `[data-mantine-color-scheme='dark']` in your tokens CSS. No extra configuration needed.

---

## Accessibility

| Feature             | Implementation                                                          |
| ------------------- | ----------------------------------------------------------------------- |
| **Landmarks**       | `<nav>` for navbar, `<main>` for body                                   |
| **ARIA labels**     | `aria-label` on nav, notifications, utilities                           |
| **Expand/collapse** | `aria-label="Collapse sidebar"` / `"Expand sidebar"`                    |
| **Sub-items**       | `aria-expanded` on expandable parents                                   |
| **Badges**          | `aria-label="{count} unread"`                                           |
| **Rail tooltips**   | `label` prop shown via Mantine Tooltip on hover                         |
| **Focus rings**     | `outline: 2px solid var(--ds-color-border-focused)` on all interactives |
| **Keyboard**        | Tab navigation through all nav items                                    |

---

## Migration from AppSidenav

### Before (config array)

```tsx
import { AppSidenav } from '@flex/uikit/business'

<AppSidenav
  isOpen={mobileOpen}
  navItems={[...]}
  notifications={[...]}
  utilityActions={[...]}
/>
<main style={{ marginLeft: 288 }}>...</main>
```

### After (AppShell + portals)

```tsx
import { AppShell, NavMenuItem, NavMenuSubItem } from '@flex/uikit/business'

<AppShell
  navbar={{
    logo: <Logo />,
    logoCollapsed: <IconLogo size={20} />,
    notifications: { notifications: [...], onDismiss: ... },
    footer: { utilityActions: [...] },
  }}
>
  <NavMenuItem icon={...} label="Home" href="/" />
  <NavMenuItem icon={...} label="Workspace">
    <NavMenuSubItem label="Projects" href="/projects" />
  </NavMenuItem>
  <main>...</main>
</AppShell>
```

### What changes

| Before                  | After                                           |
| ----------------------- | ----------------------------------------------- |
| `navItems` array        | `NavMenuItem` + `NavMenuSubItem` JSX            |
| Manual `marginLeft`     | Flex row pushes content automatically           |
| Monolithic `AppSidenav` | Composable `AppShell` + `Navbar` sections       |
| Hidden when collapsed   | Rail mode (icon strip) when collapsed           |
| `isOpen` for mobile     | (Extend `AppShell` with mobile prop when ready) |

---

## File Structure

```
business/AppShell/
├── index.ts                          # public API barrel
├── AppShell.tsx                      # layout orchestrator
├── types.ts                          # shared interfaces
├── index.module.css                  # root + main + body + section styles
│
├── container/
│   ├── AppShellRoot.tsx              # 100vh flex column
│   ├── AppShellMain.tsx              # flex row (Group)
│   └── AppShellBody.tsx              # flex: 1 scrollable main
│
├── navbar/
│   ├── index.ts                      # navbar barrel
│   ├── context/
│   │   ├── nav-menu-ref-context.ts   # portal target ref
│   │   └── navbar-collapse-context.ts # rail state context
│   ├── Navbar.tsx                    # nav container
│   ├── Navbar.module.css             # navButton, childLink, badge, rail styles
│   ├── NavbarSection.tsx             # grow? scrollable?
│   ├── NavbarHeader.tsx              # logo + collapse/expand toggle
│   ├── NavMenuItem.tsx               # portal nav item (full + rail modes)
│   └── NavMenuSubItem.tsx            # portal child link
│
└── sections/
    ├── index.ts                      # sections barrel
    ├── Notifications.tsx             # announcement cards
    ├── Notifications.module.css
    ├── BottomUtilities.tsx           # footer icon buttons
    └── BottomUtilities.module.css
```

---

## License

MIT © Flex UI
