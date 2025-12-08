import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../error-boundary'

// Componente que lança erro para testar o ErrorBoundary
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  it('deve renderizar children quando não há erro', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('deve renderizar fallback quando há erro', () => {
    // Suprime console.error durante o teste
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText(/Ops! Algo deu errado/i)).toBeInTheDocument()
    expect(screen.getByText(/Recarregar Página/i)).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it('deve renderizar fallback customizado quando fornecido', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()

    consoleSpy.mockRestore()
  })
})
