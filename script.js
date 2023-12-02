;(() => {
  // Seleciona o botão do menu e o elemento de navegação
  const menuBtn = document.querySelector('.menu-btn')
  const nav = document.querySelector('nav')

  // Função para alternar a exibição do menu
  const toggleMenu = () => {
    nav.classList.toggle('show')
  }

  // Adiciona um ouvinte de evento de clique ao botão do menu
  menuBtn.addEventListener('click', toggleMenu)
})()

document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.skill-progress')

  progressBars.forEach(bar => {
    const value = bar.getAttribute('data-progress')
    animateProgressBar(bar, value)
  })

  // Adicionando animações específicas para Segurança da Informação e Redes de Computadores
  const securityProgressBar = document.querySelector(
    '.security .skill-progress'
  )
  const networkingProgressBar = document.querySelector(
    '.networking .skill-progress'
  )

  animateProgressBar(
    securityProgressBar,
    securityProgressBar.getAttribute('data-progress')
  )
  animateProgressBar(
    networkingProgressBar,
    networkingProgressBar.getAttribute('data-progress')
  )
})

function animateProgressBar(bar, value) {
  let progress = 0
  const interval = setInterval(() => {
    bar.style.width = `${progress}%`
    progress += 1

    if (progress > parseInt(value)) {
      clearInterval(interval)
    }
  }, 10)
}
