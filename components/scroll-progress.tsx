'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scaleX = useSpring(scrollProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      aria-hidden="true"
      role="presentation"
      className="fixed top-0 left-0 right-0 h-[3px] bg-brand z-[100] origin-left"
      style={{ scaleX }}
    />
  )
}
