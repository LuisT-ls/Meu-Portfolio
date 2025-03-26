/**
 * AnimationManager.js
 * Gerencia as animações de entrada e scroll
 */

export class AnimationManager {
  constructor() {
    this.animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .section-hidden'
    )
    this.skillItems = document.querySelectorAll('.skill-item')
    this.certItems = document.querySelectorAll('.certificacao')
    this.statItems = document.querySelectorAll('.stat-item')
    this.infoCards = document.querySelectorAll('.info-card')
    this.contactForm = document.querySelector('.contato-form')
    this.threshold = 0.2
    this.observer = null
  }

  init() {
    this.setupIntersectionObserver()
    this.observeElements()
    console.log('AnimationManager inicializado')
  }

  setupIntersectionObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: this.threshold // porcentagem visível para disparar
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adicionar classe de visibilidade
          entry.target.classList.add('visible')

          // Desregistrar depois de visível
          this.observer.unobserve(entry.target)
        }
      })
    }, options)
  }

  observeElements() {
    // Observar todos elementos com animação de entrada
    this.animatedElements.forEach(element => {
      this.observer.observe(element)
    })

    // Observar elementos específicos
    this.skillItems.forEach(element => {
      this.observer.observe(element)
    })

    this.certItems.forEach(element => {
      this.observer.observe(element)
    })

    this.statItems.forEach(element => {
      this.observer.observe(element)
    })

    this.infoCards.forEach(element => {
      this.observer.observe(element)
    })

    if (this.contactForm) {
      this.observer.observe(this.contactForm)
    }
  }

  handleScroll() {
    // Aqui podemos adicionar animações específicas baseadas no scroll
    // Esse método é chamado pelo portfolio principal durante eventos de scroll
    this.animateProgressBarsOnScroll()
  }

  animateProgressBarsOnScroll() {
    // Animar barras de progresso que ainda não foram animadas
    const progressBars = document.querySelectorAll(
      '.skill-level:not(.animated)'
    )

    progressBars.forEach(progressBar => {
      const rect = progressBar.getBoundingClientRect()
      const isVisible =
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0

      if (isVisible) {
        const level = progressBar.getAttribute('data-level') || '0'
        const progressBarEl = progressBar.querySelector('.progress-bar')

        if (progressBarEl) {
          progressBarEl.style.width = `${level}%`
          progressBar.classList.add('animated')
        }
      }
    })
  }
}
