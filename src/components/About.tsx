import { useInView } from 'motion/react'
import { useRef } from 'react'
import { site } from '../data/site'
import { useLocale } from '../lib/locale'

export function About() {
  const { locale, t } = useLocale()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="sobre" className="overflow-x-clip border-t border-line py-16 md:py-20 lg:py-28">
      {/* Phones and tablets: small portrait beside the heading, text full width below.
          Desktop: portrait in its own column next to the heading and text. */}
      <div
        ref={ref}
        data-inview={inView}
        className="mx-auto grid max-w-6xl grid-cols-[auto_1fr] items-center gap-x-5 gap-y-6 px-4 md:gap-x-6 md:px-8 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-x-16 lg:gap-y-0 lg:px-12"
      >
        <div className="[perspective:1000px] lg:row-span-2">
          <img
            src={site.avatar}
            alt={t.avatarAlt(site.name)}
            width={220}
            height={220}
            className="slide-fwd-center aspect-square w-20 rounded-md object-cover [animation-delay:800ms] md:w-28 lg:w-full"
          />
        </div>
        <div className="focus-in-expand">
          <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">{t.aboutTitle}</h2>
          <p className="mt-2 font-mono text-sm text-muted">{site.role[locale]}</p>
        </div>
        <div className="fade-in col-span-2 space-y-4 text-base leading-relaxed text-muted [animation-delay:800ms] lg:col-span-1 lg:col-start-2 lg:mt-6 [&_p]:hyphens-none">
          {site.about[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
