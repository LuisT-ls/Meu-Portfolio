import { sql } from '@vercel/postgres'

async function criarTabelaVisitas() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS visitas (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('Tabela "visitas" criada com sucesso!')
  } catch (err) {
    console.error('Erro ao criar tabela "visitas":', err)
  }
}

async function registrarVisita() {
  try {
    await sql`INSERT INTO visitas DEFAULT VALUES`
  } catch (err) {
    throw new Error('Erro ao registrar visita: ' + err.message)
  }
}

async function getTotalVisitas() {
  try {
    const { rows } = await sql`SELECT COUNT(*) AS total FROM visitas`
    return rows[0].total
  } catch (err) {
    throw new Error('Erro ao obter total de visitas: ' + err.message)
  }
}

module.exports = { criarTabelaVisitas, registrarVisita, getTotalVisitas }
