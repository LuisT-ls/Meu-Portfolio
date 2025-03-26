/**
 * NotificationManager.js
 * Gerencia o sistema de notificações e alertas
 */

export class NotificationManager {
  constructor() {
    this.container = document.getElementById('notification-container')
    this.timeout = 5000 // Duração da notificação em ms
    this.notifications = []

    if (!this.container) {
      this.createContainer()
    }
  }

  init() {
    console.log('NotificationManager inicializado')
  }

  createContainer() {
    this.container = document.createElement('div')
    this.container.id = 'notification-container'
    document.body.appendChild(this.container)
  }

  show(message, type = 'info') {
    // Cria elemento de notificação
    const notification = this.createNotification(message, type)

    // Adiciona ao DOM
    this.container.appendChild(notification)

    // Força reflow para iniciar a animação
    notification.offsetHeight

    // Inicia animação de entrada
    notification.classList.add('visible')

    // Adiciona à lista de notificações ativas
    this.notifications.push(notification)

    // Configura remoção automática
    const timeout = setTimeout(() => {
      this.dismiss(notification)
    }, this.timeout)

    // Armazena referência ao timeout para cancelamento
    notification.dataset.timeout = timeout

    return notification
  }

  dismiss(notification) {
    // Cancela timeout se estiver sendo fechado manualmente
    if (notification.dataset.timeout) {
      clearTimeout(notification.dataset.timeout)
    }

    // Animação de saída
    notification.classList.add('closing')

    // Remove após animação
    setTimeout(() => {
      if (notification.parentNode === this.container) {
        this.container.removeChild(notification)
      }

      // Remove da lista de notificações ativas
      this.notifications = this.notifications.filter(
        item => item !== notification
      )
    }, 300)
  }

  dismissAll() {
    // Fecha todas as notificações ativas
    ;[...this.notifications].forEach(notification => {
      this.dismiss(notification)
    })
  }

  createNotification(message, type) {
    const notification = document.createElement('div')
    notification.className = `notification ${type}`

    // Ícone com base no tipo
    let icon = ''
    switch (type) {
      case 'success':
        icon = '<i class="fas fa-check-circle"></i>'
        break
      case 'error':
        icon = '<i class="fas fa-exclamation-circle"></i>'
        break
      case 'warning':
        icon = '<i class="fas fa-exclamation-triangle"></i>'
        break
      default:
        icon = '<i class="fas fa-info-circle"></i>'
    }

    // Estrutura HTML
    notification.innerHTML = `
      <div class="notification-icon">${icon}</div>
      <div class="notification-content">
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close" aria-label="Fechar">
        <i class="fas fa-times"></i>
      </button>
      <div class="notification-progress"></div>
    `

    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close')
    closeBtn.addEventListener('click', () => this.dismiss(notification))

    return notification
  }
}
