import { execSync } from 'node:child_process'

import create from '@changesets/write'
import prompts from 'prompts'

import packageJson from '../package.json'

function generateChangelogFromTags() {
  execSync('git fetch --all --tags')

  let lastTag: string
  try {
    lastTag = execSync('git describe --tags --abbrev=0').toString().trim()
  } catch {
    // no tags yet — first release, diff from the first commit
    lastTag = execSync('git rev-list --max-parents=0 HEAD').toString().trim()
  }

  const repoUrl = packageJson.repository?.url?.replace(/\.git$/, '') ?? ''
  const changelog = execSync(
    `git log ${lastTag}..HEAD --pretty=format:"- %s"${
      repoUrl ? ` | sed -E 's|#([0-9]+)|[#\\1](${repoUrl}/pull/\\1)|g'` : ''
    }`
  ).toString()

  return changelog
}

async function main() {
  if (process.argv.includes('version')) {
    execSync('npx changeset version', { stdio: 'inherit' })
    return
  }

  const { selectedPackages } = await prompts({
    type: 'select',
    name: 'selectedPackages',
    message: 'Which packages would you like to include?',
    choices: [{ title: '@tidbcloud/uikit', value: '@tidbcloud/uikit' }]
  })
  if (!selectedPackages) {
    console.log('Cancelled...')
    return
  }

  const { bumpType } = await prompts({
    type: 'select',
    name: 'bumpType',
    message: 'What kind of change is this?',
    choices: [
      { title: 'major', value: 'major' },
      { title: 'minor', value: 'minor' },
      { title: 'patch', value: 'patch' }
    ]
  })
  if (!bumpType) {
    console.log('Cancelled...')
    return
  }

  const changelog = generateChangelogFromTags()
  if (!changelog.trim()) {
    console.log('No commits since last tag — nothing to changeset.')
    return
  }

  await create(
    {
      summary: changelog,
      releases: [{ name: selectedPackages, type: bumpType }]
    },
    process.cwd()
  )
}

main().catch(console.error)
