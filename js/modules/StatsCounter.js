/**
 * StatsCounter.js
 * Gerencia o contador de números na seção de estatísticas
 */

export class StatsCounter {
  constructor() {
    this.statElements = document.querySelectorAll('.stat-number')
    this.statsSection = document.querySelector('.sobre-stats')
    this.animationDuration = 2000 // duração da animação em ms
    this.frameDuration = 1000 / 60 // ~60fps
    this.hasAnimated = false
    this.observer = null
  }

  init() {
    this.setupIntersectionObserver()
    console.log('StatsCounter inicializado')
  }

  setupIntersectionObserver() {
    if (!this.statsSection) return

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.startCounting()
          this.hasAnimated = true
          this.observer.unobserve(entry.target)
        }
      })
    }, options)

    this.observer.observe(this.statsSection)
  }

  startCounting() {
    this.statElements.forEach((statElement, index) => {
      const targetValue =
        parseInt(statElement.getAttribute('data-count'), 10) || 0
      const startValue = 0
      const increment =
        targetValue / (this.animationDuration / this.frameDuration)

      // Delay progressivo para cada contador
      setTimeout(() => {
        this.animateCounter(statElement, startValue, targetValue, increment)
      }, index * 200)
    })
  }

  animateCounter(element, startValue, endValue, increment) {
    let currentValue = startValue
    let plus = ''

    // Verifica se deve adicionar "+" para valores acima de certos thresholds
    if (endValue >= 100) {
      plus = '+'
    }

    const counter = setInterval(() => {
      currentValue += increment

      if (currentValue >= endValue) {
        clearInterval(counter)
        currentValue = endValue
      }

      // Formata o número
      let displayValue = this.formatNumber(Math.floor(currentValue))

      // Atualiza o texto
      element.textContent = `${displayValue}${plus}`

      if (currentValue >= endValue) {
        clearInterval(counter)
      }
    }, this.frameDuration)
  }

  formatNumber(num) {
    // Formata números grandes com separadores de milhar
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}
