export default {
  index: {
    type: 'page',
    title: 'Home',
    theme: {
      layout: 'raw'
    }
  },
  'flx-ui': {
    type: 'page',
    title: 'Components',
    theme: {
      typesetting: 'article',
      layout: 'full'
    }
  },
  docs: {
    type: 'page',
    title: 'Docs'
  },
  '404': {
    type: 'page',
    theme: {
      timestamp: false,
      typesetting: 'article'
    }
  },
  storybook_link: {
    type: 'page',
    title: 'Storybook ↗',
    href: 'http://localhost:6006/',
    newWindow: true
  }
}
