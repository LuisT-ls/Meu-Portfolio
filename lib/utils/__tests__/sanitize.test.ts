import { describe, expect, it } from 'vitest'
import { sanitizeInput } from '../sanitize'

describe('sanitizeInput', () => {
  it('codifica conteúdo HTML controlado pelo usuário', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    )
  })
})
