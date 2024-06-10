import express from 'express'
import { sql } from '@vercel/postgres'
import fs from 'fs'
import sqlite3 from 'sqlite3'
import db from './db/database'

const app = express()
const port = 3000

// Ler os dados dos projetos
let projetos = []
try {
  projetos = JSON.parse(fs.readFileSync('./Data/projetos.json', 'utf8'))
} catch (err) {
  console.error('Erro ao ler o arquivo projetos.json:', err)
}

// Ler os dados dos posts do blog
let posts = []
try {
  posts = JSON.parse(fs.readFileSync('./Data/blog.json', 'utf8'))
} catch (err) {
  console.error('Erro ao ler o arquivo blog.json:', err)
}

// Servir arquivos estáticos
app.use(express.static(__dirname))

// Rotas da API
app.get('/api/projetos', (req, res) => {
  res.json(projetos)
})

app.get('/api/posts', (req, res) => {
  res.json(posts)
})

app.get('/api/registrar-visita', (req, res) => {
  db.registrarVisita()
    .then(() => res.send('Visita registrada com sucesso!'))
    .catch(err => {
      console.error('Erro ao registrar visita:', err)
      res.status(500).send('Erro interno do servidor')
    })
})

app.get('/api/total-visitas', (req, res) => {
  db.getTotalVisitas()
    .then(total => res.json({ total }))
    .catch(err => {
      console.error('Erro ao obter total de visitas:', err)
      res.status(500).send('Erro interno do servidor')
    })
})

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Erro interno do servidor')
})
