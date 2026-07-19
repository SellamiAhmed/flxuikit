import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
    // REMOVED: libInjectCss() — causes multiple CSS files
    dts({
      copyDtsFiles: false,
      beforeWriteFile: (filePath, content) => {
        if (!filePath.endsWith('.d.ts') || !content) {
          return { filePath, content }
        }

        const cjsPath = filePath.replace('.d.ts', '.d.cts')
        ensureDir(cjsPath)
        writeFileSync(cjsPath, updateImportExtensions(content, '.cjs'))

        return {
          filePath: filePath.replace('.d.ts', '.d.mts'),
          content: updateImportExtensions(content, '.mjs')
        }
      }
    })
  ],

  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const file = filename.split('/').pop()?.replace('.module.css', '') ?? 'unknown'
        return `flex-${file}_${name}`
      }
    }
  },

  build: {
    minify: false,
    cssCodeSplit: false,
    emptyOutDir: true,

    lib: {
      entry: [
        resolve(__dirname, 'src/primitive/index.ts'),
        resolve(__dirname, 'src/business/index.ts'),
        resolve(__dirname, 'src/theme/index.ts'),
        resolve(__dirname, 'src/hooks/index.ts'),
        resolve(__dirname, 'src/utils/index.ts'),
        resolve(__dirname, 'src/icons/index.ts')
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
          exports: 'named',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name as string
            if (info.endsWith('.css')) return 'styles.css'
            return 'assets/[name]-[hash][extname]'
          }
        },
        {
          dir: 'dist',
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs',
          exports: 'named',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name as string
            if (info.endsWith('.css')) return 'styles.cjs.css'
            return 'assets/[name]-[hash][extname]'
          }
        }
      ]
    }
  }
})
