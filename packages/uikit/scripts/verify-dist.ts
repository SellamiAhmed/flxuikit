import { execSync } from 'node:child_process'
import { readFileSync, unlinkSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = resolve(__dirname, '..')

console.log('Packing tarball for verification...')
execSync('npm pack --silent', { cwd: pkgRoot, stdio: 'inherit' })

const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json'), 'utf-8'))
const tarballName = `${pkg.name.replace('@', '').replace('/', '-')}-${pkg.version}.tgz`

const contents = execSync(`tar -tzf "${tarballName}"`, { cwd: pkgRoot }).toString()
const lines = contents.split('\n').filter(Boolean)

const errors: string[] = []

const testLeak = lines.filter((l) => /(^|\/)test\//.test(l))
if (testLeak.length) {
  errors.push(`Found test files in tarball:\n  ${testLeak.join('\n  ')}`)
}

const nodeModulesLeak = lines.filter((l) => l.includes('node_modules'))
if (nodeModulesLeak.length) {
  errors.push(`Found bundled node_modules in tarball:\n  ${nodeModulesLeak.join('\n  ')}`)
}

unlinkSync(resolve(pkgRoot, tarballName))

if (errors.length) {
  console.error('\n❌ dist verification failed:\n')
  errors.forEach((e) => console.error(e + '\n'))
  process.exit(1)
}

console.log('✅ dist verification passed — no test files or bundled node_modules found.')
