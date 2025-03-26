/**
 * BackToTop.js
 * Gerencia o botão de voltar ao topo da página
 */

export class BackToTop {
  constructor() {
    this.button = document.getElementById('backToTopBtn')
    this.scrollThreshold = 300 // Pixel de rolagem para mostrar o botão
    this.isVisible = false
  }

  init() {
    if (!this.button) {
      this.createButton()
    }

    this.setupEventListeners()
    this.checkScroll()
    console.log('BackToTop inicializado')
  }

  createButton() {
    this.button = document.createElement('button')
    this.button.id = 'backToTopBtn'
    this.button.className = 'back-to-top'
    this.button.setAttribute('aria-label', 'Voltar ao topo')
    this.button.innerHTML = '<i class="fas fa-arrow-up"></i>'
    document.body.appendChild(this.button)
  }

  setupEventListeners() {
    this.button.addEventListener('click', () => this.scrollToTop())
  }

  handleScroll() {
    this.checkScroll()
  }

  checkScroll() {
    if (window.scrollY > this.scrollThreshold) {
      this.showButton()
    } else {
      this.hideButton()
    }
  }

  showButton() {
    if (!this.isVisible) {
      this.button.classList.add('visible')
      this.isVisible = true
    }
  }

  hideButton() {
    if (this.isVisible) {
      this.button.classList.remove('visible')
      this.isVisible = false
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
