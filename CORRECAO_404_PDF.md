# 🔧 Correção do Erro 404 do PDF do Currículo

## 🐛 Problema Identificado

O PageSpeed Insights reportou um erro 404 ao tentar carregar o arquivo PDF do currículo:

```
Failed to load resource: the server responded with a status of 404 (Not Found)
/Data/Currículo-Luís Teixeira.pdf?_rsc=1r34m:1:0
```

## 🔍 Causa do Problema

O Next.js estava tentando fazer **prefetch** do link usando o componente `Link`, o que adicionava parâmetros de roteamento (`_rsc`) ao URL do arquivo estático. Isso fazia com que o Next.js tentasse processar o PDF como uma rota do Next.js ao invés de um arquivo estático.

### Por que aconteceu?

- O componente `Link` do Next.js é otimizado para rotas internas
- Ele tenta fazer prefetch e adiciona parâmetros de roteamento
- Arquivos estáticos (PDFs, imagens, etc.) devem ser servidos diretamente
- O Next.js não consegue processar arquivos estáticos como rotas

## ✅ Solução Implementada

### 1. Substituição de `Link` por `<a>` para arquivos estáticos

**Antes:**
```tsx
<Link
  href="/Data/Currículo-Luís Teixeira.pdf"
  download
>
  Currículo
</Link>
```

**Depois:**
```tsx
<a
  href="/Data/Currículo-Luís Teixeira.pdf"
  download="Currículo-Luís-Teixeira.pdf"
  aria-label="Baixar currículo em PDF"
>
  Currículo
</a>
```

### 2. Headers específicos para PDFs

Adicionados headers no `next.config.mjs` para garantir que PDFs sejam servidos corretamente:

```javascript
{
  source: '/Data/:path*.pdf',
  headers: [
    {
      key: 'Content-Type',
      value: 'application/pdf',
    },
    {
      key: 'Content-Disposition',
      value: 'inline',
    },
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
}
```

## 📝 Arquivos Modificados

1. **`components/header.tsx`**
   - Substituído `Link` por `<a>` para o botão de currículo (desktop)
   - Substituído `Link` por `<a>` para o link de currículo (mobile)
   - Adicionado `aria-label` para acessibilidade
   - Adicionado nome de arquivo no atributo `download`

2. **`next.config.mjs`**
   - Adicionados headers específicos para arquivos PDF
   - Configurado Content-Type correto
   - Adicionado cache para melhor performance

## 🎯 Benefícios

- ✅ PDFs são servidos corretamente como arquivos estáticos
- ✅ Sem erros 404 no console
- ✅ Melhor performance (sem tentativa de roteamento)
- ✅ Cache otimizado para PDFs
- ✅ Melhor SEO (sem erros no PageSpeed)

## 🔍 Verificação

### Como testar:

1. **Localmente:**
   ```bash
   npm run build
   npm start
   # Acesse http://localhost:3000
   # Clique no botão "Currículo"
   # Verifique que o PDF abre corretamente
   ```

2. **No Console do Navegador:**
   - Abra DevTools > Console
   - Não deve haver erros 404 relacionados ao PDF
   - Verifique Network tab ao clicar no link

3. **PageSpeed Insights:**
   - Execute nova análise
   - O erro 404 não deve mais aparecer
   - Verifique que o PDF é carregado corretamente

## 📚 Boas Práticas

### Quando usar `<Link>` vs `<a>`

**Use `Link` do Next.js para:**
- ✅ Rotas internas do Next.js (`/sobre`, `/contato`)
- ✅ Navegação entre páginas
- ✅ Links que precisam de prefetch

**Use `<a>` normal para:**
- ✅ Arquivos estáticos (PDFs, imagens, etc.)
- ✅ Links externos
- ✅ Downloads de arquivos
- ✅ Links que não devem ter prefetch

### Exemplo Correto:

```tsx
// ✅ Correto - Rota interna
<Link href="/sobre">Sobre</Link>

// ✅ Correto - Arquivo estático
<a href="/Data/curriculo.pdf" download>Currículo</a>

// ✅ Correto - Link externo
<a href="https://example.com" target="_blank" rel="noopener">Exemplo</a>
```

## 🚀 Status

- ✅ Erro 404 corrigido
- ✅ Headers configurados
- ✅ Acessibilidade melhorada
- ✅ Build passando

**O problema foi resolvido com sucesso!**

---

**Data de correção**: 2024
**Status**: ✅ Resolvido
