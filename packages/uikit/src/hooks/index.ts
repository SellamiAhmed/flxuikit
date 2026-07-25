export {
  // dom and ui
  useClickOutside,
  // Raw OS detector from Mantine
  useColorScheme as useSystemColorScheme,
  useElementSize,
  useEventListener,
  useFocusReturn,
  useFocusTrap,
  useFocusWithin,
  useFullscreen,
  useHotkeys,
  useHover,
  useInViewport,
  useIntersection,
  useMediaQuery,
  useMouse,
  useMove,
  useMutationObserver,
  useOrientation,
  useReducedMotion,
  useResizeObserver,
  useScrollIntoView,
  useViewportSize,
  useWindowEvent,
  useWindowScroll,
  useScrollSpy,

  // State management
  useCounter,
  useDebouncedCallback,
  useDebouncedState,
  useDebouncedValue,
  useDisclosure,
  useId,
  useInputState,
  useListState,
  useLocalStorage,
  useMap,
  usePagination,
  usePrevious,
  useQueue,
  useSet,
  useSetState,
  useStateHistory,
  useThrottledCallback,
  useThrottledState,
  useThrottledValue,
  useToggle,
  useUncontrolled,
  useValidatedState,

  // Utilities
  useDocumentTitle,
  useDocumentVisibility,
  useEyeDropper,
  useFavicon,
  useFetch,
  useHash,
  useHeadroom,
  useIdle,
  useInterval,
  useMergedRef,
  useNetwork,
  useOs,
  usePageLeave,
  useTextSelection,
  useTimeout,
  useFileDialog,

  // Lifecycle
  useDidUpdate,
  useForceUpdate,
  useIsFirstRender,
  useIsomorphicEffect,
  useLogger,
  useMounted,
  useShallowEffect
} from '@mantine/hooks'

// UI-kit color-scheme hook with localStorage + auto resolution
export { useColorScheme } from './useColorScheme.js'
export type { UseColorSchemeOptions } from './useColorScheme.js'
export { useURLQueryState } from './useURLQueryState.js'
