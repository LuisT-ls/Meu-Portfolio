/**
 * Navigation.js
 * Gerencia o menu de navegação, links suaves e comportamento responsivo
 */

export class Navigation {
  constructor() {
    this.header = document.querySelector('header')
    this.menuBtn = document.getElementById('menu-btn')
    this.nav = document.querySelector('.main-nav')
    this.navLinks = document.querySelectorAll('.nav-link')
    this.mobileBreakpoint = 768
    this.scrollThreshold = 100
    this.isMenuOpen = false
  }

  init() {
    this.setupEventListeners()
    this.setupCurrentPageIndicator()
    console.log('Navigation inicializado')
  }

  setupEventListeners() {
    // Menu mobile toggle
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', () => this.toggleMenu())
    }

    // Navegação suave para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => this.smoothScroll(e))
    })

    // Fechar menu ao clicar em link no mobile
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= this.mobileBreakpoint && this.isMenuOpen) {
          this.toggleMenu()
        }
      })
    })

    // Clicar fora para fechar o menu
    document.addEventListener('click', e => {
      if (
        this.isMenuOpen &&
        window.innerWidth <= this.mobileBreakpoint &&
        !e.target.closest('.main-nav') &&
        !e.target.closest('#menu-btn')
      ) {
        this.toggleMenu()
      }
    })
  }

  setupCurrentPageIndicator() {
    // Marcar o link atual baseado na seção visível
    this.highlightVisibleSection()
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen

    if (this.nav) {
      this.nav.classList.toggle('active')
    }

    if (this.menuBtn) {
      this.menuBtn.classList.toggle('active')
      this.menuBtn.setAttribute('aria-expanded', this.isMenuOpen)

      // Animar barras do menu
      const bars = this.menuBtn.querySelectorAll('.bar')
      if (bars.length >= 3) {
        bars[0].style.transform = this.isMenuOpen
          ? 'rotate(45deg) translate(6px, 6px)'
          : 'none'
        bars[1].style.opacity = this.isMenuOpen ? '0' : '1'
        bars[2].style.transform = this.isMenuOpen
          ? 'rotate(-45deg) translate(6px, -6px)'
          : 'none'
      }
    }

    // Prevenir scroll do body quando o menu está aberto no mobile
    document.body.style.overflow =
      this.isMenuOpen && window.innerWidth <= this.mobileBreakpoint
        ? 'hidden'
        : ''
  }

  smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href')

    if (href.startsWith('#') && href !== '#') {
      e.preventDefault()
      const targetElement = document.querySelector(href)

      if (targetElement) {
        const headerOffset = this.header ? this.header.offsetHeight : 0
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = targetPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  handleScroll() {
    // Header encolhido ao rolar
    if (window.scrollY > this.scrollThreshold) {
      this.header?.classList.add('shrink')
    } else {
      this.header?.classList.remove('shrink')
    }

    // Atualizar indicador de seção atual
    this.highlightVisibleSection()
  }

  handleResize() {
    // Ajustes para mudança entre desktop e mobile
    if (window.innerWidth > this.mobileBreakpoint) {
      // Resetar estilos do mobile quando voltar para desktop
      if (this.isMenuOpen) {
        this.isMenuOpen = false
        this.nav?.classList.remove('active')
        this.menuBtn?.classList.remove('active')
        document.body.style.overflow = ''

        const bars = this.menuBtn?.querySelectorAll('.bar')
        if (bars && bars.length >= 3) {
          bars[0].style.transform = 'none'
          bars[1].style.opacity = '1'
          bars[2].style.transform = 'none'
        }
      }
    }
  }

  highlightVisibleSection() {
    // Identificar qual seção está mais visível na tela
    const sections = document.querySelectorAll('section[id]')
    let currentSection = ''

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const headerHeight = this.header ? this.header.offsetHeight : 0

      if (window.scrollY >= sectionTop - headerHeight - 100) {
        currentSection = section.getAttribute('id')
      }
    })

    // Atualizar links ativos
    this.navLinks.forEach(link => {
      link.classList.remove('active')
      link.removeAttribute('aria-current')

      const href = link.getAttribute('href')
      if (href === `#${currentSection}`) {
        link.classList.add('active')
        link.setAttribute('aria-current', 'page')
      }
    })
  }
}
