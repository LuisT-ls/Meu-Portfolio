import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpa após cada teste
afterEach(() => {
  cleanup()
})

// Mock do Font Awesome para testes
if (typeof global.CSS === 'undefined') {
  global.CSS = {
    supports: () => false,
  } as unknown as typeof CSS
}

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
