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
