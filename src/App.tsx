import { About } from './components/About'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { useLocale } from './lib/locale'
import { useSmoothScroll } from './lib/smoothScroll'

export default function App() {
  useSmoothScroll()
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
