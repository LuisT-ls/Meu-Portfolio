'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#sobre', label: 'Sobre', icon: 'fa-user' },
  { href: '#projetos', label: 'Projetos', icon: 'fa-folder-open' },
  { href: '#experiencia', label: 'Experiência', icon: 'fa-briefcase' },
  { href: '#certificacoes', label: 'Certificações', icon: 'fa-certificate' },
  { href: '#habilidades', label: 'Habilidades', icon: 'fa-code' },
  { href: '#contato', label: 'Contato', icon: 'fa-paper-plane' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) closeMenu()
  }

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'py-2' : 'py-4'
      )}
    >
      {/* Backdrop blur bar */}
      <motion.div
        initial={false}
        animate={{
          opacity: isScrolled ? 1 : 0,
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white/80 dark:bg-gray-950/80 border-b border-white/10 dark:border-white/5 shadow-sm -z-10"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Início"
            className="relative text-2xl font-display font-bold tracking-tighter text-primary group"
          >
            LT.
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
          </Link>

          {/* Desktop nav — pill */}
          <nav
            role="navigation"
            aria-label="Menu principal"
            className="hidden md:flex items-center"
          >
            <ul
              className={cn(
                'flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-300',
                isScrolled
                  ? 'bg-gray-100/80 dark:bg-gray-800/80'
                  : 'bg-transparent'
              )}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                const isHovered = hoveredLink === link.href

                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      onMouseEnter={() => setHoveredLink(link.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={cn(
                        'relative z-10 flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200',
                        isActive
                          ? 'text-primary'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      )}
                    >
                      {/* Hover/Active background indicator */}
                      {(isHovered || isActive) && (
                        <motion.span
                          layoutId="nav-pill"
                          className={cn(
                            'absolute inset-0 rounded-full',
                            isActive
                              ? 'bg-primary/10 dark:bg-primary/15'
                              : 'bg-gray-200/70 dark:bg-gray-700/70'
                          )}
                          transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                      {/* Active dot */}
                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="relative ml-1.5 w-1 h-1 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Currículo */}
            <a
              href="/Data/Currículo-Luís Teixeira.pdf"
              download="Currículo-Luís-Teixeira.pdf"
              aria-label="Baixar currículo em PDF"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
            >
              <i className="fas fa-download text-xs"></i>
              Currículo
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/LuisT-ls"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil no GitHub"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <i className="fab fa-github text-lg"></i>
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="w-9 h-9 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.i
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn('text-base', theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon')}
                />
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className={cn('block h-0.5 w-5 bg-current transition-all duration-300 origin-center', isMenuOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block h-0.5 w-5 bg-current transition-all duration-300', isMenuOpen && 'opacity-0 scale-x-0')} />
              <span className={cn('block h-0.5 w-5 bg-current transition-all duration-300 origin-center', isMenuOpen && '-rotate-45 -translate-y-2')} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            role="navigation"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 rounded-2xl border border-white/10 dark:border-white/5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <ul className="flex flex-col p-3 gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      )}
                    >
                      <span className={cn(
                        'w-7 h-7 flex items-center justify-center rounded-lg text-xs',
                        isActive ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      )}>
                        <i className={`fas ${link.icon}`}></i>
                      </span>
                      {link.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
            <div className="p-3 pt-0">
              <a
                href="/Data/Currículo-Luís Teixeira.pdf"
                download="Currículo-Luís-Teixeira.pdf"
                onClick={handleLinkClick}
                aria-label="Baixar currículo em PDF"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                <i className="fas fa-download text-xs"></i>
                Baixar Currículo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
