import { useEffect, useState, type ReactNode } from 'react'
import { initialLocale, LocaleContext, ui, type Locale } from './locale'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = ui[locale].title
  }, [locale])

  const toggle = () => {
    const next = locale === 'es' ? 'en' : 'es'
    setLocale(next)
    try {
      localStorage.setItem('locale', next)
    } catch {
      // Storage blocked: the language still applies for this visit.
    }
  }

  return (
    <LocaleContext.Provider value={{ locale, toggle, t: ui[locale] }}>
      {children}
    </LocaleContext.Provider>
  )
}
