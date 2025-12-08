'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const storageKey = 'preferred-theme'
    const savedTheme = localStorage.getItem(storageKey) as Theme | null

    // Sincronizar o estado com o que já foi aplicado pelo script inline
    const root = document.documentElement
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light'
    
    if (savedTheme) {
      setThemeState(savedTheme)
      // Apenas aplicar se for diferente do que já está aplicado
      if (savedTheme !== currentTheme) {
        applyTheme(savedTheme)
      }
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'light'
      setThemeState(initialTheme)
      // Apenas aplicar se for diferente do que já está aplicado
      if (initialTheme !== currentTheme) {
        applyTheme(initialTheme)
      }
    }

    // Detectar mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(storageKey)) {
        const newTheme = e.matches ? 'dark' : 'light'
        setThemeState(newTheme)
        applyTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-theme', newTheme)
    }
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

