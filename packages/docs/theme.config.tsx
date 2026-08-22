import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>FlxUI</span>,
  project: {
    link: 'https://github.com/SellamiAhmed/flxuikit'
  },
  docsRepositoryBase: 'https://github.com/you/your-uikit/tree/main/pages',
  toc: {
    backToTop: true
  },
  // next-themes drives the `.dark` class on <html>, which is what the
  // shadcn/ui CSS variables in globals.css key off (darkMode: ['class']
  // in tailwind.config.js). Nextra's own dark-mode toggle uses the same
  // next-themes provider under the hood, so this stays in sync with any
  // shadcn-based components you add to the docs site itself.
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
