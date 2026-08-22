# FlxUI

This repo hosts FlxUI, the Flx design system UI library, including primitive and business components. Built on Mantine.

## Quick Start

Visit the [documentation site](http://localhost:3001) to learn more about how to use this component library.

```tsx
import { ThemeProvider } from '@flxui/uikit/theme'
import { Button } from '@flxui/uikit'
import '@flxui/uikit/style.css'

function App() {
  return (
    <ThemeProvider colorScheme="light">
      <Button>Click me!</Button>
    </ThemeProvider>
  )
}
```

## Development

This is a pnpm workspace monorepo.

```bash
pnpm install

# build the component library
pnpm --filter @flxui/uikit build

# run the docs site
cd packages/docs
pnpm dev
```
