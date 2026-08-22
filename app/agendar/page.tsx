import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { hasSchedulingIntegration, schedulingUrl } from '@/lib/scheduling'

export const metadata: Metadata = {
  title: 'Agendar conversa | Luís Teixeira',
  description: 'Escolha a melhor forma de conversar sobre seu projeto com Luís Teixeira.',
  alternates: {
    canonical: 'https://luistls.vercel.app/agendar',
  },
}

export default function SchedulePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-canvas px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-content-secondary transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
          >
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            Voltar ao portfólio
          </Link>

          <section className="mt-10 max-w-3xl">
            <span className="inline-flex rounded-full bg-ok/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ok">
              Próximo passo
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-content sm:text-5xl lg:text-6xl">
              Vamos entender seu projeto.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-content-secondary sm:mt-6 sm:text-xl">
              Escolha uma opção abaixo. A primeira conversa serve para entender o contexto, alinhar objetivos e decidir se faz sentido avançar.
            </p>
          </section>

          <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2">
            <a
              href={schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl border border-brand/30 bg-brand/5 p-5 transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-brand focus-visible:ring-2 focus-visible:ring-brand/40 sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-content-on-brand">
                <i className={hasSchedulingIntegration ? 'fas fa-calendar-check' : 'fab fa-whatsapp'} aria-hidden="true"></i>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-content">
                {hasSchedulingIntegration ? 'Agendar uma conversa' : 'Combinar pelo WhatsApp'}
              </h2>
              <p className="mt-3 leading-relaxed text-content-secondary">
                {hasSchedulingIntegration
                  ? 'Escolha um horário disponível no calendário integrado.'
                  : 'Envie uma mensagem e combine o melhor horário diretamente.'}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-brand">
                Continuar
                <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
              </span>
            </a>

            <Link
              href="/#contato"
              className="group rounded-3xl border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brand/40 sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <i className="fas fa-clipboard-list" aria-hidden="true"></i>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-content">Enviar um briefing</h2>
              <p className="mt-3 leading-relaxed text-content-secondary">
                Compartilhe objetivo, prazo e faixa de investimento para tornar a primeira conversa mais objetiva.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-brand">
                Preencher formulário
                <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" aria-hidden="true"></i>
              </span>
            </Link>
          </div>

          <section className="mt-8 rounded-3xl border border-line bg-surface p-5 sm:mt-10 sm:p-9">
            <h2 className="text-2xl font-bold text-content">O que esperar</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {[
                ['01', 'Contexto', 'Entendemos o problema e o resultado desejado.'],
                ['02', 'Direção', 'Identificamos uma abordagem técnica possível.'],
                ['03', 'Próximo passo', 'Combinamos escopo, prazo e forma de avançar.'],
              ].map(([number, title, description]) => (
                <div key={number}>
                  <span className="text-sm font-bold text-brand">{number}</span>
                  <h3 className="mt-2 font-bold text-content">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">{description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
