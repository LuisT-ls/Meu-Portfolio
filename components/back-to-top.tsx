'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={cn(
        'fixed bottom-4 right-4 z-50 rounded-full bg-brand p-3 text-content-on-brand shadow-lg transition-all duration-300 hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-8 sm:right-8 sm:p-4',
        isVisible
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible translate-y-4'
      )}
      aria-label="Voltar ao topo"
    >
      <i className="fas fa-arrow-up text-lg sm:text-xl" aria-hidden="true"></i>
    </button>
  )
}
