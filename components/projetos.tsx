'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'

interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  demo?: string
  category: 'web' | 'mobile' | 'tools' | 'data'
}

const projects: Project[] = [
  {
    title: 'Delivery SaaS',
    description: 'Solução SaaS para delivery com dashboard administrativo, gestão de pedidos em tempo real e integração de pagamentos.',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
    github: 'https://github.com/LuisT-ls/delivery-saas',
    category: 'web',
  },
  {
    title: 'Sistema de Venda de Ingressos',
    description: 'Plataforma para venda e gerenciamento de ingressos com carrinho de compras, validação de assentos e processamento de pedidos.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/LuisT-ls/ticket-sales-system',
    category: 'web',
  },
  {
    title: 'Meu Orçamento',
    description: 'Aplicativo de controle financeiro pessoal com categorização de gastos, gráficos interativos e exportação de relatórios.',
    tags: ['JavaScript', 'Chart.js', 'LocalStorage'],
    github: 'https://github.com/LuisT-ls/meu-orcamento',
    category: 'web',
  },
  {
    title: 'QUARTIL',
    description: 'Ferramenta estatística para análise de dados com cálculo de quartis, mediana, média e visualização de boxplots.',
    tags: ['JavaScript', 'Estatística', 'Visualização'],
    github: 'https://github.com/LuisT-ls/QUARTIL',
    category: 'data',
  },
  {
    title: 'Conversor de Imagens',
    description: 'Conversor de imagens client-side com suporte a múltiplos formatos (PNG, JPEG, WebP, SVG) e redimensionamento.',
    tags: ['JavaScript', 'Canvas API', 'HTML5'],
    github: 'https://github.com/LuisT-ls/Conversor-Imagens',
    category: 'tools',
  },
  {
    title: 'Histórico Universitário',
    description: 'Sistema para acompanhamento do histórico acadêmico com visualização de disciplinas, notas e cálculo de coeficiente de rendimento.',
    tags: ['JavaScript', 'React', 'Firebase'],
    github: 'https://github.com/LuisT-ls/Historico-Universitario',
    category: 'tools',
  },
]

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Ferramentas', value: 'tools' },
  { label: 'Dados', value: 'data' },
]


function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={revealItem}
      layout
      className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 flex flex-col group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <i className="fas fa-folder-open text-sm"></i>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Ver código de ${project.title} no GitHub`}
          >
            <i className="fab fa-github text-lg"></i>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label={`Ver demo de ${project.title}`}
            >
              <i className="fas fa-external-link-alt text-sm"></i>
            </a>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-secondary/50 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Projetos() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section
      id="projetos"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Projetos em Destaque</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi — explorando diferentes tecnologias e solucionando problemas reais.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/LuisT-ls"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200 font-medium"
          >
            <i className="fab fa-github"></i>
            Ver todos no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
