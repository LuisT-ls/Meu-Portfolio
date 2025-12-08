# Variáveis de Ambiente

Este documento descreve as variáveis de ambiente necessárias para o projeto.

## 📋 Variáveis Necessárias

### EmailJS Configuration

```env

```

**Como obter:**
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Faça login na sua conta
3. Vá em Settings > API Keys para obter o User ID
4. Vá em Email Services para obter o Service ID
5. Vá em Email Templates para obter o Template ID

### Firebase Configuration

```env

```

**Como obter:**
1. Acesse [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá em Project Settings (ícone de engrenagem)
4. Role até "Your apps" e selecione a configuração da web
5. Copie as credenciais do objeto `firebaseConfig`

## 🚀 Configuração

### Desenvolvimento Local

1. **Crie um arquivo `.env.local` na raiz do projeto** (na mesma pasta onde está o `package.json`):

**Opção 1 - Copiar do exemplo:**
```bash
# Copie o arquivo de exemplo
cp env.example .env.local
# Edite o arquivo .env.local com suas credenciais
```

**Opção 2 - Criar manualmente:**
```bash
# Na raiz do projeto, crie o arquivo .env.local
touch .env.local
# ou
nano .env.local
# ou use seu editor preferido
```

2. **Adicione as variáveis no arquivo `.env.local`** (sem espaços ao redor do `=`):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_luist-ls
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_8vzhxeg
NEXT_PUBLIC_EMAILJS_USER_ID=1PLc3xymOa3PrKHEX

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCCnYZhLovinEZrDLHHIfmO-nM7tGrcq4c
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=portfolio-contador.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://portfolio-contador-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=portfolio-contador
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=portfolio-contador.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=130162787302
NEXT_PUBLIC_FIREBASE_APP_ID=1:130162787302:web:6c38db876d8fa3f59e4c27
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-QS405DVJED
```

**⚠️ Importante**: 
- O arquivo **DEVE** se chamar `.env.local` (com o ponto no início)
- O arquivo já está no `.gitignore`, então não será commitado
- Após criar/editar, **reinicie o servidor de desenvolvimento** (`npm run dev`)

```env

# ... etc
```

### Produção (Vercel)

1. Acesse o dashboard da Vercel
2. Vá em Settings > Environment Variables
3. Adicione cada variável listada acima
4. Certifique-se de que estão marcadas para "Production", "Preview" e "Development"

## 📝 Tipos de Arquivos de Ambiente no Next.js

O Next.js suporta diferentes arquivos de ambiente com diferentes prioridades:

1. **`.env.local`** - **Use este para desenvolvimento local**
   - Sempre carregado (exceto em `test`)
   - **Já está no `.gitignore`** - não será commitado
   - **Prioridade mais alta** - sobrescreve outros arquivos

2. **`.env.development`** - Apenas em desenvolvimento (`npm run dev`)
3. **`.env.production`** - Apenas em produção (`npm run build`)
4. **`.env`** - Para todos os ambientes (não recomendado para credenciais)

**Ordem de prioridade** (maior para menor):
```
.env.local > .env.development/.env.production > .env
```

## ⚠️ Importante

- **NUNCA** commite o arquivo `.env.local` no Git (já está no `.gitignore`)
- Use apenas variáveis que começam com `NEXT_PUBLIC_` para valores que precisam estar disponíveis no client-side
- Variáveis sem `NEXT_PUBLIC_` são apenas para server-side e não são expostas ao cliente
- Mantenha suas credenciais seguras e não as compartilhe publicamente
- **Reinicie o servidor** após criar/editar o arquivo `.env.local`

## 🔒 Segurança

- As credenciais do Firebase são públicas por design (usadas no client-side)
- As credenciais do EmailJS também são públicas (usadas no client-side)
- Para maior segurança, considere criar uma API Route no Next.js para processar o envio de emails no servidor
