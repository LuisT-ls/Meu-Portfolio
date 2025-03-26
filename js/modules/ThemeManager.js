/**
 * ThemeManager.js
 * Gerencia o tema claro/escuro do site
 */

export class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle')
    this.body = document.body
    this.storageKey = 'preferred-theme'
    this.darkModeClass = 'dark-mode'
  }

  init() {
    this.setupEventListeners()
    this.loadSavedTheme()
    console.log('ThemeManager inicializado')
  }

  setupEventListeners() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme())
    } else {
      console.warn('Botão de alternar tema não encontrado')
    }

    // Detectar mudanças na preferência do sistema
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!this.hasUserPreference()) {
          this.setTheme(e.matches ? 'dark' : 'light')
        }
      })
  }

  loadSavedTheme() {
    // Prioridade: 1. Preferência salva pelo usuário, 2. Preferência do sistema
    const savedTheme = localStorage.getItem(this.storageKey)

    if (savedTheme) {
      this.setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      this.setTheme(prefersDark ? 'dark' : 'light')
    }
  }

  toggleTheme() {
    if (this.body.classList.contains(this.darkModeClass)) {
      this.setTheme('light')
    } else {
      this.setTheme('dark')
    }
  }

  setTheme(theme) {
    if (theme === 'dark') {
      this.body.classList.add(this.darkModeClass)
    } else {
      this.body.classList.remove(this.darkModeClass)
    }

    // Salvar preferência
    localStorage.setItem(this.storageKey, theme)

    // Anunciar mudança
    document.dispatchEvent(
      new CustomEvent('themeChanged', { detail: { theme } })
    )
  }

  hasUserPreference() {
    return localStorage.getItem(this.storageKey) !== null
  }

  getCurrentTheme() {
    return this.body.classList.contains(this.darkModeClass) ? 'dark' : 'light'
  }
}
