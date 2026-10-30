import { useInView } from 'motion/react'
import { useRef } from 'react'
import { site } from '../data/site'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="sobre" className="border-t border-line py-20 md:py-28">
      <div
        ref={ref}
        data-inview={inView}
        className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[220px_1fr] md:items-start md:gap-16 md:px-8 lg:px-12"
      >
        <div className="[perspective:1000px]">
          <img
            src={site.avatar}
            alt={`Foto de perfil de ${site.name} en GitHub`}
            width={220}
            height={220}
            className="slide-fwd-center aspect-square w-40 rounded-md object-cover [animation-delay:800ms] md:w-full"
          />
        </div>
        <div>
          <div className="focus-in-expand">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Sobre mí</h2>
            <p className="mt-2 font-mono text-sm text-muted">{site.role}</p>
          </div>
          <div className="fade-in mt-6 space-y-4 text-base leading-relaxed text-muted [animation-delay:800ms] [&_p]:hyphens-none">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
