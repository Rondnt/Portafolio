import { ArrowUpRight, WhatsappLogo } from '@phosphor-icons/react'
import { projects, site } from '../data/site'

export function Hero() {
  return (
    <section
      id="inicio"
      className="grid min-h-[calc(100dvh-4rem)] items-center overflow-x-clip gap-10 px-4 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-8 lg:px-12 md:py-12"
    >
      <div className="scale-in-center lg:pl-12 xl:pl-24 [animation-delay:600ms]">
        <h1 className="max-w-[12ch] text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          {site.headline}
        </h1>
        <p className="mt-5 max-w-[48ch] text-base hyphens-none leading-relaxed text-muted md:text-lg">
          {site.subhead}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#proyectos"
            className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px active:scale-[0.98]"
          >
            Ver proyectos
          </a>
          <a
            href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            <WhatsappLogo size={16} weight="bold" />
            Escríbeme
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            LinkedIn
            <ArrowUpRight size={14} weight="bold" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            GitHub
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </div>

      <ol className="slide-in-right border-t border-line lg:mr-12 xl:mr-24 [animation-delay:1100ms]">
        {projects.map((project) => (
          <li key={project.name} className="border-b border-line">
            <a
              {...(project.live ?? project.repo
                ? { href: project.live ?? project.repo, target: '_blank', rel: 'noreferrer' }
                : { href: '#proyectos' })}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-4 md:grid-cols-[1fr_auto_auto]"
            >
              <span className="font-medium tracking-tight group-hover:text-accent-soft">
                {project.name}
              </span>
              <span className="hidden font-mono text-xs text-muted md:block">
                {project.stack[0]}
              </span>
              <span className="font-mono text-xs text-muted">{project.year}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
