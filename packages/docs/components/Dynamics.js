import dynamic from 'next/dynamic'

const IconsPreview = dynamic(() => import('@components/IconsPreview'), { ssr: false })
const Home = dynamic(() => import('@components/Home'), { ssr: false })
const FlxUI = dynamic(() => import('@components/FlxUI'), { ssr: false })

export function IconsPreviewPage() {
  return <IconsPreview />
}

export function HomePage() {
  return <Home />
}

export function FlxUIPage() {
  return <FlxUI />
}
