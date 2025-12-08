import { describe, it, expect } from 'vitest'
import { validateContactForm, contactFormSchema } from '../contact'

describe('contactFormSchema', () => {
  describe('validação de nome', () => {
    it('deve aceitar nome válido', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'test@example.com',
        mensagem: 'Esta é uma mensagem de teste com mais de 10 caracteres.',
      })

      expect(result.success).toBe(true)
    })

    it('deve rejeitar nome muito curto', () => {
      const result = contactFormSchema.safeParse({
        nome: 'A',
        email: 'test@example.com',
        mensagem: 'Esta é uma mensagem de teste.',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('mínimo 2 caracteres')
      }
    })

    it('deve rejeitar nome com caracteres inválidos', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís123',
        email: 'test@example.com',
        mensagem: 'Esta é uma mensagem de teste.',
      })

      expect(result.success).toBe(false)
    })
  })

  describe('validação de email', () => {
    it('deve aceitar email válido', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'test@example.com',
        mensagem: 'Esta é uma mensagem de teste.',
      })

      expect(result.success).toBe(true)
    })

    it('deve rejeitar email inválido', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'email-invalido',
        mensagem: 'Esta é uma mensagem de teste.',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('Email inválido')
      }
    })

    it('deve converter email para lowercase', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'TEST@EXAMPLE.COM',
        mensagem: 'Esta é uma mensagem de teste.',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('test@example.com')
      }
    })
  })

  describe('validação de mensagem', () => {
    it('deve aceitar mensagem válida', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'test@example.com',
        mensagem: 'Esta é uma mensagem de teste com mais de 10 caracteres.',
      })

      expect(result.success).toBe(true)
    })

    it('deve rejeitar mensagem muito curta', () => {
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'test@example.com',
        mensagem: 'Curta',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('mínimo 10 caracteres')
      }
    })

    it('deve rejeitar mensagem muito longa', () => {
      const longMessage = 'a'.repeat(2001)
      const result = contactFormSchema.safeParse({
        nome: 'Luís Teixeira',
        email: 'test@example.com',
        mensagem: longMessage,
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain('máximo 2000 caracteres')
      }
    })
  })
})

describe('validateContactForm', () => {
  it('deve retornar success: true para dados válidos', () => {
    const result = validateContactForm({
      nome: 'Luís Teixeira',
      email: 'test@example.com',
      mensagem: 'Esta é uma mensagem de teste válida.',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.nome).toBe('Luís Teixeira')
      expect(result.data.email).toBe('test@example.com')
    }
  })

  it('deve retornar success: false para dados inválidos', () => {
    const result = validateContactForm({
      nome: 'A',
      email: 'invalid',
      mensagem: 'Curta',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.issues.length).toBeGreaterThan(0)
    }
  })
})
