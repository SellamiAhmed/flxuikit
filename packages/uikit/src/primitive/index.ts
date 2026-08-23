// Style imports
import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

export type ColorScheme = 'light' | 'dark'

// Re-export all Mantine components and types
export type {
  AccordionProps, ActionIconProps, AffixProps, AlertProps, AnchorProps, AppShellProps,
  AspectRatioProps, AutocompleteProps, AvatarProps,
  BackgroundImageProps,
  BadgeProps, BlockquoteProps, BoxComponentProps, BoxProps, BreadcrumbsProps,
  BurgerProps, ButtonProps, CardProps,
  CardSectionProps, CenterProps, CheckboxGroupProps, CheckboxProps, ChipGroupProps, ChipProps, CloseButtonProps, CodeProps, CollapseProps, ColorInputProps,
  ColorPickerProps, ColorSchemeScriptProps, ColorSwatchProps, ComboboxData, ComboboxItem, ComboboxProps, ContainerProps, CopyButtonProps, DialogProps, DividerProps, DrawerProps, ElementProps, FieldsetProps, FileButtonProps, FileInputProps, FlexProps, FloatingIndicatorProps, FocusTrapProps, GridProps,
  GroupProps, HighlightProps, HoverCardProps, ImageProps,
  IndicatorProps, InputBaseProps, InputErrorProps,
  InputLabelProps,
  InputPlaceholderProps, InputProps,
  InputWrapperProps, JsonInputProps, KbdProps, ListProps, LoaderProps, LoadingOverlayProps, MantineSize, MarkProps, MenuProps,
  ModalProps, NativeSelectProps, NavLinkProps, NotificationProps, NumberFormatterProps, OptionsData, OptionsFilter, OverlayProps, PaginationProps, PaperProps, PasswordInputProps, PillProps,
  PillsInputProps, PinInputProps, PopoverProps, PortalProps, ProgressProps, RadioCardProps, RadioGroupProps, RadioProps, RangeSliderProps, RatingProps, RingProgressProps, ScrollAreaProps, SegmentedControlItem, SegmentedControlProps, SemiCircleProgressProps, SimpleGridProps, SkeletonProps, SliderProps, SpaceProps, SpoilerProps, StackProps, StepperProps, SwitchProps, TableOfContentsProps, TableProps, TabsProps, TagsInputProps, TextareaProps, TextProps, ThemeIconProps,
  TimelineProps, TitleProps, TooltipProps, TransitionProps, TreeProps, TypographyStylesProviderProps, UnstyledButtonProps, VisuallyHiddenProps
} from '@mantine/core'

export {
  Accordion, ActionIcon, Affix, Alert, AlphaSlider, Anchor, AngleSlider, AppShell,
  AspectRatio, Autocomplete, Avatar,
  BackgroundImage,
  Badge, Blockquote, Box, Breadcrumbs,
  Burger, Card, Center, Checkbox,
  Chip, CloseButton, Code, Collapse, ColorInput,
  ColorPicker, ColorSchemeScript, ColorSwatch, Combobox, Container, CopyButton, defaultOptionsFilter, Dialog, Divider, Drawer, Fieldset, FileButton, FileInput, Flex, FloatingIndicator, FocusTrap, getOptionsLockup,
  getParsedComboboxData, Grid,
  Group, Highlight, HoverCard, HueSlider, Image,
  Indicator, Input,
  InputBase, isOptionsGroup, JsonInput, Kbd, List, Loader, LoadingOverlay, Text as MantineText, Mark, Menu,
  Modal, NativeSelect, NavLink, Notification, NumberFormatter, Overlay, Pagination, Paper, PasswordInput, Pill,
  PillsInput, PinInput, Popover, Portal, Progress, Radio, RadioCard, RadioGroup, RangeSlider, Rating, RingProgress, ScrollArea, SegmentedControl, SemiCircleProgress, SimpleGrid, Skeleton, Slider, Space, Spoiler, Stack, Stepper, Table, TableOfContents,
  Tabs, TagsInput, Text, Textarea, ThemeIcon,
  Timeline, Title, Tooltip, Transition, Tree, TypographyStylesProvider, UnstyledButton, useCombobox,
  useComputedColorScheme, useInputProps,
  useMantineTheme, useProps, VisuallyHidden
} from '@mantine/core'

// Re-export @mantine/dropzone
export {
  Dropzone, EXE_MIME_TYPE, IMAGE_MIME_TYPE, MIME_TYPES,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MS_WORD_MIME_TYPE, PDF_MIME_TYPE
} from '@mantine/dropzone'
export type {
  DropzoneAcceptProps,
  DropzoneFullScreenProps,
  DropzoneFullScreenStylesNames,
  DropzoneIdleProps,
  DropzoneProps,
  DropzoneRejectProps,
  DropzoneStylesNames
} from '@mantine/dropzone'

// Re-export @mantine/carousel
export { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
export type { CarouselProps, CarouselStylesNames, Embla } from '@mantine/carousel'

// Re-export @mantine/modals
export {
  closeAllModals, closeModal, ModalsProvider, openConfirmModal,
  openContextModal, openModal, useModals
} from '@mantine/modals'
export type { ContextModalProps, ModalsProviderProps } from '@mantine/modals'

// Re-export @mantine/dates
export { Calendar, DatePicker, DatePickerInput, Month, TimeInput } from '@mantine/dates'
export type {
  CalendarBaseProps, CalendarProps, DatePickerInputProps, DatePickerProps, DatePickerStylesNames, DatePickerType, MonthProps, MonthSettings, TimeInputProps
} from '@mantine/dates'

// Your custom primitives
export { Button } from './Button/index.js'
export { Typography, type TypographyProps } from './Typography/index.js'

export { MultiSelect, Select, type MultiSelectProps, type SelectProps } from './Select/index.js'

export { Switch } from './Switch/index.js'

export { TextInput, type TextInputProps } from './TextInput/index.js'

export { Dot } from './Dot/index.js'
export type { DotProps } from './Dot/index.js'
export { NumberInput, type NumberInputProps } from './NumberInput/index.js'

export * from './notifier/index.js'

export * from './Avatar/index.js'

// Hooks — re-export from sibling folder
export { useColorScheme } from '../hooks/index.js'

// Business components — root convenience exports
