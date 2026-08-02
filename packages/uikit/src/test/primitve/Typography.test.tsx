import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Typography } from '../../primitive/Typography/index.js'
import classes from '../../primitive/Typography/index.module.css'
import { renderWithProviders, screen } from '../render.js'

describe('Typography', () => {
  it('renders its children', () => {
    renderWithProviders(<Typography>Hello world</Typography>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('applies no variant class when variant is not passed', () => {
    renderWithProviders(<Typography data-testid="typo">Plain text</Typography>)
    const el = screen.getByTestId('typo')

    // None of the known variant classes should be present
    Object.values(classes).forEach((variantClass) => {
      if (typeof variantClass === 'string') {
        expect(el.className).not.toContain(variantClass)
      }
    })
  })

  it.each(['headline-lg', 'title-md', 'action-sm', 'label-xs', 'body-lg'] as const)(
    'applies the correct CSS Module class for variant="%s"',
    (variant) => {
      renderWithProviders(
        <Typography variant={variant} data-testid="typo">
          Styled text
        </Typography>
      )
      const el = screen.getByTestId('typo')

      // Compare against the real hashed class from the actual CSS module —
      // not a guessed/hardcoded string — so this stays correct regardless
      // of how generateScopedName formats the hash.
      expect(el.className).toContain(classes[variant])
    }
  )

  it('merges an external className alongside the variant class', () => {
    renderWithProviders(
      <Typography variant="title-md" className="my-custom-class" data-testid="typo">
        Styled text
      </Typography>
    )
    const el = screen.getByTestId('typo')

    expect(el.className).toContain(classes['title-md'])
    expect(el.className).toContain('my-custom-class')
  })

  it('forwards the ref to the underlying DOM element', () => {
    const ref = createRef<HTMLDivElement>()
    renderWithProviders(
      <Typography ref={ref} data-testid="typo">
        Hello
      </Typography>
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current).toBe(screen.getByTestId('typo'))
  })

  // ── Polymorphic `component` prop ──
  // Typography is wrapped in createPolymorphicComponent, meaning a consumer
  // can render it as any element type via the `component` prop while
  // keeping the same styling/variant logic. This is a real capability
  // worth confirming actually works, not just assumed from the wrapper.
  describe('polymorphic rendering', () => {
    it('renders as a <p> by default (Mantine Text default element)', () => {
      renderWithProviders(<Typography data-testid="typo">Default tag</Typography>)
      expect(screen.getByTestId('typo').tagName).toBe('P')
    })

    it('renders as the element passed via the component prop', () => {
      renderWithProviders(
        <Typography component="span" data-testid="typo">
          Inline text
        </Typography>
      )
      expect(screen.getByTestId('typo').tagName).toBe('SPAN')
    })

    it('renders as a label when component="label" is passed', () => {
      renderWithProviders(
        <Typography component="label" data-testid="typo">
          Field label
        </Typography>
      )
      expect(screen.getByTestId('typo').tagName).toBe('LABEL')
    })

    it('keeps the variant class when combined with a custom component', () => {
      renderWithProviders(
        <Typography component="span" variant="label-md" data-testid="typo">
          Small label
        </Typography>
      )
      const el = screen.getByTestId('typo')

      expect(el.tagName).toBe('SPAN')
      expect(el.className).toContain(classes['label-md'])
    })
  })
})
