import type { CSSProperties } from 'react'
import { stackGroups } from '../data/site'
import { techLogos, type TechName } from '../data/techLogos'
import { Reveal } from './Reveal'

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

function TechTile({ name }: { name: TechName }) {
  const logo = techLogos[name]

  return (
    <li className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-line bg-surface p-2 text-center transition-transform hover:-translate-y-0.5">
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

export function Stack() {
  return (
    <section id="stack" className="border-t border-line py-20 md:py-28">
      <div className="px-4 md:px-8 lg:px-24 xl:px-36">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Stack</h2>
          <p className="mt-3 text-muted">
            Herramientas que uso para construir, desplegar y dejar evidencia de que el sistema funciona.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {stackGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <h3 className="font-mono text-sm text-accent-soft">{group.title}</h3>
              <ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3">
                {group.items.map((item) => (
                  <TechTile key={item} name={item} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
