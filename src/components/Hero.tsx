import { ArrowUpRight, EnvelopeSimple } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { projects, site } from '../data/site'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="inicio"
      className="grid min-h-[calc(100dvh-4rem)] items-center gap-10 px-4 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-8 lg:px-12 md:py-12"
    >
      <div className="lg:pl-12 xl:pl-24">
        <motion.h1
          className="max-w-[12ch] text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {site.headline}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-[48ch] text-base hyphens-none leading-relaxed text-muted md:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {site.subhead}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#proyectos"
            className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-px active:scale-[0.98]"
          >
            Ver proyectos
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            <EnvelopeSimple size={16} weight="bold" />
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
        </motion.div>
      </div>

      <motion.ol
        className="border-t border-line lg:mr-12 xl:mr-24"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.ol>
    </section>
  )
}
