import { registrarVisita, getTotalVisitas } from './db/firebase.js'

// Módulo para gerenciar o tema
const themeManager = {
  init() {
    const themeToggle = document.getElementById('theme-toggle')
    const body = document.body
    const currentTheme = localStorage.getItem('theme') || 'dark'
    body.classList.add(currentTheme)

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode')
      localStorage.setItem(
        'theme',
        body.classList.contains('dark-mode') ? 'dark' : 'light'
      )
    })
  }
}

// Módulo para gerenciar o menu
const menuManager = {
  init() {
    const menuBtn = document.getElementById('menu-btn')
    const navbar = document.getElementById('navbar')

    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('active')
      menuBtn.classList.toggle('open')
    })
  }
}

// Módulo para gerenciar a rolagem suave
const smoothScrollManager = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.smoothScroll)
    })

    document.querySelector('a[href="#"]').addEventListener('click', e => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  },

  smoothScroll(e) {
    e.preventDefault()
    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)
    const headerHeight = document.querySelector('header').offsetHeight
    const elementPosition = targetElement.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Módulo para gerenciar os projetos
const projectManager = {
  async init() {
    try {
      const projects = await this.fetchProjects()
      this.renderProjects(projects)
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
    }
  },

  async fetchProjects() {
    const response = await fetch('/Data/projetos.json')
    if (!response.ok) {
      throw new Error('Falha ao buscar projetos')
    }
    return response.json()
  },

  renderProjects(projects) {
    const projectsGrid = document.getElementById('projetos-grid')
    projects.forEach(project => {
      const projectDiv = document.createElement('div')
      projectDiv.classList.add('projeto', 'animate-on-scroll')
      projectDiv.innerHTML = `
        <h3>${project.nome}</h3>
        <p>${project.descricao}</p>
        <a href="${project.link}" target="_blank">Ver Projeto</a>
      `
      projectsGrid.appendChild(projectDiv)
    })
  }
}

// Módulo para gerenciar o formulário de contato
const contactFormManager = {
  init() {
    const form = document.getElementById('contato-form')
    form.addEventListener('submit', this.handleSubmit.bind(this))
  },

  async handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    if (!this.validateForm(formData)) {
      return
    }

    try {
      await this.sendEmail(formData)
      this.showFeedback('Mensagem enviada com sucesso!', 'success')
      form.reset()
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      this.showFeedback(
        'Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.',
        'error'
      )
    }
  },

  validateForm(formData) {
    const email = formData.get('email')
    const nome = formData.get('nome')
    const mensagem = formData.get('mensagem')

    if (!nome || !email || !mensagem) {
      this.showFeedback('Por favor, preencha todos os campos.', 'error')
      return false
    }

    if (!this.validateEmail(email)) {
      this.showFeedback('Por favor, insira um e-mail válido.', 'error')
      return false
    }

    return true
  },

  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  },

  async sendEmail(formData) {
    const templateParams = {
      from_name: formData.get('nome'),
      from_email: formData.get('email'),
      message: formData.get('mensagem')
    }

    const response = await emailjs.send(
      'service_luist-ls',
      'template_8vzhxeg',
      templateParams
    )
    if (response.status !== 200) {
      throw new Error('Falha ao enviar e-mail')
    }
  },

  showFeedback(message, type) {
    const feedbackElement = document.createElement('div')
    feedbackElement.textContent = message
    feedbackElement.classList.add('feedback', type)
    document.body.appendChild(feedbackElement)

    setTimeout(() => {
      feedbackElement.remove()
    }, 5000)
  }
}

// Módulo para gerenciar animações
const animationManager = {
  init() {
    this.observeSections()
    this.observeAnimatedElements()
  },

  observeSections() {
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach(section => observer.observe(section))
  },

  observeAnimatedElements() {
    const elements = document.querySelectorAll('.animate-on-scroll')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach(element => observer.observe(element))
  }
}

// Módulo para gerenciar estatísticas de visitas
const visitStatsManager = {
  async init() {
    await this.registerVisit()
    await this.updateVisitCount()
  },

  async registerVisit() {
    try {
      await registrarVisita()
    } catch (error) {
      console.error('Falha ao registrar visita:', error)
    }
  },

  async updateVisitCount() {
    try {
      const total = await getTotalVisitas()
      const totalVisitasElement = document.getElementById('total-visitas')
      totalVisitasElement.textContent = `Total de visitas: ${total}`
    } catch (error) {
      console.error('Falha ao obter total de visitas:', error)
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('1PLc3xymOa3PrKHEX')
  themeManager.init()
  menuManager.init()
  smoothScrollManager.init()
  projectManager.init()
  contactFormManager.init()
  animationManager.init()
  visitStatsManager.init()
})
