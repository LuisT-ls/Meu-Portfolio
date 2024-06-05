const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

function criarTabelaVisitas() {
  db.run(`
    CREATE TABLE IF NOT EXISTS visitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

criarTabelaVisitas()

function registrarVisita() {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO visitas DEFAULT VALUES', err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function getTotalVisitas() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) AS total FROM visitas', (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row.total)
      }
    })
  })
}

module.exports = { registrarVisita, getTotalVisitas }
