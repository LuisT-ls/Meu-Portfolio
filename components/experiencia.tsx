'use client'

import { motion } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'

export function Experiencia() {
  const experiencias = [
    {
      titulo: 'Estagiário de Suporte Técnico',
      empresa: 'Instituto Recôncavo de Tecnologia',
      periodo: 'Nov/2021 - Nov/2023',
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
      periodo: 'Out/2019 - Mar/2020',
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
      periodo: '2020 - 2021',
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

  return (
    <section
      id="experiencia"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-center mb-16"
        >
          Experiência Profissional
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {experiencias.map((exp, index) => (
            <motion.div
              key={index}
              variants={revealItem}
              className={`relative mb-12 flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
            >
              {/* Dot on timeline */}
              <div className="hidden md:flex absolute left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

              <div className="w-full md:w-[45%]">
                <div className="glass-panel p-8 rounded-2xl hover:border-primary/50 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                      {exp.periodo}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{exp.titulo}</h3>
                  <p className="text-lg text-primary font-semibold mb-6">{exp.empresa}</p>

                  <ul className="space-y-3 mb-8">
                    {exp.responsabilidades.map((resp, i) => (
                      <li key={i} className="flex gap-3 text-muted-foreground text-sm">
                        <i className="fas fa-check text-primary mt-1 shrink-0"></i>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-4">Destaques</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.conquistas.map((conq, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-secondary/50 rounded-md border border-border">
                          {conq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

