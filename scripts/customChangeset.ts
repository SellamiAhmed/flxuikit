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

  // Get the raw log first — no shell piping to `sed`, which doesn't exist
  // on Windows' cmd.exe even inside a Git Bash terminal (execSync always
  // shells out through cmd.exe on Windows, not the visible terminal).
  const rawLog = execSync(`git log ${lastTag}..HEAD --pretty=format:"- %s"`).toString()

  // Do the same "#123 -> [#123](repoUrl/pull/123)" replacement in JS instead.
  const changelog = repoUrl
    ? rawLog.replace(/#(\d+)/g, (_match, prNumber) => `[#${prNumber}](${repoUrl}/pull/${prNumber})`)
    : rawLog

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
    choices: [{ title: '@flxui/uikit', value: '@flxui/uikit' }]
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
