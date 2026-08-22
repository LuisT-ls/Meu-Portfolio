import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getProjectBySlug, projects } from '@/lib/projects'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Projeto não encontrado | Luís Teixeira' }
  }

  return {
    title: `${project.title} | Cases de Luís Teixeira`,
    description: project.description,
    alternates: {
      canonical: `https://luistls.vercel.app/projetos/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Cases de Luís Teixeira`,
      description: project.description,
      type: 'article',
      url: `https://luistls.vercel.app/projetos/${project.slug}`,
    },
  }
}

export default async function ProjectCaseStudy({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-canvas px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <article className="container mx-auto max-w-5xl">
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-content-secondary transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
          >
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Voltar aos projetos
          </Link>

          <header className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand">
              <span className="rounded-full bg-brand/10 px-3 py-1">{project.categoryLabel}</span>
              <span className="text-content-muted">{project.role}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-content sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-content-secondary sm:mt-6 sm:text-xl">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-content-on-brand transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <i className="fab fa-github" aria-hidden="true"></i>
                Ver código
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-bold text-content transition-colors hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-brand/40"
                >
                  <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                  Ver demonstração
                </a>
              )}
            </div>
          </header>

          <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-8">
              <section className="rounded-3xl border border-line bg-surface p-5 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Contexto</p>
                <h2 className="mt-3 text-2xl font-bold text-content">O problema abordado</h2>
                <p className="mt-4 leading-relaxed text-content-secondary">{project.caseStudy.challenge}</p>
              </section>

              <section className="rounded-3xl border border-line bg-surface p-5 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Construção</p>
                <h2 className="mt-3 text-2xl font-bold text-content">Como a solução foi pensada</h2>
                <p className="mt-4 leading-relaxed text-content-secondary">{project.caseStudy.approach}</p>
              </section>

              <section className="rounded-3xl border border-line bg-surface p-5 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Aprendizados</p>
                <h2 className="mt-3 text-2xl font-bold text-content">O que este projeto demonstra</h2>
                <p className="mt-4 leading-relaxed text-content-secondary">{project.caseStudy.learnings}</p>
              </section>
            </div>

            <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
              <section className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
                <h2 className="text-lg font-bold text-content">Foco do projeto</h2>
                <p className="mt-3 leading-relaxed text-content-secondary">{project.focus}</p>
              </section>

              <section className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
                <h2 className="text-lg font-bold text-content">Arquitetura e ferramentas</h2>
                <ul className="mt-4 space-y-3 text-sm text-content-secondary">
                  {project.caseStudy.architecture.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <i className="fas fa-check mt-1 text-brand" aria-hidden="true"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface-raised px-3 py-1 text-xs font-medium text-content-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-brand/20 bg-brand/5 p-5 sm:p-7">
                <h2 className="text-lg font-bold text-content">Quer conversar sobre algo parecido?</h2>
                <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                  Posso entender seu contexto e avaliar o melhor próximo passo.
                </p>
                <Link
                  href="/#contato"
                  className="mt-5 inline-flex items-center gap-2 font-bold text-brand hover:underline focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                >
                  Iniciar conversa
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </section>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
