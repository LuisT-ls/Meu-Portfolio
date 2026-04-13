'use client'

import { useState, useEffect } from 'react'

interface UseActiveSectionOptions {
  rootMargin?: string
}

/**
 * Detecta qual seção está visível no viewport usando IntersectionObserver.
 * Extraído do Header para ser reutilizável em qualquer navegação.
 */
export function useActiveSection(
  sectionIds: string[],
  { rootMargin = '-40% 0px -55% 0px' }: UseActiveSectionOptions = {}
): string {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setActiveSection(id)
        },
        { rootMargin }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds, rootMargin])

  return activeSection
}
