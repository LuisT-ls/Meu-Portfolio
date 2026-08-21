import { describe, expect, it } from 'vitest'
import { consumeContactRateLimit } from '../contact-rate-limit'

describe('contact rate limit', () => {
  it('permite três tentativas e bloqueia a quarta', () => {
    const identifier = `test-${Date.now()}-${Math.random()}`

    expect(consumeContactRateLimit(identifier).allowed).toBe(true)
    expect(consumeContactRateLimit(identifier).allowed).toBe(true)
    expect(consumeContactRateLimit(identifier).allowed).toBe(true)

    const blocked = consumeContactRateLimit(identifier)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfter).toBeGreaterThan(0)
  })
})
