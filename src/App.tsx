import { About } from './components/About'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { useEffect } from 'react'
import { useLocale } from './lib/locale'
import { useSmoothScroll } from './lib/smoothScroll'

// The page is rendered by React after the browser's own jump to #section has already run, so a
// shared link like /#proyectos is resolved here once the sections exist.
function useInitialHash() {
  useEffect(() => {
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [])
}

export default function App() {
  useSmoothScroll()
  useInitialHash()
  const { t } = useLocale()

  return (
    <div className="min-h-[100dvh]">
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        {t.skipToContent}
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
