import { site } from '../data/site'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="sobre" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[220px_1fr] md:items-start md:gap-16 md:px-8 lg:px-12">
        <Reveal>
          <img
            src={site.avatar}
            alt={`Foto de perfil de ${site.name} en GitHub`}
            width={220}
            height={220}
            className="aspect-square w-40 rounded-md object-cover md:w-full"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Sobre mí</h2>
          <p className="mt-2 font-mono text-sm text-muted">{site.role}</p>
          <div className="mt-6 space-y-4 [&_p]:hyphens-none text-base leading-relaxed text-muted">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
