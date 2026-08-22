import Link from 'next/link'

export function Disponibilidade() {
  return (
    <section
      id="disponibilidade"
      className="relative overflow-hidden border-y border-line bg-surface px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
      <div className="container relative mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
        <div>
          <span className="inline-flex rounded-full bg-ok/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-ok">
            Conversas abertas
          </span>
          <h2 className="mt-4 text-3xl font-bold text-content sm:text-4xl">
            Tem um problema para resolver?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-content-secondary">
            Você pode enviar um briefing rápido ou combinar uma conversa inicial pelo canal que for mais confortável.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
          <Link
            href="/agendar"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-content-on-brand transition-colors hover:bg-brand-hover hover:text-content-on-brand focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            <i className="fas fa-calendar-check" aria-hidden="true"></i>
            Agendar conversa
          </Link>
          <Link
            href="/#contato"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface-raised px-6 py-3.5 font-bold text-content transition-colors hover:border-brand/40 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Enviar briefing
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
