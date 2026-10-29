import { Moon, Sun } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { useTheme } from '../lib/theme'

const links = [
  { id: 'inicio', label: 'Inicio', hideOnMobile: true },
  { id: 'sobre', label: 'Sobre mí' },
  { id: 'stack', label: 'Stack', hideOnMobile: true },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
]

const ids = links.map((link) => link.id)

function useActiveSection() {
  const [active, setActive] = useState(ids[0])
  const clicked = useRef<string | null>(null)
  const fallback = useRef(0)

  useEffect(() => {
    let frame = 0
    let unlock = 0

    const update = () => {
      frame = 0
      if (clicked.current) return
      const root = document.documentElement
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        setActive(ids[ids.length - 1])
        return
      }
      const line = window.innerHeight * 0.35
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // While a click-triggered smooth scroll is running, keep the clicked tab instead of
    // letting the line hop across every section it passes.
    const release = () => {
      clicked.current = null
      onScroll()
    }
    const onScrollEnd = () => {
      if (!clicked.current) return
      window.clearTimeout(unlock)
      unlock = window.setTimeout(release, 120)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scroll', onScrollEnd, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(unlock)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scroll', onScrollEnd)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const select = (id: string) => {
    clicked.current = id
    setActive(id)
    window.clearTimeout(fallback.current)
    fallback.current = window.setTimeout(() => {
      clicked.current = null
    }, 1500)
  }

  return { active, select }
}

export function Nav() {
  const { theme, toggle } = useTheme()
  const { active, select } = useActiveSection()
  const reduce = useReducedMotion()

  return (
    <header className="fade-in-top sticky top-0 z-20 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:px-8 lg:px-12">
        <a
          href="#inicio"
          onClick={() => select('inicio')}
          className="justify-self-start font-medium tracking-tight"
        >
          {site.shortName}
        </a>
        <nav className="flex items-center gap-4 text-sm sm:gap-7">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => select(link.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative py-1.5 transition-colors ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                } ${link.hideOnMobile ? 'hidden sm:inline' : ''}`}
              >
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-underline"
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-ink dark:bg-white dark:shadow-[0_0_10px_rgb(255_255_255/0.55)]"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-ink/40 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none dark:bg-white/40"
                  />
                )}
              </a>
            )
          })}
        </nav>
        <button
          type="button"
          onClick={toggle}
          className="inline-flex size-10 items-center justify-center justify-self-end rounded-md text-ink transition-transform active:scale-[0.98]"
          aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
        </button>
      </div>
    </header>
  )
}
