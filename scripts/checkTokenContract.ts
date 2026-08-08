import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SRC_DIR = 'packages/uikit/src'
const TOKENS_FILE = 'packages/uikit/src/theme/tokens.css'

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      walk(fullPath, files)
    } else if (extname(fullPath) === '.css') {
      files.push(fullPath)
    }
  }
  return files
}

function extractDefinedTokens(tokensFile: string): Set<string> {
  const content = readFileSync(tokensFile, 'utf-8')
  const matches = content.matchAll(/(--ds-[\w-]+)\s*:/g)
  return new Set([...matches].map((m) => m[1]))
}

function extractUsedTokens(cssContent: string): string[] {
  const matches = cssContent.matchAll(/var\((--ds-[\w-]+)/g)
  return [...matches].map((m) => m[1])
}

function main() {
  const definedTokens = extractDefinedTokens(TOKENS_FILE)
  const cssFiles = walk(SRC_DIR)

  let hasErrors = false

  for (const file of cssFiles) {
    if (file === TOKENS_FILE) continue
    const content = readFileSync(file, 'utf-8')
    const used = extractUsedTokens(content)

    for (const token of used) {
      if (!definedTokens.has(token)) {
        console.error(`❌ ${file}: undefined token "${token}"`)
        hasErrors = true
      }
    }
  }

  if (hasErrors) {
    console.error('\nToken contract check failed.')
    process.exit(1)
  } else {
    console.log(`✔ Token contract OK — checked ${cssFiles.length} files against ${definedTokens.size} defined tokens.`)
  }
}

main()
