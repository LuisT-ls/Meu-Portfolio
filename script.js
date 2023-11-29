;(() => {
  const menuBtn = document.querySelector('.menu-btn')
  const nav = document.querySelector('nav')

  const toggleMenu = () => {
    nav.classList.toggle('show')
  }

  menuBtn.addEventListener('click', toggleMenu)
})()
