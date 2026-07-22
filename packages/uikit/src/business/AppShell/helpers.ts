import type { AppSidenavNavItem } from './types.js'

export function buildInitialExpandedMap(items: AppSidenavNavItem[]) {
  return items.reduce<Record<string, boolean>>((acc, item) => {
    if (item.children?.length) {
      acc[item.id] = !!item.defaultExpanded
    }
    return acc
  }, {})
}

export function isExpandable(item: AppSidenavNavItem) {
  return !!item.children?.length
}
