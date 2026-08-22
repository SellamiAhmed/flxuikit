# @flxui/uikit

## 0.9.0

### Minor Changes

- [`8c96213`](https://github.com/SellamiAhmed/flxuikit/commit/8c96213d87fd6e8380d0bbac57b66bea79674c6e) Thanks [@SellamiAhmed](https://github.com/SellamiAhmed)! - - bump version and improve docs site concept , correct few mismatch

## 0.7.3

### Patch Changes

- [`c1f19ce`](https://github.com/SellamiAhmed/flex-uikit/commit/c1f19ce7fd049284567bd7fc86cdb87ab825f5d1) Thanks [@SellamiAhmed](https://github.com/SellamiAhmed)! - - Fix dependency externalization in build config to prevent dayjs and other subpath imports from being bundled into the published package
  - Exclude test files from the compiled output and published tarball
  - Add sideEffects field to correctly mark CSS and dayjs plugin registration as non-tree-shakeable
