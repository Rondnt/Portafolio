import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Moon,
  Sun,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { site } from '../data/site'
import { locales, useLocale } from '../lib/locale'
import { setScrollLocked, smoothScrollTo } from '../lib/smoothScroll'
import { useTheme } from '../lib/theme'

const links = ['inicio', 'sobre', 'stack', 'proyectos', 'contacto'] as const
type SectionId = (typeof links)[number]

const ids: string[] = [...links]

// Below this width the bar collapses into the menu button (phones and tablets).
const DESKTOP_QUERY = '(min-width: 1024px)'

const spring = { type: 'spring', stiffness: 420, damping: 34 } as const
const easeOutExpo = [0.16, 1, 0.3, 1] as const

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

function LanguageSwitch() {
  const { locale, toggle, t } = useLocale()
  const reduce = useReducedMotion()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.switchLanguage}
      className="group relative flex h-11 items-center rounded-full border border-line bg-surface p-1 font-mono text-[11px] lg:h-10 font-medium transition-[border-color,transform] duration-300 hover:border-accent-soft/60 active:scale-95"
    >
      {locales.map((code) => (
        <span
          key={code}
          aria-hidden
          className={`relative z-10 w-8 rounded-full py-1.5 text-center transition-colors duration-300 ${
            locale === code ? 'text-paper' : 'text-muted group-hover:text-ink'
          }`}
        >
          {locale === code ? (
            <motion.span
              layoutId="locale-thumb"
              className="absolute inset-0 -z-10 rounded-full bg-ink shadow-[0_1px_6px_rgb(0_0_0/0.25)]"
              transition={reduce ? { duration: 0 } : spring}
            />
          ) : null}
          {code.toUpperCase()}
        </span>
      ))}
    </button>
  )
}

function ThemeButton() {
  const { theme, toggle } = useTheme()
  const { t } = useLocale()

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-11 items-center justify-center rounded-md text-ink lg:size-10 transition-transform active:scale-[0.96]"
      aria-label={theme === 'dark' ? t.toLightMode : t.toDarkMode}
    >
      {theme === 'dark' ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
    </button>
  )
}

function MenuButton({
  open,
  onClick,
  buttonRef,
}: {
  open: boolean
  onClick: () => void
  buttonRef: RefObject<HTMLButtonElement | null>
}) {
  const { t } = useLocale()
  const line =
    'absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none'

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? t.closeMenu : t.openMenu}
      className="relative inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface transition-[border-color,transform] active:scale-95 lg:hidden"
    >
      <span className={`${line} top-[17px] ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
      <span className={`${line} top-[25px] ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
    </button>
  )
}

function MobileMenu({
  open,
  active,
  onNavigate,
}: {
  open: boolean
  active: string
  onNavigate: (id: SectionId) => void
}) {
  const { locale, t } = useLocale()
  const reduce = useReducedMotion()
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (open) firstLink.current?.focus({ preventScroll: true })
  }, [open])

  // The panel grows as a circle out of the menu button (top right of the bar).
  const origin = 'calc(100% - 2.375rem) 2rem'
  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: `circle(0% at ${origin})` },
        animate: { clipPath: `circle(150% at ${origin})` },
        exit: { clipPath: `circle(0% at ${origin})` },
      }

  const contacts = [
    { href: `mailto:${site.email}`, label: t.email, Icon: EnvelopeSimple, external: false },
    { href: site.linkedin, label: 'LinkedIn', Icon: LinkedinLogo, external: true },
    { href: site.github, label: 'GitHub', Icon: GithubLogo, external: true },
  ]

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          {...panel}
          transition={{ duration: reduce ? 0.15 : 0.55, ease: easeOutExpo }}
          data-lenis-prevent
          className="fixed inset-0 z-10 flex flex-col overflow-y-auto bg-paper px-4 pt-20 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 lg:hidden"
        >
          <nav className="flex-1">
            <ul>
              {links.map((id, index) => {
                const isActive = active === id
                return (
                  <motion.li
                    key={id}
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduce ? 0 : 0.12 + index * 0.05,
                      ease: easeOutExpo,
                    }}
                    className="border-b border-line"
                  >
                    <a
                      ref={index === 0 ? firstLink : undefined}
                      href={`#${id}`}
                      onClick={(event) => {
                        // Handled here (not by the global anchor handler) because the page is
                        // still scroll-locked at the moment of the click.
                        event.preventDefault()
                        event.stopPropagation()
                        onNavigate(id)
                      }}
                      aria-current={isActive ? 'location' : undefined}
                      className="flex min-h-16 items-center justify-between gap-4 py-3"
                    >
                      <span
                        className={`text-3xl font-medium tracking-tight transition-colors sm:text-4xl ${
                          isActive ? 'text-accent-soft' : 'text-ink'
                        }`}
                      >
                        {t.nav[id]}
                      </span>
                      <span
                        aria-hidden
                        className={`size-2 rounded-full transition-[background-color,transform] duration-300 ${
                          isActive ? 'scale-100 bg-accent-soft' : 'scale-0 bg-ink'
                        }`}
                      />
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.42, ease: easeOutExpo }}
            className="mt-10 grid gap-3"
          >
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage[locale])}`}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-white transition-transform active:scale-[0.98]"
            >
              <WhatsappLogo size={18} weight="bold" />
              {t.menuWhatsApp}
            </a>
            <div className="grid grid-cols-3 gap-3">
              {contacts.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="flex min-h-12 items-center justify-center gap-1.5 rounded-md border border-line bg-surface text-sm font-medium transition-transform active:scale-[0.98]"
                >
                  <Icon size={16} weight="bold" />
                  {label}
                  {external ? <ArrowUpRight size={12} weight="bold" className="text-muted" /> : null}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function useMobileMenu(buttonRef: RefObject<HTMLButtonElement | null>) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    setScrollLocked(true)
    // Keyboard and screen-reader users stay inside the menu while it covers the page.
    const background = [...document.querySelectorAll('main, footer')]
    background.forEach((el) => el.setAttribute('inert', ''))

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      setScrollLocked(false)
      background.forEach((el) => el.removeAttribute('inert'))
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open, buttonRef])

  return { open, setOpen }
}

export function Nav() {
  const { t } = useLocale()
  const { active, select } = useActiveSection()
  const reduce = useReducedMotion()
  const menuButton = useRef<HTMLButtonElement>(null)
  const { open, setOpen } = useMobileMenu(menuButton)

  const navigateFromMenu = (id: SectionId) => {
    setScrollLocked(false)
    setOpen(false)
    select(id)
    const target = document.getElementById(id)
    if (target) smoothScrollTo(target)
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <header
        className={`fade-in-top sticky top-0 z-20 border-b transition-colors duration-300 ${
          open ? 'border-transparent bg-paper' : 'border-line/80 bg-paper/85 backdrop-blur-md'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-12">
          <a
            href="#inicio"
            onClick={() => {
              select('inicio')
              setOpen(false)
            }}
            className="inline-flex min-h-11 items-center justify-self-start font-medium tracking-tight"
          >
            {site.shortName}
          </a>
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {links.map((id) => {
              const isActive = active === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => select(id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative py-1.5 transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.nav[id]}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-ink dark:bg-white dark:shadow-[0_0_10px_rgb(255_255_255/0.55)]"
                      transition={reduce ? { duration: 0 } : spring}
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
          <div className="flex items-center gap-1.5 justify-self-end sm:gap-2">
            <ThemeButton />
            <LanguageSwitch />
            <MenuButton open={open} onClick={() => setOpen((v) => !v)} buttonRef={menuButton} />
          </div>
        </div>
      </header>
      <MobileMenu open={open} active={active} onNavigate={navigateFromMenu} />
    </>
  )
}
