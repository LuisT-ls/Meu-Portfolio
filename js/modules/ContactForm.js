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
    this.submitBtnText = this.submitBtn
      ? this.submitBtn.querySelector('.btn-text')
      : null
    this.submitBtnLoading = this.submitBtn
      ? this.submitBtn.querySelector('.btn-loading')
      : null
    this.inputs = this.form ? this.form.querySelectorAll('input, textarea') : []
    this.messageField = this.form
      ? this.form.querySelector('textarea[name="mensagem"]')
      : null
    this.charCounter = null
    this.minMessageLength = 10
    this.notification = new NotificationManager()
    this.emailJsServiceId = 'service_id' // Substitua pelo seu service ID
    this.emailJsTemplateId = 'template_id' // Substitua pelo seu template ID
    this.emailJsUserId = '1PLc3xymOa3PrKHEX' // Seu user ID

    // Mensagens de erro personalizadas
    this.errorMessages = {
      nome: {
        valueMissing: 'Por favor, digite seu nome completo',
        tooShort: 'O nome deve ter pelo menos 2 caracteres',
        patternMismatch: 'O nome deve conter apenas letras e espaços'
      },
      email: {
        valueMissing: 'Por favor, digite seu email',
        typeMismatch:
          'Por favor, digite um email válido (exemplo: nome@dominio.com)',
        patternMismatch:
          'Por favor, digite um email válido (exemplo: nome@dominio.com)'
      },
      mensagem: {
        valueMissing: 'Por favor, digite sua mensagem',
        tooShort: `A mensagem deve ter pelo menos ${this.minMessageLength} caracteres`
      }
    }
  }

  init() {
    if (this.form) {
      // Esconder o estado de carregamento inicialmente
      if (this.submitBtnLoading) {
        this.submitBtnLoading.style.display = 'none'
      }

      this.setupEventListeners()
      this.setupValidation()
      this.createCharCounter()
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
      input.addEventListener('input', () => {
        this.validateInput(input)

        // Atualizar contador se for o campo de mensagem
        if (input.name === 'mensagem') {
          this.updateCharCounter(input.value.length)
        }
      })
    })
  }

  setupValidation() {
    // Configura validação nativa do navegador
    this.form.setAttribute('novalidate', '')

    // Configurar validações específicas
    const emailInput = this.form.querySelector('input[name="email"]')
    if (emailInput) {
      // Padrão de email mais restritivo
      emailInput.pattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    }

    const nomeInput = this.form.querySelector('input[name="nome"]')
    if (nomeInput) {
      // Padrão para aceitar apenas letras e espaços
      nomeInput.pattern = '[A-Za-zÀ-ÿ\\s]+'
      nomeInput.minLength = 2
    }

    if (this.messageField) {
      this.messageField.minLength = this.minMessageLength
    }
  }

  createCharCounter() {
    if (this.messageField) {
      // Criar o contador
      this.charCounter = document.createElement('div')
      this.charCounter.className = 'char-counter'
      this.updateCharCounter(this.messageField.value.length)

      // Inserir após o campo de mensagem
      const parentElement = this.messageField.closest('.form-group')
      const helpText = parentElement.querySelector('#mensagem-help')
      if (helpText) {
        parentElement.insertBefore(this.charCounter, helpText.nextSibling)
      } else {
        parentElement.appendChild(this.charCounter)
      }
    }
  }

  updateCharCounter(length) {
    if (this.charCounter) {
      const isSufficient = length >= this.minMessageLength

      this.charCounter.textContent = `${length} / ${this.minMessageLength} caracteres mínimos`
      this.charCounter.className = `char-counter ${
        isSufficient ? 'sufficient' : 'insufficient'
      }`
    }
  }

  validateInput(input) {
    const field = input.name
    let errorMessage = ''

    // Verificar cada tipo de erro possível
    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        errorMessage =
          this.errorMessages[field]?.valueMissing || 'Este campo é obrigatório'
      } else if (input.validity.typeMismatch) {
        errorMessage =
          this.errorMessages[field]?.typeMismatch || 'Formato inválido'
      } else if (input.validity.tooShort) {
        errorMessage =
          this.errorMessages[field]?.tooShort ||
          `Mínimo de ${input.minLength} caracteres`
      } else if (input.validity.patternMismatch) {
        errorMessage =
          this.errorMessages[field]?.patternMismatch || 'Formato inválido'
      }
    }

    // Atualizar classes e mensagem de erro
    if (errorMessage) {
      input.classList.remove('is-valid')
      input.classList.add('is-invalid')

      // Encontrar e atualizar o elemento de feedback
      const formGroup = input.closest('.form-group')
      const feedback = formGroup.querySelector('.invalid-feedback')
      if (feedback) {
        feedback.textContent = errorMessage
        feedback.style.display = 'block'
      }

      return false
    } else {
      input.classList.remove('is-invalid')
      input.classList.add('is-valid')

      // Esconder mensagem de erro
      const formGroup = input.closest('.form-group')
      const feedback = formGroup.querySelector('.invalid-feedback')
      if (feedback) {
        feedback.style.display = 'none'
      }

      return true
    }
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

    try {
      // Mostrar indicador de carregamento
      this.submitBtn.disabled = true
      if (this.submitBtnText) this.submitBtnText.style.display = 'none'
      if (this.submitBtnLoading) this.submitBtnLoading.style.display = 'flex'

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

        // Resetar contador
        if (this.messageField) {
          this.updateCharCounter(0)
        }
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
      if (this.submitBtnText) this.submitBtnText.style.display = 'flex'
      if (this.submitBtnLoading) this.submitBtnLoading.style.display = 'none'
    }
  }
}
