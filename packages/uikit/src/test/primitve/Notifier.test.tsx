import { cleanNotifications, showNotification } from '@mantine/notifications'
import { afterEach, describe, expect, it, vi } from 'vitest'

// Adjust this import path to match where notifier actually lives in your
// source tree (e.g. '../../primitive/notifier/index.js' or
// '../../utils/notifier.js') — placeholder based on the code you shared.
import { notifier } from '../../utils/notifier.js'

vi.mock('@mantine/notifications', () => ({
  showNotification: vi.fn(),
  cleanNotifications: vi.fn()
}))

afterEach(() => {
  vi.clearAllMocks()
})

describe('notifier', () => {
  it('success() calls showNotification with color "green" and the given message', () => {
    notifier.success('Saved successfully')

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Saved successfully',
      color: 'green'
    })
  })

  it('warn() calls showNotification with color "yellow"', () => {
    notifier.warn('Check your input')

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Check your input',
      color: 'yellow'
    })
  })

  it('error() calls showNotification with color "red"', () => {
    notifier.error('Something went wrong')

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Something went wrong',
      color: 'red'
    })
  })

  it('info() calls showNotification with color "cyan"', () => {
    notifier.info('Heads up')

    expect(showNotification).toHaveBeenCalledWith({
      message: 'Heads up',
      color: 'cyan'
    })
  })

  it('clear() calls cleanNotifications with no arguments', () => {
    notifier.clear()

    expect(cleanNotifications).toHaveBeenCalledTimes(1)
    expect(cleanNotifications).toHaveBeenCalledWith()
  })

  // ── Prop merging / override behavior ──
  // These matter because the implementation spreads `...props` AFTER
  // `color`, meaning a caller can override the default color per call.
  // That's either an intentional escape hatch or an accidental footgun —
  // this test locks in whichever behavior is actually shipped, so a
  // future refactor can't silently flip it without a test failing.
  describe('custom props', () => {
    it('merges additional props into the notification payload', () => {
      notifier.success('Saved', { autoClose: 3000, title: 'Success' })

      expect(showNotification).toHaveBeenCalledWith({
        message: 'Saved',
        color: 'green',
        autoClose: 3000,
        title: 'Success'
      })
    })

    it('allows a caller to override the default color via props', () => {
      notifier.success('Saved', { color: 'teal' })

      expect(showNotification).toHaveBeenCalledWith({
        message: 'Saved',
        color: 'teal'
      })
    })
  })
})
