/**
 * SkillsManager.js
 * Gerencia a animação e interação das habilidades
 */

export class SkillsManager {
  constructor() {
    this.skillItems = document.querySelectorAll('.skill-item')
    this.skillSection = document.getElementById('habilidades')
    this.animationDelay = 100 // ms entre animações
  }

  init() {
    this.setupEventListeners()
    console.log('SkillsManager inicializado')
  }

  setupEventListeners() {
    // Adiciona interação de hover para as habilidades
    this.skillItems.forEach((item, index) => {
      // Delay progressivo para animação
      const delay = index * this.animationDelay
      item.style.transitionDelay = `${delay}ms`

      // Hover effect
      item.addEventListener('mouseenter', () => this.handleSkillHover(item))
      item.addEventListener('mouseleave', () => this.handleSkillLeave(item))
    })
  }

  handleSkillHover(skillItem) {
    // Adiciona um destaque ao passar o mouse
    skillItem.classList.add('highlight')

    // Mostra detalhes adicionais se existirem
    const details = skillItem.querySelector('.skill-details')
    if (details) {
      details.classList.add('visible')
    }
  }

  handleSkillLeave(skillItem) {
    // Remove o destaque ao remover o mouse
    skillItem.classList.remove('highlight')

    // Esconde detalhes adicionais
    const details = skillItem.querySelector('.skill-details')
    if (details) {
      details.classList.remove('visible')
    }
  }

  // Anima as barras de progresso quando a seção se torna visível
  animateProgressBars() {
    this.skillItems.forEach((item, index) => {
      const progressBar = item.querySelector('.progress-bar')
      const level = item.dataset.skill ? item.dataset.level : '0'

      if (progressBar) {
        // Delay progressivo para animação
        setTimeout(() => {
          progressBar.style.width = `${level}%`
        }, index * this.animationDelay)
      }
    })
  }
}
