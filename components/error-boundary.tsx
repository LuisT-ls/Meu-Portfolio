'use client'

import { Component, type ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log do erro para monitoramento (pode ser integrado com Sentry, etc)
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Em produção, você pode enviar para um serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Exemplo: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
          <div className="max-w-md w-full bg-surface rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-err/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-exclamation-triangle text-err text-2xl" aria-hidden="true"></i>
              </div>
              <h1 className="text-2xl font-bold text-content mb-2">
                Ops! Algo deu errado
              </h1>
              <p className="text-content-secondary mb-6">
                Ocorreu um erro inesperado. Por favor, tente recarregar a página.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-brand text-content-on-brand rounded-lg hover:bg-brand-hover transition-colors font-medium focus-visible:ring-2 focus-visible:ring-brand/40"
                aria-label="Recarregar página"
              >
                <i className="fas fa-redo mr-2" aria-hidden="true"></i>
                Recarregar Página
              </button>

              <Link
                href="/"
                className="block w-full px-4 py-2 bg-surface-raised text-content rounded-lg hover:bg-surface-inset transition-colors font-medium focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <i className="fas fa-home mr-2" aria-hidden="true"></i>
                Voltar ao Início
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-content-muted hover:text-content">
                  Detalhes do erro (apenas em desenvolvimento)
                </summary>
                <pre className="mt-2 p-4 bg-surface-inset rounded text-xs overflow-auto text-err">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
