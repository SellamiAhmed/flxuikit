# PageShell — Consumer Guide

## Overview

The PageShell system provides a complete page layout primitive with a sticky header, scrollable body, and optional footer. It is built in two layers:

| Layer                         | Purpose                                                                             | Import                   |
| ----------------------------- | ----------------------------------------------------------------------------------- | ------------------------ |
| **PageShellBase**             | Layout primitives (header, body, root)                                              | `@flxui/uikit/primitive` |
| **AppPageShell**              | Business-ready shell with scroll shadow, notification bell, and Vercel-style header | `@flxui/uikit/business`  |
| **PageShellNotificationBell** | Self-contained notification trigger + dropdown                                      | `@flxui/uikit/business`  |

---

## Quick Start

```tsx
import { AppPageShell } from '@flxui/uikit/business'

;<AppPageShell title="Overview">{/* your page content */}</AppPageShell>
```

---

## AppPageShell

### Props

| Prop               | Type                             | Default  | Description                                                                    |
| ------------------ | -------------------------------- | -------- | ------------------------------------------------------------------------------ |
| `title`            | `React.ReactNode`                | —        | Page title rendered in the header center                                       |
| `subtitle`         | `React.ReactNode`                | —        | Subtitle under the title                                                       |
| `breadcrumbs`      | `React.ReactNode`                | —        | Breadcrumbs above the title                                                    |
| `secondaryNav`     | `React.ReactNode`                | —        | Tabs / pills under the title                                                   |
| `headerActions`    | `React.ReactNode`                | —        | Custom actions on the header right                                             |
| `notificationBell` | `PageShellNotificationBellProps` | —        | Notification bell auto-wired to the right section                              |
| `footer`           | `React.ReactNode`                | —        | Footer inside the scrollable body                                              |
| `maxWidth`         | `string`                         | `'100%'` | Max-width of the content area                                                  |
| `withHeader`       | `boolean`                        | `true`   | Render the header bar                                                          |
| `headerProps`      | `object`                         | —        | Override left/right sections, back button, breadcrumbs, subtitle, secondaryNav |
| `wrapperProps`     | `PageShellBaseRootProps`         | —        | Props forwarded to the root container                                          |
| `bodyProps`        | `PageShellBaseBodyProps`         | —        | Props forwarded to the scrollable body                                         |

### Header prop precedence

`headerProps.*` always wins over the top-level prop of the same name.

```tsx
// Top-level
<AppPageShell breadcrumbs={<Breadcrumbs />} />

// Grouped in headerProps (recommended)
<AppPageShell
  headerProps={{
    breadcrumbs: <Breadcrumbs />,
    subtitle: 'Manage your projects',
    secondaryNav: <Tabs />,
    leftSection: <ContextSwitcher />,
    rightSection: <CustomActions />,
  }}
/>
```

---

## Layout

The header uses a **3-column grid** (`1fr auto 1fr`) so the title stays dead-center regardless of left/right content width.

```
┌─────────────────────────────────────────────────────────┐
│ [← All Projects ▼]    Overview    [🔔3] [✨] [👤]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Page content                                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Notification Bell

### Basic (badge only)

```tsx
<AppPageShell title="Overview" notificationBell={{ count: 3 }}>
  {/* content */}
</AppPageShell>
```

### With dropdown menu

```tsx
import { Menu, Text } from '@mantine/core'

;<AppPageShell
  title="Overview"
  notificationBell={{
    count: 3,
    menuWidth: 280,
    menuItems: (
      <>
        <Menu.Label>Today</Menu.Label>
        <Menu.Item>
          <Text size="sm" fw={500}>
            Deployment failed
          </Text>
          <Text size="xs" c="dimmed">
            Project "api" — 2 min ago
          </Text>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Earlier</Menu.Label>
        <Menu.Item>
          <Text size="sm" fw={500}>
            Build succeeded
          </Text>
          <Text size="xs" c="dimmed">
            Project "web" — 5 hr ago
          </Text>
        </Menu.Item>
      </>
    )
  }}
>
  {/* content */}
</AppPageShell>
```

### Props

| Prop        | Type              | Default           | Description                                                   |
| ----------- | ----------------- | ----------------- | ------------------------------------------------------------- |
| `count`     | `number`          | —                 | `undefined` hides bell; `0` shows bell; `>0` shows count pill |
| `icon`      | `React.ReactNode` | `<IconBell />`    | Override the bell icon                                        |
| `ariaLabel` | `string`          | `'Notifications'` | Accessible label                                              |
| `onClick`   | `() => void`      | —                 | Click handler when no `menuItems`                             |
| `menuItems` | `React.ReactNode` | —                 | Mantine Menu dropdown content                                 |
| `menuWidth` | `number`          | `280`             | Dropdown width in px                                          |

---

## Scroll Shadow

The header gains a subtle shadow when the body scrolls. No setup required — it is handled automatically via a scroll listener on the body ref.

```css
/* Active when scrolled */
.headerScrolled {
  border-bottom-color: var(--ds-color-border);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.04);
}
```

---

## Recipes

### Vercel-style header with context switcher

```tsx
import { IconChevronDown, IconSparkles, IconUser } from '@tabler/icons-react'
import pageClasses from '@flxui/uikit/business/AppPageShell/AppPageShell.module.css'

;<AppPageShell
  title="Overview"
  headerProps={{
    leftSection: (
      <button className={pageClasses.contextSwitcher}>
        All Projects
        <IconChevronDown size={14} stroke={1.5} />
      </button>
    )
  }}
  notificationBell={{ count: 3 }}
  headerActions={
    <>
      <button className={pageClasses.actionIcon} aria-label="Agent">
        <IconSparkles size={18} stroke={1.5} />
      </button>
      <button className={pageClasses.actionIcon} aria-label="Profile">
        <IconUser size={18} stroke={1.5} />
      </button>
    </>
  }
>
  {/* content */}
</AppPageShell>
```

### Page without header

```tsx
<AppPageShell withHeader={false}>{/* full-bleed content */}</AppPageShell>
```

### With back button

```tsx
<AppPageShell title="Settings" headerProps={{ withBack: true, onBackClick: () => navigate(-1) }}>
  {/* content */}
</AppPageShell>
```

### With secondary nav (tabs)

```tsx
<AppPageShell
  title="Project"
  subtitle="api.flex.io"
  secondaryNav={
    <div className={pageClasses.secondaryNav}>
      <a className={pageClasses.tabActive} href="#overview">
        Overview
      </a>
      <a className={pageClasses.tab} href="#deployments">
        Deployments
      </a>
      <a className={pageClasses.tab} href="#analytics">
        Analytics
      </a>
    </div>
  }
>
  {/* content */}
</AppPageShell>
```

---

## PageShellBase (Primitives)

Use these when you need full control over the layout.

```tsx
import { PageShellBaseRoot, PageShellBaseHeader, PageShellBaseBody, PageShellBaseTitle } from '@flxui/uikit/primitive'

;<PageShellBaseRoot>
  <PageShellBaseHeader sticky leftSection={<Logo />} rightSection={<Actions />}>
    <PageShellBaseTitle>Page Title</PageShellBaseTitle>
  </PageShellBaseHeader>
  <PageShellBaseBody>{/* content */}</PageShellBaseBody>
</PageShellBaseRoot>
```

### Primitive Props

| Component             | Key Props                                           |
| --------------------- | --------------------------------------------------- |
| `PageShellBaseRoot`   | `className`, `style`, `children`                    |
| `PageShellBaseHeader` | `sticky`, `leftSection`, `rightSection`, `children` |
| `PageShellBaseBody`   | `ref`, `className`, `children`                      |
| `PageShellBaseTitle`  | `className`, `children`                             |

---

## CSS Tokens

The shell relies on your design token system:

| Token                     | Usage                                 |
| ------------------------- | ------------------------------------- |
| `--ds-elevation-surface`  | Header + page background              |
| `--ds-color-border`       | Header bottom border, dropdown border |
| `--ds-color-text`         | Title color                           |
| `--ds-color-text-subtle`  | Subtitle, breadcrumbs                 |
| `--ds-font-size-200`      | Title size (14px)                     |
| `--ds-font-weight-medium` | Title weight (500)                    |
| `--ds-space-300`          | Header horizontal padding (24px)      |

---

## File Structure

```
business/
├── AppPageShell/
│   ├── AppPageShell.tsx
│   ├── AppPageShell.module.css
│   ├── PageShellNotificationBell.tsx
│   └── PageShellNotificationBell.module.css
primitive/
└── PageShell/
    ├── PageShellBaseRoot.tsx
    ├── PageShellBaseHeader.tsx
    ├── PageShellBaseBody.tsx
    ├── PageShellBaseTitle.tsx
    └── PageShellBase.module.css
```

---

## Troubleshooting

| Issue                           | Fix                                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Dropdown clips the right edge   | `menuWidth` is too wide. Reduce to `240`–`280`.                                                                  |
| `MantineProvider was not found` | Do not use `@mantine/core` hooks (`useMantineColorScheme`) inside `AppPageShell`. Use local state instead.       |
| Title not centered              | Ensure `headerProps.rightSection` and `leftSection` are balanced, or let the grid auto-balance (`1fr auto 1fr`). |
| Notification bell hidden        | `count` is `undefined`. Set `count={0}` to show an empty bell.                                                   |
