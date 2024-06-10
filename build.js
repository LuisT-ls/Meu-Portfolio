const fs = require('fs-extra')

try {
  fs.emptyDirSync('build') // Limpa a pasta build se ela existir
  fs.copySync('src', 'build')
  console.log('Build concluído com sucesso!')
} catch (err) {
  console.error('Erro ao executar o build:', err)
  process.exit(1) // Força o script a sair com código de erro 1
}
