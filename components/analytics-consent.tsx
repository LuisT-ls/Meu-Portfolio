'use client'

import Link from 'next/link'

interface AnalyticsConsentProps {
  onAccept: () => void
  onReject: () => void
}

export function AnalyticsConsent({ onAccept, onReject }: AnalyticsConsentProps) {
  return (
    <aside
      role="dialog"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-line bg-surface-raised p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl sm:inset-x-6 sm:bottom-4 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <h2 id="analytics-consent-title" className="font-bold text-content">
            Posso usar dados de navegação para melhorar o site?
          </h2>
          <p id="analytics-consent-description" className="text-sm leading-relaxed text-content-secondary">
            O Analytics ajuda a entender quais conteúdos são mais úteis. Você pode aceitar ou recusar, e mudar de ideia depois nas configurações do navegador.{' '}
            <Link href="/privacy-policy" className="font-semibold text-brand hover:underline">
              Saiba mais na política de privacidade.
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onReject}
            className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-content-secondary transition-colors hover:bg-surface hover:text-content focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-content-on-brand transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand/40"
          >
            Aceitar Analytics
          </button>
        </div>
      </div>
    </aside>
  )
}
