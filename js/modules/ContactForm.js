/**
 * ContactForm.js
 * Gerencia o formulário de contato, validação e envio
 */

import { NotificationManager } from './NotificationManager.js'

export class ContactForm {
  constructor() {
    this.form = document.getElementById('contato-form')
    this.submitBtn = this.form
      ? this.form.querySelector('button[type="submit"]')
      : null
    this.inputs = this.form ? this.form.querySelectorAll('input, textarea') : []
    this.notification = new NotificationManager()
    this.emailJsServiceId = 'service_id' // Substitua pelo seu service ID
    this.emailJsTemplateId = 'template_id' // Substitua pelo seu template ID
    this.emailJsUserId = '1PLc3xymOa3PrKHEX' // Seu user ID
  }

  init() {
    if (this.form) {
      this.setupEventListeners()
      this.setupValidation()
      console.log('ContactForm inicializado')
    } else {
      console.warn('Formulário de contato não encontrado')
    }
  }

  setupEventListeners() {
    // Evento de envio do formulário
    this.form.addEventListener('submit', e => this.handleSubmit(e))

    // Validação em tempo real para melhor UX
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateInput(input))
      input.addEventListener('input', () => this.validateInput(input))
    })
  }

  setupValidation() {
    // Configura validação nativa do navegador
    this.form.setAttribute('novalidate', '')
  }

  validateInput(input) {
    // Validação básica por tipo de campo
    const isValid = input.checkValidity()

    if (isValid) {
      input.classList.remove('is-invalid')
      input.classList.add('is-valid')
    } else {
      input.classList.remove('is-valid')
      input.classList.add('is-invalid')
    }

    return isValid
  }

  validateForm() {
    let isValid = true

    // Verifica cada campo
    this.inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false
      }
    })

    return isValid
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Validar formulário antes de enviar
    if (!this.validateForm()) {
      this.notification.show(
        'Por favor, preencha todos os campos corretamente.',
        'error'
      )
      return
    }

    // Preparação para envio
    const submitBtnText = this.submitBtn.querySelector('.btn-text')
    const submitBtnLoading = this.submitBtn.querySelector('.btn-loading')

    try {
      // Mostrar indicador de carregamento
      this.submitBtn.disabled = true
      submitBtnText.hidden = true
      submitBtnLoading.hidden = false

      // Coletar dados do formulário
      const formData = {
        nome: this.form.nome.value,
        email: this.form.email.value,
        mensagem: this.form.mensagem.value
      }

      // Verificar se EmailJS está disponível
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS não está disponível')
      }

      // Enviar email usando EmailJS
      const response = await emailjs.send(
        this.emailJsServiceId,
        this.emailJsTemplateId,
        formData,
        this.emailJsUserId
      )

      // Verificar resposta
      if (response.status === 200) {
        // Sucesso
        this.notification.show(
          'Mensagem enviada com sucesso! Logo entrarei em contato.',
          'success'
        )
        this.form.reset()

        // Resetar estado de validação
        this.inputs.forEach(input => {
          input.classList.remove('is-valid', 'is-invalid')
        })
      } else {
        throw new Error('Erro ao enviar mensagem')
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      this.notification.show(
        'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
        'error'
      )
    } finally {
      // Restaurar botão
      this.submitBtn.disabled = false
      submitBtnText.hidden = false
      submitBtnLoading.hidden = true
    }
  }
}
