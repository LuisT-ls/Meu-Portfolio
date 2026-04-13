'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFirebase } from '@/lib/firebase-provider'

export function Footer() {
  const { visitCount, isLoading } = useFirebase()

  return (
    <footer
      role="contentinfo"
      className="site-footer bg-surface-raised text-content py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="footer-section about">
            <Image
              src="/assets/img/Logo/header-logo.svg"
              alt="Logo do portfólio Luís Teixeira"
              width={60}
              height={60}
              sizes="60px"
              className="mb-4"
              loading="lazy"
              quality={90}
            />
            <p className="text-content-secondary">
              Desenvolvedor Web e estudante de Ciência, Tecnologia e Inovação na
              UFBA. Sempre em busca de aprendizado e inovação em tecnologia.
            </p>
          </div>
          <div className="footer-section links">
            <h2 className="text-xl font-semibold mb-4">Explore</h2>
            <ul className="space-y-3">
              {[
                { href: '#sobre', label: 'Sobre mim' },
                { href: '#projetos', label: 'Projetos' },
                { href: '#habilidades', label: 'Habilidades' },
                { href: '#contato', label: 'Contato' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-content-secondary hover:text-content transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/50 group-hover:bg-brand transition-colors"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section contact">
            <h2 className="text-xl font-semibold mb-4">Contato</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:luist_ls@outlook.pt"
                  className="text-content-secondary hover:text-content transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-envelope"></i>
                  luist_ls@outlook.pt
                </a>
              </li>
              <li>
                <a
                  href="tel:+557192193686"
                  className="text-content-secondary hover:text-content transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-phone"></i>
                  +55 71 99219-3686
                </a>
              </li>
              <li>
                <a
                  href="https://wa.link/u8h8e6"
                  target="_blank"
                  rel="noopener"
                  className="text-content-secondary hover:text-content transition-colors flex items-center gap-2"
                >
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section social">
            <h2 className="text-xl font-semibold mb-4">Siga-me</h2>
            <ul className="social-icons space-y-2">
              <li>
                <a
                  href="https://github.com/LuisT-ls"
                  target="_blank"
                  rel="noopener"
                  aria-label="Visitar meu perfil no GitHub"
                  className="text-content-secondary hover:text-content transition-colors flex items-center gap-2"
                >
                  <i className="fab fa-github"></i>
                  Github
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/luis-tei"
                  target="_blank"
                  rel="noopener"
                  aria-label="Visitar meu perfil no LinkedIn"
                  className="text-content-secondary hover:text-content transition-colors flex items-center gap-2"
                >
                  <i className="fab fa-linkedin"></i>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/luis.tei/"
                  target="_blank"
                  rel="noopener"
                  aria-label="Visitar meu perfil no Instagram"
                  className="text-content-secondary hover:text-content transition-colors flex items-center gap-2"
                >
                  <i className="fab fa-instagram"></i>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="total-visitas"
          className="visitas-counter text-center text-content-secondary mb-4"
          suppressHydrationWarning
        >
          {isLoading
            ? 'Carregando...'
            : `Total de visitas: ${visitCount?.toLocaleString() || '--'}`}
        </div>
        <div className="footer-bottom text-center pt-8 border-t border-line">
          <p className="text-content-secondary">
            &copy; <time dateTime="2026">2026</time> Luís Teixeira. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

