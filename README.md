# Meu Portfólio - Next.js

Portfólio pessoal desenvolvido com Next.js 14, TypeScript, Tailwind CSS, Firebase e EmailJS.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Firebase** - Analytics e Realtime Database (contador de visitas)
- **EmailJS** - Envio de emails via formulário de contato

## 📦 Instalação

1. Instale as dependências:

```bash
npm install
```

2. Certifique-se de que os assets estão na pasta `public/`:
   - `public/assets/img/` - Imagens e ícones
   - `public/Data/` - PDFs (certificados, currículo)

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🏗️ Estrutura do Projeto

```
├── app/                  # App Router do Next.js
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página inicial
│   └── globals.css      # Estilos globais
├── components/          # Componentes React
│   ├── header.tsx
│   ├── hero.tsx
│   ├── sobre.tsx
│   ├── experiencia.tsx
│   ├── certificacoes.tsx
│   ├── habilidades.tsx
│   ├── contato.tsx
│   ├── footer.tsx
│   ├── back-to-top.tsx
│   └── theme-provider.tsx
├── lib/                 # Utilitários e configurações
│   ├── firebase.ts      # Configuração Firebase
│   ├── firebase-provider.tsx
│   ├── emailjs.ts       # Configuração EmailJS
│   └── utils.ts         # Funções utilitárias
├── hooks/               # Hooks customizados
│   └── use-in-view.ts
└── public/              # Arquivos estáticos
    ├── assets/
    └── Data/
```

## 🔧 Configuração

### Firebase

As configurações do Firebase estão em `lib/firebase.ts`. Certifique-se de que as credenciais estão corretas.

### EmailJS

As configurações do EmailJS estão em `lib/emailjs.ts`:
- Service ID: `service_luist-ls`
- Template ID: `template_8vzhxeg`
- User ID: `1PLc3xymOa3PrKHEX`

## 📝 Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🎨 Features

- ✅ Design responsivo e moderno
- ✅ Tema claro/escuro
- ✅ Animações suaves
- ✅ Formulário de contato funcional
- ✅ Contador de visitas em tempo real
- ✅ SEO otimizado
- ✅ Performance otimizada

## 📄 Licença

Este projeto está sob a licença MIT.
