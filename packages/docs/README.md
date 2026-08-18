# UIKit Documentation Starter

A Nextra-based docs site matching the real setup used by [tidbcloud/tidbcloud-uikit](https://github.com/tidbcloud/tidbcloud-uikit): Next.js + Nextra for the docs framework, shadcn/ui conventions (CSS variables, `components.json`, `cn()` utility, CVA) for any custom UI you build into the docs site itself, and `next-themes` for dark mode.

## Setup

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000

## Structure

```
pages/
  index.mdx                    # site landing page
  docs/
    _meta.ts                   # top-level sidebar nav + section separators
    index.mdx                  # docs intro page
    getting-started.mdx
    components/
      _meta.ts                 # ordered list of component pages
      Button.mdx                # one file per component (content docs)
components/
  ui/
    button.tsx                 # example shadcn-style component for the
                                # docs site's OWN UI (tabs, callouts, etc) —
                                # not the same as pages/docs/components/*.mdx,
                                # which document YOUR library's components
lib/
  utils.ts                     # cn() — class merging helper used by shadcn components
components.json                # shadcn CLI config — lets you run
                                # `pnpm dlx shadcn@latest add <component>`
                                # to pull in more pre-built UI as needed
```

**Two different "components" folders, don't confuse them:**
- `pages/docs/components/*.mdx` — documentation pages *about* your UI kit's components (what tidbcloud's `biz/Button.mdx` etc. are)
- `components/ui/*.tsx` — actual React components used to build the docs site's interface itself (e.g. a code/preview tab switcher, callout boxes)

## Adding a new component page

1. Create `pages/docs/components/YourComponent.mdx` using `Button.mdx` as a template:
   - `# ComponentName` + one-line description
   - `## Import`
   - `## Basic Usage` (and any other relevant variant/usage sections)
   - `## Props` table
2. Add it to `pages/docs/components/_meta.ts`:
   ```ts
   export default {
     Button: 'Button',
     YourComponent: 'YourComponent'
   }
   ```

## Adding a new top-level section (e.g. "Hooks", "Icons")

1. Create a folder under `pages/docs/`, e.g. `pages/docs/hooks/`.
2. Add a `_meta.ts` inside it listing the pages in that folder.
3. Register the folder in `pages/docs/_meta.ts`:
   ```ts
   export default {
     index: 'Introduction',
     'getting-started': { title: 'Getting Started' },
     '-- Components': { type: 'separator', title: 'Components' },
     components: { title: 'Components' },
     '-- Hooks': { type: 'separator', title: 'Hooks' },
     hooks: { title: 'Hooks' }
   }
   ```

## Customize branding

Edit `theme.config.tsx` — logo, GitHub link, footer text, sidebar collapse behavior, default color scheme (`nextThemes.defaultTheme`).

## Pulling in more shadcn components

Since `components.json` is set up, you can add any shadcn/ui component directly:

```bash
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add accordion
```

This is how you'd build things like a tabbed code/preview switcher for live component demos.

## Next steps

- **Live-rendered demos**: swap the plain ` ```tsx ` code blocks for a custom MDX component backed by [`react-live`](https://github.com/FormidableLabs/react-live) so examples render + are editable in the browser.
- **Auto-generated props tables**: use [`react-docgen-typescript`](https://github.com/styleguidist/react-docgen-typescript) to generate the Props table from your component's actual TypeScript types instead of hand-writing it, so docs can't drift from the real API.
- **Deploy**: this is a standard Next.js app — deploys as-is to Vercel, or `pnpm build && pnpm start` anywhere that runs Node.
