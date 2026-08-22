'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'
import { SectionHeading } from '@/components/ui/section-heading'
import Link from 'next/link'
import { projects, type Project } from '@/lib/projects'

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
      className="glass-panel group flex flex-col rounded-2xl border border-line p-5 transition-all duration-300 hover:border-brand/30 sm:p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-content-on-brand transition-all duration-300">
            <i className="fas fa-folder-open text-sm" aria-hidden="true"></i>
          </div>
          <span className="inline-flex mt-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-surface text-content-muted">
            {project.role}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-content-muted hover:text-content transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
            aria-label={`Ver código de ${project.title} no GitHub`}
          >
            <i className="fab fa-github text-lg" aria-hidden="true"></i>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-content-muted hover:text-brand transition-colors focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
              aria-label={`Ver demo de ${project.title}`}
            >
              <i className="fas fa-external-link-alt text-sm" aria-hidden="true"></i>
            </a>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2 group-hover:text-brand transition-colors">
        {project.title}
      </h3>
      <p className="text-content-secondary text-sm leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <p className="text-xs text-content-secondary mb-5 flex items-start gap-2">
        <i className="fas fa-bullseye text-brand mt-0.5" aria-hidden="true"></i>
        <span><strong className="text-content">Foco:</strong> {project.focus}</span>
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface text-content-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-4">
        <Link
          href={`/projetos/${project.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
        >
          <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
          Ver case
        </Link>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-content-secondary hover:text-content focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
        >
          <i className="fab fa-github" aria-hidden="true"></i>
          Ver código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-content-secondary hover:text-content focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
          >
            <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            Ver demo
          </a>
        )}
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
      className="overflow-hidden bg-transparent px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="container mx-auto">
        <SectionHeading
          title="Projetos em Destaque"
          subtitle="Alguns dos projetos que desenvolvi — explorando diferentes tecnologias e solucionando problemas reais."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          role="group"
          aria-label="Filtrar projetos por categoria"
          className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={activeFilter === f.value}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                activeFilter === f.value
                  ? 'bg-brand text-content-on-brand shadow-lg shadow-brand/25'
                  : 'bg-surface text-content-secondary hover:bg-surface-raised hover:text-content'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            id="projects-grid"
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
            className="inline-flex items-center gap-2 px-6 py-3 border border-line rounded-full text-content-secondary hover:text-content hover:border-brand/50 transition-all duration-200 font-medium focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <i className="fab fa-github"></i>
            Ver todos no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
