import { EnvelopeSimple, GithubLogo, LinkedinLogo, WhatsappLogo } from '@phosphor-icons/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import { site } from '../data/site'

const linkClass = 'fade-in-bottom inline-flex items-center gap-1.5 text-sm font-medium hover:underline'

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <footer id="contacto" className="overflow-clip border-t border-line">
      <div
        ref={ref}
        data-inview={inView}
        className="flex flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12"
      >
        <p className="fade-in-bottom text-sm text-muted">
          {site.name}. ¿Hablamos? Escríbeme por correo, WhatsApp o LinkedIn.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a href={`mailto:${site.email}`} className={linkClass}>
            <EnvelopeSimple size={16} weight="bold" />
            {site.email}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className={linkClass}>
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
