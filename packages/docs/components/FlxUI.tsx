import Link from 'next/link'
import React from 'react'

// Icons
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const ComponentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <line x1="3" x2="21" y1="9" y2="9" />
    <line x1="9" x2="9" y1="21" y2="9" />
  </svg>
)

const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
)

const AccessibilityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="16" cy="4" r="1" />
    <path d="m18 19 1-7-6 1" />
    <path d="m5 8 3-3 5.5 3-2.36 3.5" />
    <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
    <path d="M13.77 18.95a5 5 0 0 0 5.13-2.87" />
  </svg>
)

const highlights = [
  {
    icon: ComponentIcon,
    title: 'Composable primitives',
    desc: 'Built on Mantine, with business-level components layered on top for real product screens — forms, search areas, pickers, and more.'
  },
  {
    icon: PaletteIcon,
    title: 'Themeable by default',
    desc: 'Ships with design tokens that drive both the component styles and your own app UI, in light and dark mode.'
  },
  {
    icon: AccessibilityIcon,
    title: 'Accessible out of the box',
    desc: 'Keyboard navigation, focus management, and ARIA semantics are handled for you across the library.'
  }
]

const featuredComponents = [
  {
    title: 'DotBadge',
    desc: 'A status-indicator badge with a colored dot or custom icon — for "Live", "Online", "Draft", and category tags.',
    link: '/docs/dotbadge'
  },
  {
    title: 'DateTimePicker',
    desc: 'A calendar, time input, and scrollable time selector combined into one date-and-time picker.',
    link: '/docs/datetimepicker'
  },
  {
    title: 'SearchArea',
    desc: 'A row of auto-submitting filter fields — text, select, multi-select, date, and time-range — with optional URL persistence.',
    link: '/docs/searcharea'
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                Built on Mantine
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                FlxUI <br />
                <span className="text-gradient">Components</span>
              </h1>

              <p className="max-w-[600px] text-lg md:text-xl text-muted-foreground">
                A component library for building data-heavy product UIs — primitives and business components, fully
                themeable and accessible by default.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-blue-500/20 transition-all hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  View Documentation
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative mx-auto lg:ml-auto animate-fade-in-up [animation-delay:200ms]">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 glass-card p-2">
                {/*
                  TODO: replace with a real screenshot of your docs/components.
                  Add the image under /public/images/ and point src at e.g. "/images/hero.png".
                */}
                <img src="/images/hero.png" alt="FlxUI component preview" className="rounded-xl w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {highlights.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex flex-col items-start gap-3">
                  <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-blue-600 dark:text-blue-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-12 md:py-24 bg-muted/30 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Components</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explore a selection of our most popular and versatile components.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredComponents.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-t border-l border-white/50 dark:border-white/10 flex flex-col"
              >
                <div className="aspect-video rounded-xl bg-muted/50 mb-6 overflow-hidden flex items-center justify-center p-4">
                  <ComponentIcon className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  View Docs <ArrowRightIcon className="ml-1 w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
