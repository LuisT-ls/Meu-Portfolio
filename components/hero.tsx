'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] -z-10" />

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
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
            >
              Olá, eu sou <br />
              <span className="text-gradient">Luís Teixeira</span>
            </motion.h1>

            <motion.p
              variants={revealItem}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Desenvolvedor Web & Especialista em Tecnologia. Construindo experiências digitais modernas e escaláveis com foco em performance e design.
            </motion.p>

            <motion.div
              variants={revealItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#experiencia"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:shadow-xl hover:shadow-primary/25 transition-all"
              >
                Meu Trabalho
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
              {/* Blur behind image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
    </section>
  )
}

