import path from 'node:path'
import { defineConfig } from 'vite'

const alias = [
  { find: /^@flex\/uikit\/theme$/, replacement: path.resolve(process.cwd(), './packages/uikit/src/theme') },
  { find: /^@flex\/uikit\/hooks$/, replacement: path.resolve(process.cwd(), './packages/uikit/src/hooks') },
  { find: /^@flex\/uikit\/icons$/, replacement: path.resolve(process.cwd(), './packages/uikit/src/icons') },
  { find: /^@flex\/uikit\/business$/, replacement: path.resolve(process.cwd(), './packages/uikit/src/business') },
  { find: /^@flex\/uikit\/utils$/, replacement: path.resolve(process.cwd(), './packages/uikit/src/utils') },
  { find: /^@flex\/uikit$/, replacement: path.resolve(process.cwd(), './packages/uikit/src/primitive') }
]

export default defineConfig({
  resolve: {
    alias
  }
})
