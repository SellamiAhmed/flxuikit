---
'@flxui/uikit': patch
---

- Fix dependency externalization in build config to prevent dayjs and other subpath imports from being bundled into the published package
- Exclude test files from the compiled output and published tarball
- Add sideEffects field to correctly mark CSS and dayjs plugin registration as non-tree-shakeable
