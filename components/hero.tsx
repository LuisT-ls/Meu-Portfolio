'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'

const roles = [
  'Dev Full-Stack',
  'Especialista em IA',
  'Entusiasta de Linux',
  'Especialista em Redes',
]

function TypewriterText() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[index] ?? ''
    const speed = isDeleting ? 50 : 90
    const pauseAfterWord = 1800
    const pauseBeforeDelete = 200

    if (!isDeleting && displayed === current) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAfterWord)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayed === '') {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % roles.length)
      }, pauseBeforeDelete)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, index])

  return (
    <span className="text-gradient">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-20 w-72 h-72 bg-primary rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[150px] -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500 rounded-full blur-[140px] -z-10"
      />

      <div className="container mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="text-center lg:text-left">
            <motion.span
              variants={revealItem}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
            >
              Disponível para novos desafios
            </motion.span>

            <motion.h1
              variants={revealItem}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1]"
            >
              Olá, eu sou <br />
              <span className="text-gradient">Luís Teixeira</span>
            </motion.h1>

            <motion.div
              variants={revealItem}
              className="text-2xl sm:text-3xl font-bold mb-6 h-10"
            >
              <TypewriterText />
            </motion.div>

            <motion.p
              variants={revealItem}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Construindo experiências digitais modernas e escaláveis com foco em performance e design.
            </motion.p>

            <motion.div
              variants={revealItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#projetos"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:shadow-xl hover:shadow-primary/25 transition-all"
              >
                Ver Projetos
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
              <Link
                href="#contato"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-foreground rounded-full font-bold hover:bg-secondary/80 transition-all border border-border"
              >
                Entre em Contato
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={revealItem}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative bg-background p-4 rounded-2xl shadow-2xl glass-panel"
              >
                <Image
                  src="/assets/img/web_development_maintenance_construction_teamwork_icon_192840.webp"
                  alt="Luís Teixeira - Desenvolvedor Web"
                  width={500}
                  height={500}
                  priority
                  className="rounded-xl w-full h-auto object-cover max-w-sm"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
