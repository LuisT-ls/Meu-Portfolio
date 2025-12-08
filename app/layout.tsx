import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { FirebaseProvider } from '@/lib/firebase-provider'
import { ErrorBoundary } from '@/components/error-boundary'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Luís Teixeira | Desenvolvedor Web & Especialista em Tecnologia',
  description: 'Portfólio de Luís Teixeira | Desenvolvedor Web, admirador da tecnologia. Experiência em redes, Linux e soluções digitais. Estudante de CTI na UFBA.',
  keywords: ['Luís Teixeira', 'desenvolvedor web', 'frontend', 'backend', 'Linux', 'redes', 'projetos tecnológicos', 'UFBA', 'JavaScript', 'Node.js', 'full stack'],
  authors: [{ name: 'Luís Teixeira' }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://luistls.vercel.app/',
    title: 'Luís Teixeira | Desenvolvedor & Especialista em Tecnologia',
    description: 'Conheça os projetos e habilidades de Luís Teixeira, desenvolvedor web e estudante de Ciência, Tecnologia e Inovação na UFBA. Especializado em criar soluções inovadoras em web, Linux e redes.',
    images: [
      {
        url: 'https://luistls.vercel.app/assets/img/Logo/header-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Logo Luís Teixeira',
      },
    ],
    locale: 'pt_BR',
    siteName: 'Portfólio Luís Teixeira',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@luistls_',
    creator: '@luistls_',
    title: 'Luís Teixeira | Desenvolvedor & Especialista em Tecnologia',
    description: 'Conheça os projetos e habilidades de Luís Teixeira, desenvolvedor web e estudante de Ciência, Tecnologia e Inovação na UFBA. Especializado em criar soluções inovadoras em web, Linux e redes.',
    images: ['https://luistls.vercel.app/assets/img/Logo/header-logo.svg'],
  },
  alternates: {
    canonical: 'https://luistls.vercel.app/',
    languages: {
      'pt-BR': 'https://luistls.vercel.app/',
      'en': 'https://luistls.vercel.app/en/',
    },
  },
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preconnect para recursos externos - melhora performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://*.firebaseio.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.emailjs.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para domínios adicionais */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Favicons */}
        <link rel="icon" href="/assets/img/Logo/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/assets/img/Logo/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/img/Logo/apple-touch-icon.svg" />
        <link rel="mask-icon" href="/assets/img/Logo/safari-pinned-tab.svg" color="#2563eb" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Font Awesome - com preload para melhor performance */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Structured Data (Schema.org) para melhor SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Luís Teixeira',
              jobTitle: 'Desenvolvedor Web',
              description: 'Desenvolvedor Web e estudante de Ciência, Tecnologia e Inovação na UFBA. Especializado em criar soluções inovadoras em web, Linux e redes.',
              url: 'https://luistls.vercel.app',
              image: 'https://luistls.vercel.app/assets/img/Logo/header-logo.svg',
              sameAs: [
                'https://github.com/LuisT-ls',
                'https://www.linkedin.com/in/luis-tei',
              ],
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Universidade Federal da Bahia (UFBA)',
                department: 'Ciência, Tecnologia e Inovação',
              },
              knowsAbout: [
                'Desenvolvimento Web',
                'Frontend',
                'Backend',
                'Linux',
                'Redes de Computadores',
                'JavaScript',
                'TypeScript',
                'React',
                'Next.js',
                'Node.js',
              ],
              email: 'luisps4.lt@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BR',
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storageKey = 'preferred-theme';
                  const savedTheme = localStorage.getItem(storageKey);
                  const root = document.documentElement;
                  
                  if (savedTheme === 'dark') {
                    root.classList.add('dark');
                  } else if (savedTheme === 'light') {
                    root.classList.remove('dark');
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                      root.classList.add('dark');
                    } else {
                      root.classList.remove('dark');
                    }
                  }
                } catch (e) {
                  // Silenciar erro em caso de falha
                }
              })();
            `,
          }}
          suppressHydrationWarning
        />
      </head>
      <body className={inter.variable} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider>
            <FirebaseProvider>
              {children}
            </FirebaseProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

