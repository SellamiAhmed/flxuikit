# your-uikit

Shared theme + components across your apps, built on Mantine.

## Structure

Mirrors tidbcloud-uikit's layout - one small file per concern instead of one big file:

- `packages/theme` — colors.ts, colors.dark.ts, font.ts, fns.ts, theme.ts, **and** `ThemeProvider.tsx`. The provider lives here (not in `primitives`) because it's what turns these token files into an actual runtime theme.
- `packages/primitives` — restyled/re-exported Mantine components. One place to import from instead of `@mantine/core` directly.
- `packages/business` — composed components with real product opinions: `PageShell`, and anything else you build (`SearchArea`, `PropertyCard`, etc.)

Add packages in that order. Don't build `business` components until `primitives` is stable, don't touch `primitives` until `theme` is locked.

## Using this in another app (no npm publish needed)

In the consuming app's `package.json`:

```json
"dependencies": {
  "@your-uikit/theme": "github:yourusername/your-uikit#v0.1.0",
  "@your-uikit/primitives": "github:yourusername/your-uikit#v0.1.0",
  "@your-uikit/business": "github:yourusername/your-uikit#v0.1.0"
}
```

Then in your app's root:

```tsx
import { ThemeProvider } from '@your-uikit/theme'

export default function App({ children }) {
  return <ThemeProvider colorScheme="auto">{children}</ThemeProvider>
}
```

## Versioning rules (matters once 2+ apps depend on this)

- **Patch** (`0.1.1`) — token value tweaks, bug fixes, no API changes
- **Minor** (`0.2.0`) — new components or new token keys added, nothing removed
- **Major** (`1.0.0`) — anything renamed or removed (breaking change for every consumer)

Tag a real git tag for every release you want an app to depend on - the `#v0.1.0` in the dependency line above only works if that tag exists.

## Local development

```
pnpm install
pnpm dev
```

Uses pnpm workspaces - packages reference each other via `workspace:*` and resolve locally without needing to be published anywhere first.
