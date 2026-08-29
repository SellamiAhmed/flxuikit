export type FilterOperator =
  | 'eq' | 'ne'
  | 'contains' | 'notContains'
  | 'startsWith' | 'endsWith'
  | 'gt' | 'gte' | 'lt' | 'lte'
  | 'isBetween'
  | 'isEmpty' | 'isNotEmpty'
  | 'isAnyOf' | 'isNoneOf'

export type FilterVariant =
  | 'text' | 'number' | 'range' | 'date' | 'dateRange' | 'boolean' | 'select' | 'multiSelect'

interface OperatorDef {
  value: FilterOperator
  label: string
}

const TEXT_OPERATORS: OperatorDef[] = [
  { value: 'contains', label: 'contains' },
  { value: 'notContains', label: 'does not contain' },
  { value: 'eq', label: 'is' },
  { value: 'ne', label: 'is not' },
  { value: 'startsWith', label: 'starts with' },
  { value: 'endsWith', label: 'ends with' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
]

const NUMBER_OPERATORS: OperatorDef[] = [
  { value: 'eq', label: '=' },
  { value: 'ne', label: '≠' },
  { value: 'gt', label: '>' },
  { value: 'gte', label: '≥' },
  { value: 'lt', label: '<' },
  { value: 'lte', label: '≤' },
  { value: 'isBetween', label: 'is between' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
]

const DATE_OPERATORS: OperatorDef[] = [
  { value: 'eq', label: 'is' },
  { value: 'ne', label: 'is not' },
  { value: 'gt', label: 'is after' },
  { value: 'lt', label: 'is before' },
  { value: 'isBetween', label: 'is between' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
]

const BOOLEAN_OPERATORS: OperatorDef[] = [
  { value: 'eq', label: 'is' },
]

const SELECT_OPERATORS: OperatorDef[] = [
  { value: 'eq', label: 'is' },
  { value: 'ne', label: 'is not' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
]

const MULTI_SELECT_OPERATORS: OperatorDef[] = [
  { value: 'isAnyOf', label: 'is any of' },
  { value: 'isNoneOf', label: 'is none of' },
  { value: 'isEmpty', label: 'is empty' },
  { value: 'isNotEmpty', label: 'is not empty' },
]

const OPERATOR_MAP: Record<FilterVariant, OperatorDef[]> = {
  text: TEXT_OPERATORS,
  number: NUMBER_OPERATORS,
  range: NUMBER_OPERATORS,
  date: DATE_OPERATORS,
  dateRange: DATE_OPERATORS,
  boolean: BOOLEAN_OPERATORS,
  select: SELECT_OPERATORS,
  multiSelect: MULTI_SELECT_OPERATORS,
}

export function getFilterOperators(variant: FilterVariant): OperatorDef[] {
  return OPERATOR_MAP[variant] ?? TEXT_OPERATORS
}

export function getDefaultFilterOperator(variant: FilterVariant): FilterOperator {
  return getFilterOperators(variant)[0]?.value ?? 'contains'
}
