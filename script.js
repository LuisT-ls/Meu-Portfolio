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
    bar.style.width = value
  })
})

progressBars.forEach(bar => {
  let progress = 0

  const interval = setInterval(() => {
    bar.style.width = progress + '%'
    progress++

    if (progress > value) clearInterval(interval)
  }, 10)
})
