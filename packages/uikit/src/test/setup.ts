import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement window.matchMedia — Mantine's MantineProvider
// calls it internally (color-scheme detection, useMediaQuery hooks).
// Without this, every test that renders MantineProvider throws
// "window.matchMedia is not a function".
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    })
  })
}

// jsdom doesn't implement ResizeObserver — Mantine's Combobox/Select/
// MultiSelect use it internally to position the dropdown relative to
// the input. Without this, any component using Combobox throws
// "ResizeObserver is not defined" the moment it mounts.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
}

// jsdom doesn't implement scrollIntoView — Mantine's Combobox calls it
// when navigating options via keyboard/selection to keep the active
// option visible in the dropdown.
if (typeof window !== 'undefined' && !window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = () => {}
}
