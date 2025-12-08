'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      closeMenu()
    }
  }

  const navLinks = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#experiencia', label: 'Experiência' },
    { href: '#certificacoes', label: 'Certificações' },
    { href: '#habilidades', label: 'Habilidades' },
    { href: '#contato', label: 'Contato' },
  ]

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white dark:bg-gray-900',
        isScrolled && 'backdrop-blur-md shadow-sm bg-white/95 dark:bg-gray-900/95'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="Início"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md">
              LT
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            role="navigation"
            aria-label="Menu principal"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            <ul className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium text-sm lg:text-base"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Currículo Button */}
            <Link
              href="/Data/Currículo-Luís Teixeira.pdf"
              download
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-md"
              onClick={handleLinkClick}
            >
              <i className="fas fa-download"></i>
              <span>Currículo</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Alternar tema"
            >
              <i className={cn(
                'text-lg',
                theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
              )}></i>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="menu-btn"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isMenuOpen}
              aria-controls="main-nav"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <span className="sr-only">{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    'block h-0.5 w-full bg-current transition-all duration-300',
                    isMenuOpen && 'rotate-45 translate-y-2'
                  )}
                ></span>
                <span
                  className={cn(
                    'block h-0.5 w-full bg-current transition-all duration-300',
                    isMenuOpen && 'opacity-0'
                  )}
                ></span>
                <span
                  className={cn(
                    'block h-0.5 w-full bg-current transition-all duration-300',
                    isMenuOpen && '-rotate-45 -translate-y-2'
                  )}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          id="main-nav"
          role="navigation"
          aria-label="Menu principal mobile"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <ul className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium py-2"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/Data/Currículo-Luís Teixeira.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                onClick={handleLinkClick}
              >
                <i className="fas fa-download"></i>
                <span>Currículo</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

