import { EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { site } from '../data/site'
import { useLocale } from '../lib/locale'

// Phones: large bordered tap targets (contact is the main action there). Tablet and up: inline links.
const linkClass =
  'fade-in-bottom inline-flex min-h-12 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-3 text-sm font-medium transition-transform active:scale-[0.98] md:min-h-11 md:justify-start md:border-0 md:bg-transparent md:px-0 md:hover:underline md:active:scale-100'

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const { t } = useLocale()

  return (
    <footer id="contacto" className="overflow-clip border-t border-line">
      <div
        ref={ref}
        data-inview={inView}
        className="flex flex-col gap-5 px-4 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:flex-row md:items-center md:justify-between md:gap-6 md:px-8 lg:px-12"
      >
        <p className="fade-in-bottom text-sm text-muted">
          {site.name}. {t.footer}
        </p>
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-end md:gap-x-6 md:gap-y-1">
          <a href={`mailto:${site.email}`} className={`${linkClass} col-span-2`}>
            <EnvelopeSimple size={16} weight="bold" />
            {site.email}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className={`${linkClass} col-span-2`}>
            <WhatsappLogo size={16} weight="bold" />
            {site.phone}
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            <LinkedinLogo size={16} weight="bold" />
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className={linkClass}>
            <GithubLogo size={16} weight="bold" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
