import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../../primitive/Button/index.js'
import { renderWithProviders, screen } from '../render.js'

describe('Button', () => {
  it('renders with the given label', () => {
    renderWithProviders(<Button>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<Button onClick={onClick}>Submit</Button>)
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when loading', () => {
    renderWithProviders(<Button loading>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(
      <Button disabled onClick={onClick}>
        Submit
      </Button>
    )
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies variant as a data attribute', () => {
    renderWithProviders(<Button variant="outline">Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('data-variant', 'outline')
  })
})
