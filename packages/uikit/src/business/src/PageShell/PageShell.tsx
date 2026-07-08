import { Box, Group, Stack, Title } from '@mantine/core'

export interface PageShellProps {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  maxWidth?: number
}

/**
 * The one layout every "normal" page in the app should use, so page
 * padding, header/title placement, and content width stay consistent
 * without every page reinventing its own layout.
 *
 * Start simple. Add a sidebar/breadcrumbs slot later only once two or
 * more real pages actually need it - don't build it speculatively.
 */
export function PageShell({ title, actions, children, maxWidth = 1100 }: PageShellProps) {
  return (
    <Box p="lg">
      <Stack maw={maxWidth} mx="auto" gap="lg">
        <Group justify="space-between" align="center">
          <Title order={2}>{title}</Title>
          {actions}
        </Group>
        {children}
      </Stack>
    </Box>
  )
}
