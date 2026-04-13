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
        'fixed bottom-8 right-8 z-50 p-4 bg-brand text-content-on-brand rounded-full shadow-lg hover:bg-brand-hover transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        isVisible
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible translate-y-4'
      )}
      aria-label="Voltar ao topo"
    >
      <i className="fas fa-arrow-up text-xl" aria-hidden="true"></i>
    </button>
  )
}

