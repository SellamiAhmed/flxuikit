import { readFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Always-external, regardless of how they're declared in package.json
// (React must be external even if someone accidentally moves it to devDependencies)
const alwaysExternal = ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime']

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

const declaredDeps = Object.keys({
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.peerDependencies ?? {})
})

const externalDeps = [...new Set([...alwaysExternal, ...declaredDeps])]

const external = (id: string) => {
  // exact match, or subpath match (e.g. 'dayjs/plugin/utc' matches 'dayjs',
  // 'lodash-es/debounce' matches 'lodash-es')
  return externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`))
}

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
      entryRoot: 'src',
      exclude: ['src/test/**'],
      beforeWriteFile: (filePath, content) => {
        if (!filePath.endsWith('.d.ts') || !content) {
          return { filePath, content }
        }
        return {
          filePath,
          content: updateImportExtensions(content, '.mjs')
        }
      }
    })
  ],

  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const relative = filename.split('/src/')[1]?.replace('.module.css', '').replace(/\//g, '_') ?? 'unknown'
        return `flex-${relative}_${name}`
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
