import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { cp } from 'node:fs/promises'
import { resolve, relative, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

// Every @mantine/* package we bundle
const MANTINE: string[] = Object.keys(packageJson.devDependencies ?? {}).filter((n) => n.startsWith('@mantine/'))

// External = declared deps/peers EXCEPT mantine (those get bundled)
const externalDeps = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
  ...Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies }).filter(
    (n) => !n.startsWith('@mantine/')
  ),
  'html-react-parser'
]
const external = (id: string) => externalDeps.some((d) => id === d || id.startsWith(`${d}/`))

// ---- Typings ----
// Bundled mantine JS is emitted to dist/vendor/..., and its typings are copied next to it.
const VENDOR = 'vendor'
const vendorTypes = (pkg: string) => resolve(__dirname, 'dist', VENDOR, pkg, 'lib')

function rewriteMantineImports(file: string, content: string) {
  return content.replace(/(['"])(@mantine\/[a-z-]+)\1/g, (match, q, name) => {
    if (!MANTINE.includes(name)) return match
    let rel = relative(dirname(file), vendorTypes(name)).replace(/\\/g, '/')
    if (!rel.startsWith('.')) rel = './' + rel
    return `${q}${rel}${q}`
  })
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

function ensureDir(filePath: string) {
  const dir = dirname(filePath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

function updateImportExtensions(content: string, ext: '.mjs' | '.cjs') {
  return content.replace(/(from\s+['"]\.\.?\/.*?)\.js(['"'])/g, (_, s, e) => `${s}${ext}${e}`)
}

// Your module augmentation (custom colors, sizes, ...)
const overridePath = resolve(__dirname, 'src/primitive/mantineoverride.d.ts')
const entryFolders = ['primitive', 'business', 'hooks', 'theme', 'utils']

// One shared function: Vite requires the same assetFileNames for every output
const assetFileNames = (a: { name?: string }) =>
  a.name?.endsWith('.css') ? 'styles.css' : 'assets/[name]-[hash][extname]'

export default defineConfig({
  plugins: [
    react(),
    dts({
      copyDtsFiles: false,
      entryRoot: 'src',
      exclude: ['src/test/**'],
      beforeWriteFile: (filePath, content) => {
        if (!filePath.endsWith('.d.ts') || !content) return { filePath, content }

        content = rewriteMantineImports(filePath, content)

        // top-level index of each entry loads the augmentation once
        if (
          entryFolders.some((f) => filePath.endsWith(`/${f}/index.d.ts`) || filePath.endsWith(`\\${f}\\index.d.ts`))
        ) {
          const ref = relative(dirname(filePath), resolve(__dirname, 'dist/mantine-override.d.ts')).replace(/\\/g, '/')
          content = `/// <reference path="${ref}" />\n${content}`
        }

        ensureDir(filePath)
        writeFileSync(filePath.replace('.d.ts', '.d.cts'), updateImportExtensions(content, '.cjs'))
        return { filePath: filePath.replace('.d.ts', '.d.mts'), content: updateImportExtensions(content, '.mjs') }
      },
      async afterBuild() {
        // 1. copy typings of every bundled mantine package
        for (const name of MANTINE) {
          const src = resolve(__dirname, 'node_modules', name, 'lib')
          const dest = vendorTypes(name)
          await cp(src, dest, { recursive: true, dereference: true })
          for (const f of walk(dest).filter((p) => /\.d\.(ts|mts|cts)$/.test(p))) {
            writeFileSync(f, rewriteMantineImports(f, readFileSync(f, 'utf-8')))
          }
        }
        // 2. emit the augmentation, pointed at the bundled typings
        const out = resolve(__dirname, 'dist/mantine-override.d.ts')
        writeFileSync(out, rewriteMantineImports(out, readFileSync(overridePath, 'utf-8')))
      }
    })
  ],

  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const file = filename.replace(/\\/g, '/')
        const rel = file.split('/src/')[1]?.replace('.module.css', '').replace(/\//g, '_') ?? 'unknown'
        return `flex-${rel}_${name}`
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
        resolve(__dirname, 'src/utils/index.ts')
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
          entryFileNames: (c) => `${c.name.replace(/^.*node_modules\//, `${VENDOR}/`)}.mjs`,
          exports: 'named',
          assetFileNames
        },
        {
          dir: 'dist',
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: (c) => `${c.name.replace(/^.*node_modules\//, `${VENDOR}/`)}.cjs`,
          exports: 'named',
          assetFileNames
        }
      ]
    }
  }
})
