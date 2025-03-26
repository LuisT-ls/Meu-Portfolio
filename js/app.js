/**
 * Arquivo principal JavaScript
 * Gerencia a inicialização de todos os módulos
 */

// Importação dos módulos
import { ThemeManager } from './modules/ThemeManager.js'
import { Navigation } from './modules/Navigation.js'
import { AnimationManager } from './modules/AnimationManager.js'
import { SkillsManager } from './modules/SkillsManager.js'
import { StatsCounter } from './modules/StatsCounter.js'
import { ContactForm } from './modules/ContactForm.js'
import { NotificationManager } from './modules/NotificationManager.js'
import { BackToTop } from './modules/BackToTop.js'

// Classe principal para gerenciar o portfólio
class Portfolio {
  constructor() {
    this.initializeModules()
    this.setupEventListeners()

    // Inicializar após o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init())
    } else {
      this.init()
    }
  }

  // Inicialização dos módulos
  initializeModules() {
    // Instancia todos os gerenciadores de funcionalidades
    this.themeManager = new ThemeManager()
    this.navigation = new Navigation()
    this.animationManager = new AnimationManager()
    this.skillsManager = new SkillsManager()
    this.statsCounter = new StatsCounter()
    this.contactForm = new ContactForm()
    this.notificationManager = new NotificationManager()
    this.backToTop = new BackToTop()

    console.log('Módulos inicializados')
  }

  // Configuração de event listeners globais
  setupEventListeners() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
    window.addEventListener('resize', this.handleResize.bind(this))

    console.log('Event listeners configurados')
  }

  // Inicialização geral após DOM pronto
  init() {
    // Inicia todos os módulos
    this.themeManager.init()
    this.navigation.init()
    this.animationManager.init()
    this.skillsManager.init()
    this.statsCounter.init()
    this.contactForm.init()
    this.notificationManager.init()
    this.backToTop.init()

    console.log('Aplicação inicializada')
  }

  // Gerenciamento de eventos de scroll
  handleScroll() {
    // Delega o tratamento para os módulos específicos
    this.animationManager.handleScroll()
    this.navigation.handleScroll()
    this.backToTop.handleScroll()
  }

  // Gerenciamento de eventos de redimensionamento
  handleResize() {
    // Ajustes para responsividade
    this.navigation.handleResize()
  }
}

// Inicializa a aplicação
const portfolio = new Portfolio()

export default portfolio
