import { beforeEach, describe, expect, it } from 'vitest'
import { buildContactEmailDocument } from '../firebase-mail'

describe('firebase mail queue', () => {
  beforeEach(() => {
    process.env.CONTACT_EMAIL_TO = 'luist_ls@outlook.pt'
  })

  it('builds a Trigger Email document with a reply-to address', () => {
    const document = buildContactEmailDocument({
      nome: 'Luís Teixeira',
      email: 'visitor@example.com',
      mensagem: 'Gostaria de conversar sobre um projeto.',
    })

    expect(document).toEqual({
      to: 'luist_ls@outlook.pt',
      replyTo: 'visitor@example.com',
      message: {
        subject: 'Nova mensagem do portfólio: Luís Teixeira',
        text: [
          'Nome: Luís Teixeira',
          'E-mail: visitor@example.com',
          '',
          'Mensagem:',
          'Gostaria de conversar sobre um projeto.',
        ].join('\n'),
      },
      metadata: {
        source: 'portfolio-contact',
      },
    })
  })

  it('includes the optional project briefing when provided', () => {
    const document = buildContactEmailDocument({
      nome: 'Luís Teixeira',
      email: 'visitor@example.com',
      mensagem: 'Gostaria de conversar sobre um projeto.',
      tipoProjeto: 'system',
      prazo: 'within-one-month',
      faixaInvestimento: '5k-to-15k',
    })

    expect(document.message.text).toContain('Briefing:')
    expect(document.message.text).toContain('Tipo de projeto: system')
    expect(document.message.text).toContain('Prazo: within-one-month')
    expect(document.message.text).toContain('Faixa de investimento: 5k-to-15k')
  })

  it('fails clearly when the recipient is not configured', () => {
    delete process.env.CONTACT_EMAIL_TO

    expect(() =>
      buildContactEmailDocument({
        nome: 'Luís Teixeira',
        email: 'visitor@example.com',
        mensagem: 'Mensagem de teste válida.',
      })
    ).toThrow('CONTACT_EMAIL_TO não está configurado.')
  })
})
