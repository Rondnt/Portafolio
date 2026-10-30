import { createContext, useContext } from 'react'

export type Locale = 'es' | 'en'
export type Localized<T = string> = Record<Locale, T>

export const locales: Locale[] = ['es', 'en']

export const ui = {
  es: {
    title: 'José Rondón - Portafolio',
    skipToContent: 'Saltar al contenido',
    nav: { inicio: 'Inicio', sobre: 'Sobre mí', stack: 'Stack', proyectos: 'Proyectos', contacto: 'Contacto' },
    toLightMode: 'Cambiar a modo claro',
    toDarkMode: 'Cambiar a modo oscuro',
    switchLanguage: 'Cambiar idioma a inglés',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    menuWhatsApp: 'Escríbeme por WhatsApp',
    email: 'Correo',
    seeProjects: 'Ver proyectos',
    messageMe: 'Escríbeme',
    aboutTitle: 'Sobre mí',
    avatarAlt: (name: string) => `Foto de perfil de ${name} en GitHub`,
    stackDescription:
      'Herramientas que uso para construir, desplegar y dejar evidencia de que el sistema funciona.',
    projectsTitle: 'Proyectos',
    projectsDescription:
      'Sistemas en producción y con demo en vivo. Algunos son de clientes, así que su código es privado.',
    openDemo: 'Abrir demo',
    code: 'Código',
    privateCode: 'Código privado',
    footer: '¿Hablamos? Escríbeme por correo, WhatsApp o LinkedIn.',
  },
  en: {
    title: 'José Rondón - Portfolio',
    skipToContent: 'Skip to content',
    nav: { inicio: 'Home', sobre: 'About', stack: 'Stack', proyectos: 'Projects', contacto: 'Contact' },
    toLightMode: 'Switch to light mode',
    toDarkMode: 'Switch to dark mode',
    switchLanguage: 'Switch language to Spanish',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuWhatsApp: 'Message me on WhatsApp',
    email: 'Email',
    seeProjects: 'See projects',
    messageMe: 'Message me',
    aboutTitle: 'About me',
    avatarAlt: (name: string) => `${name}'s GitHub profile picture`,
    stackDescription: 'Tools I use to build, ship and prove that the system works.',
    projectsTitle: 'Projects',
    projectsDescription:
      'Systems running in production with live demos. Some belong to clients, so their code is private.',
    openDemo: 'Live demo',
    code: 'Code',
    privateCode: 'Private code',
    footer: "Let's talk: reach me by email, WhatsApp or LinkedIn.",
  },
} satisfies Record<Locale, unknown>

export type UiStrings = (typeof ui)[Locale]

export const LocaleContext = createContext<{
  locale: Locale
  toggle: () => void
  t: UiStrings
} | null>(null)

// Saved choice first; otherwise follow the browser, defaulting to English for non-Spanish visitors.
export function initialLocale(): Locale {
  try {
    const stored = localStorage.getItem('locale')
    if (stored === 'es' || stored === 'en') return stored
  } catch {
    // Storage blocked: fall through to the browser language.
  }
  return navigator.languages.some((lang) => lang.toLowerCase().startsWith('es')) ? 'es' : 'en'
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
