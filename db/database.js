import { sql } from '@vercel/postgres'

async function criarTabelaVisitas() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS visitas (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log('Tabela "visitas" criada (ou já existia).')
  } catch (err) {
    console.error('Erro ao criar tabela "visitas":', err)
    throw new Error('Erro na função criarTabelaVisitas: ' + err.message)
  }
}

async function registrarVisita() {
  try {
    await sql`INSERT INTO visitas DEFAULT VALUES`
  } catch (err) {
    console.error('Erro ao registrar visita:', err)
    throw new Error('Erro na função registrarVisita: ' + err.message)
  }
}

async function getTotalVisitas() {
  try {
    const { rows } = await sql`SELECT COUNT(*) AS total FROM visitas`
    return rows[0].total
  } catch (err) {
    console.error('Erro ao obter total de visitas:', err)
    throw new Error('Erro na função getTotalVisitas: ' + err.message)
  }
}

// (Opcional) Chamar criarTabelaVisitas() na inicialização:
criarTabelaVisitas()

export default { criarTabelaVisitas, registrarVisita, getTotalVisitas }
