# @flxui/uikit

## 0.7.3

### Patch Changes

- [`c1f19ce`](https://github.com/SellamiAhmed/flex-uikit/commit/c1f19ce7fd049284567bd7fc86cdb87ab825f5d1) Thanks [@SellamiAhmed](https://github.com/SellamiAhmed)! - - Fix dependency externalization in build config to prevent dayjs and other subpath imports from being bundled into the published package
  - Exclude test files from the compiled output and published tarball
  - Add sideEffects field to correctly mark CSS and dayjs plugin registration as non-tree-shakeable
