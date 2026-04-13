'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, revealItem } from '@/lib/animations'
import { SectionHeading } from '@/components/ui/section-heading'

interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  title: string
  shortTitle: string
  icon: string
  skills: Skill[]
}

const categorias: SkillCategory[] = [
  {
    title: 'Desenvolvimento Web',
    shortTitle: 'Web',
    icon: 'fas fa-code',
    skills: [
      { name: 'HTML5',        icon: '/assets/img/icon/html5-svgrepo-com.svg'      },
      { name: 'CSS3',         icon: '/assets/img/icon/css-3-svgrepo-com.svg'       },
      { name: 'JavaScript',   icon: '/assets/img/icon/javascript-svgrepo-com.svg'  },
      { name: 'TypeScript',   icon: '/assets/img/icon/typescript-svgrepo-com.svg'  },
      { name: 'React',        icon: '/assets/img/icon/react-svgrepo-com.svg'        },
      { name: 'Next.js',      icon: '/assets/img/icon/next-js-svgrepo-com.svg'      },
      { name: 'Astro',        icon: '/assets/img/icon/astro-svgrepo-com.svg'        },
      { name: 'Tailwind CSS', icon: '/assets/img/icon/tailwindcss-svgrepo-com.svg' },
    ],
  },
  {
    title: 'Backend & Mobile',
    shortTitle: 'Backend',
    icon: 'fas fa-server',
    skills: [
      { name: 'Node.js',             icon: '/assets/img/icon/node-js-svgrepo-com.svg'   },
      { name: 'Python',              icon: '/assets/img/icon/python-svgrepo-com.svg'     },
      { name: 'PHP',                 icon: '/assets/img/icon/php-svgrepo-com.svg'        },
      { name: 'Laravel / Filament',  icon: '/assets/img/icon/laravel-svgrepo-com.svg'   },
      { name: 'PostgreSQL',          icon: '/assets/img/icon/postgresql-svgrepo-com.svg' },
      { name: 'Firebase',            icon: '/assets/img/icon/firebase-svgrepo-com.svg'  },
      { name: 'React Native',        icon: '/assets/img/icon/react-svgrepo-com.svg'      },
      { name: 'Docker',              icon: '/assets/img/icon/docker-svgrepo-com.svg'     },
    ],
  },
  {
    title: 'Sistemas & Infra',
    shortTitle: 'Infra',
    icon: 'fas fa-network-wired',
    skills: [
      { name: 'Linux',          icon: '/assets/img/icon/linux-tux-svgrepo-com.svg'                                     },
      { name: 'Redes',          icon: '/assets/img/icon/server_technology_network_computer_connection_icon_175929.svg' },
      { name: 'Git',            icon: '/assets/img/icon/git-svgrepo-com.svg'                                           },
      { name: 'Windows Server', icon: '/assets/img/icon/windows-applications-svgrepo-com.svg'                         },
      { name: 'PowerShell',     icon: '/assets/img/icon/powershell-psm-svgrepo-com.svg'                                },
    ],
  },
  {
    title: 'Inteligência Artificial',
    shortTitle: 'IA',
    icon: 'fas fa-brain',
    skills: [
      { name: 'Engenharia de Prompt', icon: '/assets/img/icon/ai-brain-svgrepo-com.svg'       },
      { name: 'Machine Learning',     icon: '/assets/img/icon/neural-network-svgrepo-com.svg' },
      { name: 'APIs de IA',           icon: '/assets/img/icon/api-svgrepo-com.svg'            },
      { name: 'Análise de Dados',     icon: '/assets/img/icon/data-analysis-svgrepo-com.svg'  },
    ],
  },
]

export function Habilidades() {
  const [active, setActive] = useState(0)
  const categoria = categorias[active]!

  return (
    <section
      id="habilidades"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto">
        <SectionHeading
          title="Habilidades & Tecnologias"
          subtitle="Minha caixa de ferramentas tecnológica. Sempre explorando novas stack e aprimorando as existentes."
        />

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-0">

          {/* ── Tab list ── */}
          <div
            role="tablist"
            aria-label="Categorias de habilidades"
            className="flex md:flex-col overflow-x-auto md:overflow-x-visible shrink-0 md:w-52 border-b md:border-b-0 md:border-r border-line"
          >
            {categorias.map((cat, i) => {
              const isActive = active === i
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="hab-panel"
                  onClick={() => setActive(i)}
                  className={[
                    'relative text-left px-5 py-4 transition-all duration-200 whitespace-nowrap md:whitespace-normal',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset',
                    isActive
                      ? 'text-brand bg-brand/5'
                      : 'text-content-secondary hover:text-content hover:bg-surface',
                  ].join(' ')}
                >
                  {isActive && (
                    <motion.span
                      layoutId="hab-tab-indicator"
                      className="absolute bottom-0 left-0 md:bottom-auto md:top-0 h-0.5 md:h-full w-full md:w-0.5 bg-brand rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2 text-sm font-semibold leading-snug">
                    <i className={`${cat.icon} text-xs`} aria-hidden="true" />
                    <span className="md:hidden">{cat.shortTitle}</span>
                    <span className="hidden md:inline">{cat.title}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Tab panel ── */}
          <div
            id="hab-panel"
            role="tabpanel"
            className="flex-1 md:pl-10 pt-8 md:pt-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {/* Category header */}
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {categoria.title}
                  </h3>
                  <p className="text-content-muted text-sm mt-1">
                    {categoria.skills.length} tecnologias
                  </p>
                </div>

                {/* Skills grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="grid grid-cols-3 sm:grid-cols-4 gap-4"
                >
                  {categoria.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={revealItem}
                      whileHover={{ y: -4 }}
                      className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-line bg-surface hover:border-brand/40 hover:bg-brand/5 transition-colors duration-200 cursor-default"
                    >
                      <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-content-secondary group-hover:text-brand transition-colors duration-200 text-center leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
