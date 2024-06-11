import fs from 'fs-extra';

try {
  fs.emptyDirSync('build');
  fs.copySync('src', 'build');
  console.log('Build concluído com sucesso!');
} catch (err) {
  console.error('Erro ao executar o build:', err);
  process.exit(1); 
}
