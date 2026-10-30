import { ArrowUpRight, LockSimple } from '@phosphor-icons/react'
import { useRef, useState, useSyncExternalStore, type RefObject } from 'react'
import { projects, type Project } from '../data/site'
import { useLocale } from '../lib/locale'
import { useEntrance } from '../lib/useEntrance'

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLocale()

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-accent-soft hover:underline"
        >
          {t.openDemo}
          <ArrowUpRight size={14} weight="bold" />
        </a>
      ) : null}
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-1 hover:underline"
        >
          {t.code}
          <ArrowUpRight size={14} weight="bold" />
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center gap-1 font-mono text-xs text-muted">
          <LockSimple size={14} weight="bold" />
          {t.privateCode}
        </span>
      )}
    </div>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  const { locale } = useLocale()
  const [active, setActive] = useState(0)
  const image = project.images[active]

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface">
      <img
        src={image.src}
        alt={image.alt[locale]}
        className="aspect-[2.1/1] w-full object-cover object-left-top"
      />
      {project.images.length > 1 ? (
        <div className="flex gap-2 border-b border-line px-5 py-3 sm:px-6">
          {project.images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={item.alt[locale]}
              aria-pressed={index === active}
              className={`h-11 w-16 overflow-hidden rounded border transition-opacity ${
                index === active
                  ? 'border-accent-soft opacity-100'
                  : 'border-line opacity-60 hover:opacity-100'
              }`}
            >
              <img src={item.src} alt="" className="size-full object-cover object-top" />
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{project.name}</h3>
            {project.status ? (
              <span className="rounded border border-accent-soft/40 px-1.5 py-0.5 font-mono text-[11px] text-accent-soft">
                {project.status[locale]}
              </span>
            ) : null}
          </div>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted">
          {project.summary[locale]}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

// Entrance timeline (ms): title, description, then each row of cards.
const DESCRIPTION_AT = 400
const FIRST_ROW_AT = 800
const ROW_STEP = 400

const twoCols = '(min-width: 1024px)'
const threeCols = '(min-width: 1536px)'

function subscribe(onChange: () => void) {
  const queries = [twoCols, threeCols].map((q) => window.matchMedia(q))
  queries.forEach((q) => q.addEventListener('change', onChange))
  return () => queries.forEach((q) => q.removeEventListener('change', onChange))
}

function useColumns() {
  return useSyncExternalStore(subscribe, () =>
    window.matchMedia(threeCols).matches ? 3 : window.matchMedia(twoCols).matches ? 2 : 1,
  )
}

function ProjectSlot({
  project,
  row,
  clock,
}: {
  project: Project
  row: number
  clock: RefObject<number | null>
}) {
  const { ref, visible, delay } = useEntrance<HTMLDivElement>(clock, FIRST_ROW_AT + row * ROW_STEP)

  return (
    <div ref={ref} data-inview={visible} className="h-full">
      <div
        className={`h-full ${row % 2 === 0 ? 'slide-in-blurred-left' : 'slide-in-blurred-right'}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <FeaturedProject project={project} />
      </div>
    </div>
  )
}

export function Projects() {
  const featured = projects.filter((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)
  const clock = useRef<number | null>(null)
  const columns = useColumns()
  const { locale, t } = useLocale()
  const { ref: headerRef, visible: headerVisible, delay: headerDelay } = useEntrance<HTMLDivElement>(clock, 0)

  return (
    <section id="proyectos" className="overflow-x-clip border-t border-line py-16 md:py-20 lg:py-28">
      <div className="px-4 md:px-8 lg:px-24 xl:px-36">
        <div ref={headerRef} data-inview={headerVisible}>
          <h2
            className="slide-in-left text-3xl font-medium tracking-tight md:text-4xl"
            style={{ animationDelay: `${headerDelay}ms` }}
          >
            {t.projectsTitle}
          </h2>
          <p
            className="fade-in mt-3 max-w-[52ch] text-muted"
            style={{ animationDelay: `${headerDelay + DESCRIPTION_AT}ms` }}
          >
            {t.projectsDescription}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:mt-12 md:gap-8 lg:grid-cols-2 2xl:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectSlot
              key={project.name}
              project={project}
              row={Math.floor(index / columns)}
              clock={clock}
            />
          ))}
        </div>

        {rest.length > 0 ? (
          <div className="mt-16">
            {rest.map((project) => (
              <article
                key={project.name}
                className="grid gap-4 border-t border-line py-8 md:grid-cols-[minmax(0,220px)_1fr_auto] md:items-center"
              >
                <h3 className="text-xl font-medium tracking-tight">{project.name}</h3>
                <p className="max-w-[58ch] text-sm leading-relaxed text-muted">{project.summary[locale]}</p>
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
