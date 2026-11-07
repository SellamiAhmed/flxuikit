import { execSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(__dirname, '..')
const dist = resolve(pkgRoot, 'dist')
const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json'), 'utf-8'))

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

// ---------- 1. Tarball contents (dry run: no file created, no tar needed) ----------
const [packInfo] = JSON.parse(
  execSync('npm pack --dry-run --json', { cwd: pkgRoot, stdio: ['ignore', 'pipe', 'ignore'] }).toString()
)
const packed: string[] = packInfo.files.map((f: { path: string }) => f.path)

const testLeak = packed.filter((p) => /(^|\/)test\//.test(p))
if (testLeak.length) fail(`Test files in tarball:\n  ${testLeak.join('\n  ')}`)

if (!packed.some((p) => p.startsWith('dist/vendor/@mantine/core/')))
  fail('Bundled Mantine (dist/vendor/@mantine/core) is missing from the tarball')

// ---------- 2. dist on disk ----------
if (!existsSync(dist)) {
  fail('dist/ does not exist, run the build first')
} else {
  if (existsSync(join(dist, 'node_modules')))
    fail(
      'dist/node_modules exists. npm drops it from the tarball, so the package would be broken. Check the vendor rename in entryFileNames.'
    )

  const files = walk(dist)

  // no bare @mantine imports left in JS or types
  const bare = /(?:from\s*|import\s*\(?\s*|require\(\s*)['"]@mantine\//
  const leaks = files
    .filter((f) => /\.(mjs|cjs|d\.mts|d\.cts)$/.test(f))
    .filter((f) => bare.test(readFileSync(f, 'utf-8')))
  if (leaks.length)
    fail(`Bare '@mantine/*' imports found (the app would need its own Mantine):\n  ${leaks.slice(0, 10).join('\n  ')}`)

  // bundled mantine runtime + typings exist for every package we bundle
  const mantine = Object.keys(pkg.devDependencies ?? {}).filter((n) => n.startsWith('@mantine/'))
  for (const name of mantine) {
    if (!existsSync(join(dist, 'vendor', name))) fail(`Missing bundled package: dist/vendor/${name}`)
    if (!existsSync(join(dist, 'vendor', name, 'lib'))) fail(`Missing typings: dist/vendor/${name}/lib`)
  }

  // Mantine must not be declared as a peer/dependency in bundled mode
  const declared = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }).filter((n) =>
    n.startsWith('@mantine/')
  )
  if (declared.length) fail(`@mantine/* still declared as dependency/peer: ${declared.join(', ')}`)

  // CSS must contain Mantine styles
  const css = join(dist, 'styles.css')
  if (!existsSync(css)) fail('dist/styles.css is missing')
  else if (!readFileSync(css, 'utf-8').includes('--mantine-'))
    fail('dist/styles.css has no Mantine styles. Check src/styles/vendor.css import.')

  // every target in "exports" exists
  const targets: string[] = []
  const collect = (v: unknown) => {
    if (typeof v === 'string') targets.push(v)
    else if (v && typeof v === 'object') Object.values(v).forEach(collect)
  }
  collect(pkg.exports)
  for (const t of new Set(targets)) {
    if (t.startsWith('./dist/') && !existsSync(resolve(pkgRoot, t))) fail(`"exports" points to a missing file: ${t}`)
  }
  for (const key of ['main', 'module', 'types']) {
    if (pkg[key] && !existsSync(resolve(pkgRoot, pkg[key]))) fail(`"${key}" points to a missing file: ${pkg[key]}`)
  }
}

// ---------- result ----------
if (errors.length) {
  console.error('\n❌ dist verification failed:\n')
  errors.forEach((e) => console.error(e + '\n'))
  process.exit(1)
}
console.log('✅ dist verification passed')
