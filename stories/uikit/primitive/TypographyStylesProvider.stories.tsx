import { TypographyStylesProvider, Box } from '@flex/uikit'
import type { Meta, StoryObj, StoryFn } from '@storybook/react'

type Story = StoryObj<typeof TypographyStylesProvider>

const decorator = (Story: StoryFn) => {
  return (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  )
}

const meta: Meta<typeof TypographyStylesProvider> = {
  title: 'Primitive/TypographyStylesProvider',
  component: TypographyStylesProvider,
  decorators: [decorator],
  tags: ['autodocs'],
  parameters: {}
}

export default meta

const html = `
<h1>Example article</h1>
<p>This component wraps raw HTML content and applies consistent typography styles to headings, paragraphs, links, and inline formatting — useful for rendering CMS content, markdown output, or any HTML you don't control the structure of.</p>
<h2>Heading level 2</h2>
<p>Here is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and a <a href="#">sample link</a> to demonstrate inline styling.</p>
<h3>Heading level 3</h3>
<p>Another paragraph showing how body copy is styled by default, including line height and spacing between elements.</p>
<ul>
  <li>First list item</li>
  <li>Second list item</li>
  <li>Third list item</li>
</ul>
<blockquote>This is a blockquote, styled distinctly from regular body text.</blockquote>
`

function PrimaryDemo() {
  return (
    <Box maw={560} mx="auto">
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </TypographyStylesProvider>
    </Box>
  )
}

export const Primary: Story = {
  render: () => <PrimaryDemo />,
  args: {}
}
