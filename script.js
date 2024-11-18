// Classe principal para gerenciar o portfólio
class Portfolio {
  constructor() {
    this.initializeComponents()
    this.setupEventListeners()
    this.loadProjects()
  }

  // Inicializa componentes e referências
  initializeComponents() {
    this.header = document.querySelector('header')
    this.menuBtn = document.querySelector('#menu-btn')
    this.nav = document.querySelector('nav')
    this.themeToggle = document.querySelector('#theme-toggle')
    this.sections = document.querySelectorAll('section')
    this.form = document.querySelector('#contato-form')

    // Inicializa o tema salvo
    this.initializeTheme()
  }

  // Configura todos os event listeners
  setupEventListeners() {
    // Menu mobile
    this.menuBtn?.addEventListener('click', () => this.toggleMenu())

    // Tema
    this.themeToggle?.addEventListener('click', () => this.toggleTheme())

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => this.smoothScroll(e))
    })

    // Form de contato
    this.form?.addEventListener('submit', e => this.handleFormSubmit(e))

    // Scroll events para animações
    window.addEventListener('scroll', () => this.handleScroll())

    // Interseção observer para lazy loading
    this.setupIntersectionObserver()
  }

  // Toggle do menu mobile
  toggleMenu() {
    this.nav.classList.toggle('active')
    this.menuBtn.classList.toggle('active')

    // Anima as barras do menu
    const bars = this.menuBtn.querySelectorAll('.bar')
    bars[0].style.transform = this.nav.classList.contains('active')
      ? 'rotate(45deg) translate(6px, 6px)'
      : 'none'
    bars[1].style.opacity = this.nav.classList.contains('active') ? '0' : '1'
    bars[2].style.transform = this.nav.classList.contains('active')
      ? 'rotate(-45deg) translate(6px, -6px)'
      : 'none'
  }

  // Gerenciamento de tema escuro/claro
  initializeTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      document.body.classList.toggle('dark-mode', savedTheme === 'dark')
      this.updateThemeIcon(savedTheme === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode')
      this.updateThemeIcon(true)
    }
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    this.updateThemeIcon(isDark)
  }

  updateThemeIcon(isDark) {
    this.themeToggle.innerHTML = isDark ? '☀️' : '🌙'
    this.themeToggle.setAttribute(
      'aria-label',
      `Mudar para tema ${isDark ? 'claro' : 'escuro'}`
    )
  }

  // Gerencia o formulário de contato
  async handleFormSubmit(e) {
    e.preventDefault()
    const form = e.target
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalBtnText = submitBtn.textContent

    try {
      submitBtn.disabled = true
      submitBtn.textContent = 'Enviando...'

      const formData = {
        nome: form.nome.value,
        email: form.email.value,
        mensagem: form.mensagem.value
      }

      // Envia o email usando EmailJS
      await emailjs.send('service_id', 'template_id', formData)

      // Feedback de sucesso
      this.showNotification('Mensagem enviada com sucesso!', 'success')
      form.reset()
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      this.showNotification(
        'Erro ao enviar mensagem. Tente novamente.',
        'error'
      )
    } finally {
      submitBtn.disabled = false
      submitBtn.textContent = originalBtnText
    }
  }

  // Sistema de notificações
  showNotification(message, type = 'info') {
    const notification = document.createElement('div')
    notification.className = `notification ${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    // Anima a entrada
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)'
      notification.style.opacity = '1'
    })

    // Remove após 5 segundos
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      notification.style.opacity = '0'
      setTimeout(() => notification.remove(), 300)
    }, 5000)
  }

  // Scroll suave para links internos
  smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href')
    if (href.startsWith('#')) {
      e.preventDefault()
      const elemento = document.querySelector(href)
      if (elemento) {
        elemento.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        // Fecha o menu mobile se estiver aberto
        if (this.nav.classList.contains('active')) {
          this.toggleMenu()
        }
      }
    }
  }

  // Gerencia efeitos de scroll
  handleScroll() {
    // Header sticky com efeito de shrink
    if (window.scrollY > 100) {
      this.header.classList.add('shrink')
    } else {
      this.header.classList.remove('shrink')
    }

    // Botão de voltar ao topo
    this.toggleBackToTopButton()
  }

  // Configura o observer para lazy loading e animações
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          // Para imagens com lazy loading
          if (entry.target.tagName === 'IMG') {
            entry.target.src = entry.target.dataset.src
            observer.unobserve(entry.target)
          }
        }
      })
    }, options)

    // Observa seções para animações
    this.sections.forEach(section => observer.observe(section))

    // Observa imagens para lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img)
    })
  }

  // Toggle do botão voltar ao topo
  toggleBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top')
    if (window.scrollY > 500) {
      if (!backToTopBtn) {
        const btn = document.createElement('button')
        btn.className = 'back-to-top'
        btn.innerHTML = '↑'
        btn.setAttribute('aria-label', 'Voltar ao topo')
        btn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        })
        document.body.appendChild(btn)
      }
    } else if (backToTopBtn) {
      backToTopBtn.remove()
    }
  }
}

// Inicializa o portfólio quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio()
})

// Adiciona estilos CSS para os novos elementos
const style = document.createElement('style')
style.textContent = `
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 4px;
    background: var(--card-bg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .notification.success {
    border-left: 4px solid #22c55e;
  }

  .notification.error {
    border-left: 4px solid #ef4444;
  }

  .back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .back-to-top:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
  }

  .projeto {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
  }

  .projeto.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tech-tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    margin: 0.2rem;
    background: var(--primary-color);
    color: white;
    border-radius: 15px;
    font-size: 0.8rem;
  }

  .projeto-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .projeto-link:hover {
    background: var(--secondary-color);
    transform: translateY(-2px);
  }
`

document.head.appendChild(style)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollButton = document.createElement('button')
scrollButton.innerHTML = '↑'
scrollButton.className = 'scroll-to-top'
scrollButton.setAttribute('aria-label', 'Voltar ao topo')
document.body.appendChild(scrollButton)

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 200) {
    scrollButton.classList.add('visible')
  } else {
    scrollButton.classList.remove('visible')
  }
})

scrollButton.addEventListener('click', scrollToTop)

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute('data-src')
        observer.unobserve(img)
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))
})

const sections = document.querySelectorAll('section')
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  },
  { threshold: 0.1 }
)

sections.forEach(section => {
  section.classList.add('section-hidden')
  sectionObserver.observe(section)
})

// Projects Manager
class ProjectsManager {
  constructor() {
    this.username = 'LuisT-ls'
    this.projectsContainer = document.querySelector('.projetos-grid')
    this.init()
  }

  async init() {
    try {
      const repos = await this.fetchRepositories()
      this.renderProjects(repos)
      this.setupIntersectionObserver()
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
      this.showErrorMessage()
    }
  }

  async fetchRepositories() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${this.username}/repos`
      )
      if (!response.ok) throw new Error('Erro ao buscar repositórios')
      const repos = await response.json()

      return repos
        .filter(repo => !repo.fork && !repo.private)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
    } catch (error) {
      console.error('Erro ao buscar repositórios:', error)
      throw error
    }
  }

  showErrorMessage() {
    if (this.projectsContainer) {
      this.projectsContainer.innerHTML = `
        <div class="projeto-error">
          <h3>Erro ao carregar projetos</h3>
          <p>Não foi possível carregar os projetos no momento.</p>
          <p>Por favor, tente novamente mais tarde.</p>
        </div>
      `
    }
  }

  createProjectElement(repo) {
    const article = document.createElement('article')
    article.className = 'projeto'

    const topics = repo.topics || []
    const description = repo.description || 'Sem descrição disponível.'

    article.innerHTML = `
      <div class="projeto-header">
        <i class="fab fa-github"></i>
        <h3>${this.escapeHtml(repo.name)}</h3>
      </div>
      <div class="projeto-content">
        <p class="projeto-descricao">${this.escapeHtml(description)}</p>
        <div class="projeto-tecnologias">
          ${topics
            .map(
              topic => `<span class="tech-tag">${this.escapeHtml(topic)}</span>`
            )
            .join('')}
        </div>
        <div class="projeto-stats">
          <span class="stars">
            <i class="fas fa-star"></i>
            <span>${repo.stargazers_count}</span>
          </span>
          <span class="forks">
            <i class="fas fa-code-branch"></i>
            <span>${repo.forks_count}</span>
          </span>
        </div>
        <div class="projeto-links">
          ${
            repo.homepage
              ? `
            <a href="${this.escapeHtml(repo.homepage)}" 
               class="projeto-link demo" 
               target="_blank" 
               rel="noopener noreferrer">
              <i class="fas fa-external-link-alt"></i> Demo
            </a>
          `
              : ''
          }
          <a href="${this.escapeHtml(repo.html_url)}" 
             class="projeto-link repo" 
             target="_blank" 
             rel="noopener noreferrer">
            <i class="fab fa-github"></i> Repositório
          </a>
        </div>
      </div>
    `

    return article
  }

  escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return ''
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  renderProjects(repos) {
    if (!this.projectsContainer) return

    this.projectsContainer.innerHTML = ''
    repos.forEach(repo => {
      const projectElement = this.createProjectElement(repo)
      this.projectsContainer.appendChild(projectElement)
    })
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1
      }
    )

    document.querySelectorAll('.projeto').forEach(project => {
      observer.observe(project)
    })
  }
}

// Inicializa o gerenciador de projetos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsManager()
})
