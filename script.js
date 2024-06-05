// Inicialize o EmailJS com seu user ID
emailjs.init('1PLc3xymOa3PrKHEX')

// Menu Hambúrguer
const menuBtn = document.getElementById('menu-btn')
const navbar = document.getElementById('navbar')

menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active')
  menuBtn.classList.toggle('open')
})

// Rolagem Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)

    const offsetTop =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      document.querySelector('header').offsetHeight

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  })
})

// Rolagem suave para o link "Voltar ao topo"
document.querySelector('a[href="#"]').addEventListener('click', function (e) {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// Modo Escuro/Claro com armazenamento em localStorage
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

// Carregamento Dinâmico de Conteúdo (Projetos)
fetch('/api/projetos') // Adiciona /api/ ao caminho
  .then(response => response.json())
  .then(projetos => {
    const projetosGrid = document.getElementById('projetos-grid')
    projetos.forEach(projeto => {
      const projetoDiv = document.createElement('div')
      projetoDiv.classList.add('projeto')
      projetoDiv.innerHTML = `
        <h3>${projeto.nome}</h3>
        <p>${projeto.descricao}</p>
        <a href="${projeto.link}" target="_blank">Ver Projeto</a>
      `
      projetosGrid.appendChild(projetoDiv)
    })
  })

// Carregamento Dinâmico de Conteúdo (Blog)
fetch('/api/posts') // Adiciona /api/ ao caminho
  .then(response => response.json())
  .then(artigos => {
    const blogGrid = document.getElementById('blog-grid')
    artigos.forEach(artigo => {
      const artigoDiv = document.createElement('div')
      artigoDiv.classList.add('artigo')
      artigoDiv.innerHTML = `
        <h3>${artigo.titulo}</h3>
        <p>${artigo.extrato}</p>
        <a href="${artigo.link}" target="_blank">Leia Mais</a>
      `
      blogGrid.appendChild(artigoDiv)
    })
  })

// Formulário de Contato (com validação básica e envio via EmailJS)
const form = document.getElementById('contato-form')
form.addEventListener('submit', event => {
  event.preventDefault()

  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const mensagem = document.getElementById('mensagem').value

  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha todos os campos.')
    return
  }

  if (!validateEmail(email)) {
    alert('Por favor, insira um e-mail válido.')
    return
  }

  // Parâmetros para o EmailJS
  const templateParams = {
    from_name: nome,
    from_email: email,
    message: mensagem
  }

  emailjs.send('service_luist-ls', 'template_8vzhxeg', templateParams).then(
    response => {
      console.log('SUCCESS!', response.status, response.text)
      alert('Mensagem enviada com sucesso!')
      form.reset()
    },
    error => {
      console.log('FAILED...', error)
      alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.')
    }
  )
})

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(String(email).toLowerCase())
}

// Aplicando animações quando as seções entram na viewport
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section')

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    {
      threshold: 0.1
    }
  )

  sections.forEach(section => {
    observer.observe(section)
  })

  // Registrar visita ao carregar a página
  fetch('/api/registrar-visita')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao registrar visita')
      }
    })
    .catch(error => {
      console.error(error)
    })

  // Obter e exibir o total de visitas (uma única vez)
  fetch('/api/total-visitas') // Movido para dentro do DOMContentLoaded
    .then(response => response.json())
    .then(data => {
      const totalVisitasElement = document.getElementById('total-visitas')
      totalVisitasElement.textContent = data.total
    })
})

// server.js
app.get('/api/total-visitas', (req, res) => {
  db.get('SELECT COUNT(*) AS total FROM visitas', (err, row) => {
    if (err) {
      console.error('Erro ao obter total de visitas:', err)
      res.status(500).send('Erro interno do servidor')
    } else {
      res.json({ total: row.total })
    }
  })
})
