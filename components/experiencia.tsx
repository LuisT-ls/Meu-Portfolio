'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, revealItem } from '@/lib/animations'
import { SectionHeading } from '@/components/ui/section-heading'

const experiencias = [
  {
    titulo: 'Estagiário de Suporte Técnico',
    empresa: 'Instituto Recôncavo de Tecnologia',
    periodo: 'Nov/2021 – Nov/2023',
    icon: 'fas fa-server',
    responsabilidades: [
      'Implementação e manutenção de infraestrutura de rede',
      'Suporte técnico N1 e N2 para mais de 50 usuários',
      'Administração de sistemas Windows Server e Linux',
      'Desenvolvimento de scripts de automação (PowerShell e Bash)',
      'Gestão de backups e recuperação de dados',
      'Documentação técnica e procedimentos operacionais',
    ],
    conquistas: [
      'Redução de 40% no tempo de resolução de chamados',
      'Implementação de sistema de monitoramento proativo',
      'Desenvolvimento de documentação técnica padronizada',
    ],
  },
  {
    titulo: 'Instalador de Redes e CFTV IP',
    empresa: 'Luís Antonio Souza Teixeira (CNPJ)',
    periodo: 'Out/2019 – Mar/2020',
    icon: 'fas fa-network-wired',
    responsabilidades: [
      'Projeto e implementação de sistemas CFTV IP',
      'Configuração avançada de redes para vigilância',
      'Instalação de infraestrutura de rede estruturada',
      'Manutenção preventiva e corretiva de equipamentos',
      'Treinamento de usuários em sistemas de segurança',
    ],
    conquistas: [
      'Implementação de mais de 50 sistemas de CFTV',
      'Desenvolvimento de soluções personalizadas',
      'Taxa de satisfação do cliente de 95%',
    ],
  },
  {
    titulo: 'Técnico em Instalações',
    empresa: 'ELITE SERVIÇOS',
    periodo: '2020 – 2021',
    icon: 'fas fa-tools',
    responsabilidades: [
      'Instalações elétricas residenciais e comerciais',
      'Implementação de sistemas de segurança',
      'Configuração de redes e telefonia',
      'Manutenção preventiva e corretiva',
    ],
    conquistas: [
      'Mais de 100 instalações bem-sucedidas',
      'Zero acidentes de trabalho',
      'Implementação de checklist de segurança',
    ],
  },
]

export function Experiencia() {
  const [active, setActive] = useState(0)
  const exp = experiencias[active]!


  return (
    <section
      id="experiencia"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="container mx-auto">
        <SectionHeading title="Experiência Profissional" />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-0">

          {/* ── Tab list ── */}
          {/* Mobile: horizontal scroll; Desktop: vertical list */}
          <div
            role="tablist"
            aria-label="Experiências profissionais"
            className="flex md:flex-col overflow-x-auto md:overflow-x-visible shrink-0 md:w-56 border-b md:border-b-0 md:border-r border-line"
          >
            {experiencias.map((e, i) => {
              const isActive = active === i
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="exp-panel"
                  onClick={() => setActive(i)}
                  className={[
                    'relative text-left px-5 py-4 transition-all duration-200 whitespace-nowrap md:whitespace-normal',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset',
                    isActive
                      ? 'text-brand bg-brand/5'
                      : 'text-content-secondary hover:text-content hover:bg-surface',
                  ].join(' ')}
                >
                  {/* Active indicator — bottom on mobile, left on desktop */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 md:bottom-auto md:top-0 h-0.5 md:h-full w-full md:w-0.5 bg-brand rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className="relative block text-sm font-semibold leading-snug">
                    {e.empresa.split(' ')[0]}
                  </span>
                  <span className="relative block text-xs text-content-muted mt-0.5 hidden md:block">
                    {e.periodo}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Tab panel ── */}
          <div
            id="exp-panel"
            role="tabpanel"
            className="flex-1 min-h-[420px] md:pl-10 pt-8 md:pt-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand/10 text-brand rounded-full">
                      {exp.periodo}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                    {exp.titulo}
                  </h3>
                  <p className="text-brand font-semibold text-lg">
                    {exp.empresa}
                  </p>
                </div>

                {/* Responsabilidades */}
                <motion.ul
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-3 mb-8"
                >
                  {exp.responsabilidades.map((resp, i) => (
                    <motion.li
                      key={i}
                      variants={revealItem}
                      className="flex gap-3 text-content-secondary text-sm leading-relaxed"
                    >
                      <i className="fas fa-caret-right text-brand mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{resp}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Destaques */}
                <div className="pt-6 border-t border-line">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-content-muted mb-3">
                    Destaques
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.conquistas.map((conq, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 bg-brand/5 text-brand border border-brand/20 rounded-full font-medium"
                      >
                        {conq}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
