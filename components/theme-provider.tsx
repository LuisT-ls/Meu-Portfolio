'use client'

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themeListeners = new Set<() => void>()

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener)
  return () => themeListeners.delete(listener)
}

function notifyThemeListeners() {
  themeListeners.forEach((listener) => listener())
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null

  const storedTheme = localStorage.getItem('preferred-theme')
  return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null
}

function getThemeSnapshot(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerThemeSnapshot(): Theme {
  return 'light'
}

function applyTheme(newTheme: Theme) {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  if (newTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  )

  useEffect(() => {
    const storageKey = 'preferred-theme'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const savedTheme = getStoredTheme()
    const initialTheme = savedTheme ?? (mediaQuery.matches ? 'dark' : 'light')

    if (initialTheme !== getThemeSnapshot()) {
      applyTheme(initialTheme)
      notifyThemeListeners()
    }

    // Detectar mudanças na preferência do sistema
    const handleChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        const newTheme = e.matches ? 'dark' : 'light'
        applyTheme(newTheme)
        notifyThemeListeners()
      }
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== storageKey) return

      const nextTheme = getStoredTheme() ?? (mediaQuery.matches ? 'dark' : 'light')
      applyTheme(nextTheme)
      notifyThemeListeners()
    }

    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme)
    localStorage.setItem('preferred-theme', newTheme)
    notifyThemeListeners()
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // Sempre fornecer o contexto, mesmo antes de montar
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  }
  return context
}
