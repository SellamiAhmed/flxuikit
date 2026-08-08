import fs from 'node:fs'
import { glob } from 'glob'
import ts from 'typescript'

function ensureFolderExist(folder: string) {
  try {
    fs.mkdirSync(folder, { recursive: true })
  } catch (err) {}
}

// Normalize Windows backslashes to forward slashes for consistent path matching
function toPosix(p: string): string {
  return p.split('\\').join('/')
}

const generateStory = (comp: string, imported: string, compNamespace: string) => {
  const title = `${compNamespace}/${comp}`
  const template = `
import type { Meta, StoryObj, StoryFn } from '@storybook/react'
import { ${comp} } from '${imported}'

type Story = StoryObj<typeof ${comp}>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof ${comp}> = {
  title: '${title}',
  component: ${comp},
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {},
}
export default meta

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Primary: Story = {
  render: () => (<${comp}></${comp}>),
  args: {}
}
`
  const outDir = toPosix(`${process.cwd()}/stories/uikit`)
  const filePath = `${outDir}/${comp}.stories.tsx`
  ensureFolderExist(outDir)
  if (fs.existsSync(filePath)) {
    console.log(`Skipping ${title} — already exists`)
    return
  }
  console.log(`Generating story for ${title}`)
  fs.writeFileSync(filePath, template, { encoding: 'utf8', flag: 'w' })
}

const resolveImportPath = (file: string): [string, string] => {
  const defaultPath = '@flex/uikit'
  if (/primitive/.test(file)) {
    return [defaultPath, 'Primitive']
  }
  return [`${defaultPath}/business`, 'Business']
}

const getAllPaths = () => {
  const targetFolders = ['primitive', 'business']
  targetFolders.forEach((folder) => {
    const targetEntry = toPosix(`${process.cwd()}/packages/uikit/src/${folder}/index.ts`)
    const rootNames = glob.sync(toPosix(`${process.cwd()}/packages/uikit/src/${folder}/**/*.{ts,tsx}`))
    const program = ts.createProgram({
      rootNames,
      options: { allowJs: true, esModuleInterop: true, allowSyntheticDefaultImports: true }
    })
    const checker = program.getTypeChecker()
    const sourceFile = program.getSourceFile(targetEntry)
    if (!sourceFile) {
      console.warn(`No barrel index.ts found for ${folder} — skipping`)
      return
    }
    const symbol = checker.getSymbolAtLocation(sourceFile)
    if (!symbol) return

    const isReactComponent = (s: ts.Symbol) => {
      const type = checker.getTypeOfSymbolAtLocation(s, sourceFile)
      const typeString = checker.typeToString(type)
      const properties = type.getProperties()
      const names = ['defaultProps', 'propTypes', 'displayName']
      const hasReactProperties = properties.some((prop) => names.includes(prop.escapedName as string))
      const isFunctionalComponent = typeString.includes('FC<')
      return (hasReactProperties || isFunctionalComponent) && !typeString.endsWith('Provider')
    }

    const symbols = checker.getExportsOfModule(symbol)
    console.log(`Found ${symbols.length} symbols in ${folder}`)
    const componentSymbols = symbols.filter((s) => isReactComponent(s))
    console.log(`Found ${componentSymbols.length} components in ${folder} that should have a story`)

    componentSymbols.forEach((sym) => {
      const [importedPath, compNamespace] = resolveImportPath(targetEntry)
      generateStory(sym.escapedName as string, importedPath, compNamespace)
    })
  })
}

getAllPaths()
