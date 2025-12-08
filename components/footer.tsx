'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFirebase } from '@/lib/firebase-provider'

export function Footer() {
  const { visitCount, isLoading } = useFirebase()

  return (
    <footer
      role="contentinfo"
      className="site-footer bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
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
            <p className="text-gray-400">
              Desenvolvedor Web e estudante de Ciência, Tecnologia e Inovação na
              UFBA. Sempre em busca de aprendizado e inovação em tecnologia.
            </p>
          </div>
          <div className="footer-section links">
            <h2 className="text-xl font-semibold mb-4">Explore</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#sobre"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#habilidades"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Habilidades
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Voltar ao topo
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2 className="text-xl font-semibold mb-4">Contato</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:luisps4.lt@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-envelope"></i>
                  luisps4.lt@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+5571993322305"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-phone"></i>
                  +55 (71) 99332-2305
                </a>
              </li>
              <li>
                <a
                  href="https://wa.link/u8h8e6"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
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
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
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
          className="visitas-counter text-center text-gray-400 mb-4"
        >
          {isLoading
            ? 'Carregando...'
            : `Total de visitas: ${visitCount?.toLocaleString() || '--'}`}
        </div>
        <div className="footer-bottom text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400">
            &copy; <time dateTime="2025">2025</time> Luís Teixeira. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

