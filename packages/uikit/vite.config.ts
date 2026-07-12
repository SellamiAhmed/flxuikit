import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Only React is external — everything else gets bundled
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  '@mantine/core',
  '@mantine/hooks',
  '@mantine/modals',
  '@mantine/notifications',
  '@mantine/carousel',
  '@mantine/dates',
  '@mantine/dropzone',
  '@mantine/code-highlight'
]

// Ensure directory exists before writing
function ensureDir(filePath: string) {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function updateImportExtensions(content: string, targetExt: '.mjs' | '.cjs') {
  return content.replace(/(from\s+['"]\.\.?\/.*?)\.js(['"'])/g, (_, start, end) => `${start}${targetExt}${end}`)
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      copyDtsFiles: false,
      beforeWriteFile: (filePath, content) => {
        // Skip if no content or not a .d.ts file
        if (!filePath.endsWith('.d.ts') || !content) {
          return { filePath, content }
        }

        // Generate .d.cts for CJS build
        const cjsPath = filePath.replace('.d.ts', '.d.cts')
        ensureDir(cjsPath)
        writeFileSync(cjsPath, updateImportExtensions(content, '.cjs'))

        // Return .d.mts for ESM build
        return {
          filePath: filePath.replace('.d.ts', '.d.mts'),
          content: updateImportExtensions(content, '.mjs')
        }
      }
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: [
        resolve(__dirname, 'src/primitive/index.ts'),
        resolve(__dirname, 'src/theme/index.ts'),
        resolve(__dirname, 'src/hooks/index.ts')
      ]
    },
    rollupOptions: {
      external,
      output: [
        {
          dir: 'dist',
          format: 'esm',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          exports: 'named'
        },
        {
          dir: 'dist',
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          exports: 'named'
        }
      ]
    }
  }
})
