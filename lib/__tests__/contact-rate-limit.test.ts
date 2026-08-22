import type { Firestore, Transaction } from 'firebase-admin/firestore'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { consumeContactRateLimit, getClientIp } from '../contact-rate-limit'

interface StoredDocument {
  attempts: number
  resetAt: number
  expiresAt: Date
}

function createFakeFirestore(documents = new Map<string, StoredDocument>()) {
  const firestore = {
    collection: vi.fn(() => ({
      doc: vi.fn((id: string) => ({ id })),
    })),
    runTransaction: vi.fn(async (callback: (transaction: Transaction) => Promise<unknown>) => {
      const transaction = {
        get: vi.fn(async (reference: { id: string }) => ({
          exists: documents.has(reference.id),
          data: () => documents.get(reference.id),
        })),
        set: vi.fn((reference: { id: string }, value: StoredDocument) => {
          documents.set(reference.id, value)
        }),
        update: vi.fn((reference: { id: string }, value: Partial<StoredDocument>) => {
          const current = documents.get(reference.id)
          if (current) documents.set(reference.id, { ...current, ...value })
        }),
      }

      return callback(transaction as unknown as Transaction)
    }),
  } as unknown as Firestore

  return firestore
}

describe('contact rate limit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-21T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('prioriza o header da Vercel e ignora valores inválidos', () => {
    const request = new Request('http://localhost:3000', {
      headers: {
        'x-vercel-forwarded-for': '203.0.113.20',
        'x-real-ip': '198.51.100.20',
        'x-forwarded-for': 'not-an-ip',
      },
    })

    expect(getClientIp(request)).toBe('203.0.113.20')
  })

  it('aceita IPv6 e retorna unknown quando não há IP válido', () => {
    const ipv6Request = new Request('http://localhost:3000', {
      headers: { 'x-forwarded-for': '2001:db8::20, 198.51.100.20' },
    })
    const invalidRequest = new Request('http://localhost:3000', {
      headers: { 'x-forwarded-for': 'not-an-ip' },
    })

    expect(getClientIp(ipv6Request)).toBe('2001:db8::20')
    expect(getClientIp(invalidRequest)).toBe('unknown')
  })

  it('compartilha o limite entre instâncias usando o mesmo armazenamento', async () => {
    const documents = new Map<string, StoredDocument>()
    const firstInstance = createFakeFirestore(documents)
    const secondInstance = createFakeFirestore(documents)
    const identifier = 'contact:203.0.113.10'

    await consumeContactRateLimit(identifier, firstInstance)
    await consumeContactRateLimit(identifier, secondInstance)
    await consumeContactRateLimit(identifier, firstInstance)

    await expect(consumeContactRateLimit(identifier, secondInstance)).resolves.toMatchObject({
      allowed: false,
    })
  })

  it('reinicia o contador quando a janela expira', async () => {
    const firestore = createFakeFirestore()
    const identifier = 'contact:expiring-user'

    await consumeContactRateLimit(identifier, firestore)
    await consumeContactRateLimit(identifier, firestore)
    await consumeContactRateLimit(identifier, firestore)
    await expect(consumeContactRateLimit(identifier, firestore)).resolves.toMatchObject({
      allowed: false,
    })

    vi.advanceTimersByTime(60_001)

    await expect(consumeContactRateLimit(identifier, firestore)).resolves.toEqual({
      allowed: true,
      retryAfter: 0,
    })
  })
})
