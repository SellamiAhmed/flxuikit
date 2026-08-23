import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const logo = (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <img src="/images/favicon-32.png" width="25px" alt="FlxUI logo" />
    <b>FlxUI</b>
  </div>
)

const config: DocsThemeConfig = {
  logo,
  head() {
    const { frontMatter } = useConfig()
    return (
      <>
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon.ico"
        />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={frontMatter.title || 'FlxUI - React Design System & Component Library'} />
        <meta
          property="og:description"
          content="FlxUI is a design system and component library built on Mantine v7 — primitives, business components, and icons for building product UI faster."
        />
        <meta property="og:image" content="/images/favicon-512.png" />
      </>
    )
  },
  project: {
    link: 'https://github.com/SellamiAhmed/flxuikit'
  },
  docsRepositoryBase: 'https://github.com/SellamiAhmed/flxuikit/tree/v0/packages/docs',
  toc: {
    backToTop: true
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'system'
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  footer: {
    content: <span>© {new Date().getFullYear()}. Ahmed Sellami. All rights reserved.</span>
  }
}

export default config
