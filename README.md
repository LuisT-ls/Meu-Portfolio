# Portfólio — Luís Teixeira

Portfólio pessoal desenvolvido com Next.js 16, TypeScript, Tailwind CSS, Framer Motion e Firebase. Inclui design responsivo, tema claro/escuro, animações fluidas, seção de projetos, detecção de seção ativa no nav e formulário de contato seguro.

🔗 **[luistls.vercel.app](https://luistls.vercel.app)**

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 3 |
| Animações | Framer Motion 12 |
| Backend/DB | Firebase 12 + Firebase Admin (Realtime DB + Firestore) |
| E-mail | Firebase Trigger Email + SMTP |
| Validação | Zod 4 |
| Notificações | Sonner |
| Deploy | Vercel |

---

## Funcionalidades

- **Tema claro/escuro** — persistido no localStorage, sem flash na inicialização
- **Seção de Projetos** — cards filtráveis com links para o GitHub
- **Nav com seção ativa** — IntersectionObserver detecta a seção visível e destaca o link correspondente com animação `layoutId`
- **Efeito typewriter no Hero** — rotação entre papéis com animação de digitação
- **Scroll progress bar** — barra animada no topo indicando progresso na página
- **Formulário de contato seguro** — validação com Zod, rate limiting e fila de e-mail no Firestore
- **Contador de visitas em tempo real** — Firebase Realtime Database
- **Code splitting** — seções abaixo da dobra carregadas com `next/dynamic`
- **SEO completo** — metadata, OpenGraph, Twitter Card, Schema.org (JSON-LD), sitemap, robots.txt
- **PWA** — manifest.json configurado
- **Acessibilidade** — roles ARIA, `sr-only`, `prefers-reduced-motion`
- **Segurança** — CSP, X-Frame-Options, X-Content-Type-Options e demais security headers via `next.config.mjs`

---

## Estrutura

```
├── app/
│   ├── layout.tsx              # Layout raiz com metadata, fonts, providers
│   ├── page.tsx                # Página inicial com code splitting
│   ├── globals.css             # Variáveis CSS, glass-panel, keyframes
│   ├── api/contact/route.ts    # API route do formulário de contato
│   ├── api/visit/route.ts      # Incremento server-side do contador
│   ├── privacy-policy/         # Página de política de privacidade
│   ├── robots.ts               # robots.txt dinâmico
│   └── sitemap.ts              # sitemap.xml dinâmico
│
├── components/
│   ├── header.tsx              # Nav com active section, pill indicator, mobile menu
│   ├── hero.tsx                # Typewriter, blobs animados, scroll indicator
│   ├── sobre.tsx               # Bio + destaques + stats
│   ├── projetos.tsx            # Cards de projetos com filtro por categoria
│   ├── experiencia.tsx         # Timeline de experiência
│   ├── certificacoes.tsx       # Cards de certificações
│   ├── habilidades.tsx         # Grid de skills com barra de proficiência
│   ├── contato.tsx             # Formulário com validação e rate limiting
│   ├── footer.tsx              # Links, contato, contador de visitas
│   ├── scroll-progress.tsx     # Barra de progresso no topo
│   ├── stats-counter.tsx       # Contadores animados (sobre)
│   ├── skeleton.tsx            # Skeletons de loading
│   ├── back-to-top.tsx         # Botão voltar ao topo
│   ├── theme-provider.tsx      # Contexto de tema
│   └── error-boundary.tsx      # Error boundary global
│
├── lib/
│   ├── firebase.ts             # Config Firebase
│   ├── firebase-admin.ts       # Acesso server-side ao Firebase Admin
│   ├── firebase-provider.tsx   # Contexto Firebase (visitas)
│   ├── firebase-mail.ts        # Fila de e-mails para o Trigger Email
│   ├── animations.ts           # Variants Framer Motion reutilizáveis
│   └── utils.ts                # cn() e helpers
│
├── hooks/
│   ├── use-in-view.ts          # IntersectionObserver hook
│   └── use-rate-limit.ts       # Hook de rate limiting para o formulário
│
└── public/
    ├── assets/img/             # Imagens e ícones SVG (devicons)
    ├── Data/                   # PDFs (currículo, certificados)
    └── manifest.json           # PWA manifest
```

---

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente (ver seção abaixo)

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz com:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin — somente servidor
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
FIREBASE_DATABASE_URL=

# E-mail via Firebase Trigger Email
CONTACT_EMAIL_TO=luist_ls@outlook.pt
FIREBASE_MAIL_COLLECTION=mail
```

---

## Scripts

```bash
npm run dev        # Servidor de desenvolvimento (Turbopack)
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run lint       # ESLint
npm run test       # Testes unitários (Vitest)
npm run coverage   # Cobertura de testes
npm run analyze    # Bundle analyzer (ANALYZE=true)
```

### Regras do Realtime Database

O navegador pode ler `visitCount`, mas não pode escrever diretamente. O incremento é feito pela rota server-side `/api/visit` usando o Firebase Admin SDK.

Para aplicar as regras no projeto Firebase:

```bash
npx firebase-tools deploy --only database --project portfolio-contador
```

As variáveis `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY` devem ser cadastradas somente na Vercel, com escopo de produção/preview conforme necessário.

### Envio de e-mails pelo Firebase

O formulário grava documentos na coleção `mail` do Cloud Firestore. A extensão
oficial **Trigger Email** observa essa coleção e envia as mensagens usando um
servidor SMTP configurado na extensão. O Firebase não fornece um servidor SMTP
próprio, então é necessário informar um provedor de envio durante a instalação.

Instalação pelo CLI:

```bash
npx firebase-tools ext:install firebase/firestore-send-email --project portfolio-contador
npx firebase-tools deploy --only firestore:rules --project portfolio-contador
```

Durante a instalação, use `mail` como coleção de documentos, configure o
endereço padrão de remetente e informe as credenciais SMTP do provedor escolhido.
O servidor da aplicação grava na coleção usando o Firebase Admin SDK; clientes
não têm permissão para ler ou escrever nessa fila.

---

## Licença

MIT © [Luís Teixeira](https://luistls.vercel.app)
