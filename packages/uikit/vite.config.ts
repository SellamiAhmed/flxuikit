import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: [
        resolve(__dirname, 'src/primitives/index.ts'),
        resolve(__dirname, 'src/theme/index.ts'),
        resolve(__dirname, 'src/business/index.ts'),
        resolve(__dirname, 'src/hooks/index.ts'),
        resolve(__dirname, 'src/utils/index.ts')
      ]
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@mantine/core',
        '@mantine/hooks',
        '@mantine/modals',
        '@mantine/notifications',
        '@mantine/carousel',
        '@mantine/dates',
        '@mantine/dropzone',
        '@mantine/code-highlight'
      ],
      output: [
        {
          dir: resolve(__dirname, 'dist'),
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].mjs',
          exports: 'named'
        },
        {
          dir: resolve(__dirname, 'dist'),
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
