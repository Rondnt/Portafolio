import { useInView } from 'motion/react'
import { useRef, type CSSProperties } from 'react'
import { stackGroups } from '../data/site'
import { techLogos, type TechName } from '../data/techLogos'

const LIGHT_SURFACE = '#fffdf8'
const DARK_SURFACE = '#1c1f26'

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Brand colors too close to the tile background fall back to the text color of that theme.
function brandColors(hex: string): CSSProperties {
  const visible = (surface: string) => contrast(hex, surface.slice(1)) >= 1.5
  return {
    '--logo-light': visible(LIGHT_SURFACE) ? `#${hex}` : 'var(--color-ink)',
    '--logo-dark': visible(DARK_SURFACE) ? `#${hex}` : 'var(--color-ink)',
  } as CSSProperties
}

function TechTile({ name, delay }: { name: TechName; delay: number }) {
  const logo = techLogos[name]

  return (
    <li
      className="slide-in-fwd-center flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-line bg-surface p-2 text-center transition-transform hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      {'brand' in logo ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-8 fill-current text-[var(--logo-light)] dark:text-[var(--logo-dark)]"
          style={brandColors(logo.brand.hex)}
        >
          <path d={logo.brand.path} />
        </svg>
      ) : (
        <logo.concept size={32} weight="duotone" aria-hidden className="text-accent-soft" />
      )}
      <span className="text-[11px] font-medium leading-tight">{name}</span>
    </li>
  )
}

// Entrance timeline (ms): title, then description, then each group's label followed by all its tiles
// at once. The next group's label starts when the previous group's tiles come in.
const DESCRIPTION_AT = 600
const FIRST_GROUP_AT = 1000
const TILES_AFTER_LABEL = 600

const groupStarts = stackGroups.map((_, index) => FIRST_GROUP_AT + index * TILES_AFTER_LABEL)

export function Stack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="stack" className="border-t border-line py-20 md:py-28">
      <div ref={ref} data-inview={inView} className="px-4 md:px-8 lg:px-24 xl:px-36">
        <div className="[perspective:1000px]">
          <h2 className="tracking-in-expand-fwd text-3xl font-medium tracking-tight md:text-4xl">Stack</h2>
        </div>
        <p className="fade-in mt-3 text-muted" style={{ animationDelay: `${DESCRIPTION_AT}ms` }}>
          Herramientas que uso para construir, desplegar y dejar evidencia de que el sistema funciona.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {stackGroups.map((group, index) => (
            <div key={group.title}>
              <h3
                className="text-focus-in font-mono text-sm text-accent-soft"
                style={{ animationDelay: `${groupStarts[index]}ms` }}
              >
                {group.title}
              </h3>
              <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3 [perspective:1000px]">
                {group.items.map((item) => (
                  <TechTile key={item} name={item} delay={groupStarts[index] + TILES_AFTER_LABEL} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
