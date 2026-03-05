'use client'

import { motion } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'
import { StatsCounter } from './stats-counter'

export function Sobre() {
  return (
    <section
      id="sobre"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Sobre Mim</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          <motion.div variants={revealItem} className="space-y-8">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Sou um estudante dedicado do curso de graduação Interdisciplinar
                em Ciência, Tecnologia e Inovação na Universidade Federal da
                Bahia, apaixonado por tecnologia e inovação. Com mais de 4 anos
                de experiência em suporte técnico e desenvolvimento de sistemas,
                busco constantemente aprender e aplicar novos conhecimentos em
                projetos desafiadores.
              </p>
              <p>
                Minha jornada na tecnologia começou com suporte técnico e no
                momento se encontra em desenvolvimento web. Tenho experiência em
                tecnologias como JavaScript, React, e sistemas Linux, além de
                conhecimentos em redes e segurança da informação.
              </p>
              <p>
                Atualmente, foco meus estudos em desenvolvimento web moderno,
                arquitetura de software e DevOps, além de aprofundar meus
                conhecimentos em inteligência artificial, incluindo engenharia
                de prompt, machine learning e aplicações práticas de IA.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <i className="fas fa-rocket text-primary"></i>
                Destaques
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: 'fa-graduation-cap', text: 'Graduando em CTI na UFBA' },
                  { icon: 'fa-laptop-code', text: 'Desenvolvedor Web' },
                  { icon: 'fa-tools', text: 'Analista em Suporte' },
                  { icon: 'fa-chart-line', text: 'Média Acadêmica 8.2' },
                  { icon: 'fa-book', text: 'Aprendizado Contínuo' },
                  { icon: 'fa-microchip', text: 'Estusiasta de IA' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <i className={`fas ${item.icon} text-primary`}></i>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div variants={revealItem} className="lg:sticky lg:top-32">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
              <StatsCounter />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

