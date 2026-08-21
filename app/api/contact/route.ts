import { NextRequest, NextResponse } from 'next/server'
import { validateContactForm } from '@/lib/validations/contact'
import { enqueueContactEmail } from '@/lib/firebase-mail'
import { consumeContactRateLimit, getClientIp } from '@/lib/contact-rate-limit'
import { isAllowedOrigin } from '@/lib/request-security'

const MAX_BODY_BYTES = 32_000

export const runtime = 'nodejs'

/**
 * API Route para processar formulário de contato
 * Validação server-side e envio de email
 */
export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return NextResponse.json(
      { success: false, message: 'Origem não autorizada.' },
      { status: 403 }
    )
  }

  let rateLimit

  try {
    rateLimit = await consumeContactRateLimit(`contact:${getClientIp(request)}`)
  } catch (error) {
    console.error('Erro ao consultar rate limit de contato:', error)

    return NextResponse.json(
      { success: false, message: 'Serviço temporariamente indisponível.' },
      { status: 503 }
    )
  }

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Muitas tentativas. Tente novamente mais tarde.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfter) },
      }
    )
  }

  try {
    const contentLength = Number(request.headers.get('content-length'))
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Requisição muito grande.' },
        { status: 413 }
      )
    }

    const rawBody = await request.text()
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, message: 'Requisição muito grande.' },
        { status: 413 }
      )
    }

    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        { success: false, message: 'JSON inválido.' },
        { status: 400 }
      )
    }

    // Validação com Zod (server-side)
    const validation = validateContactForm(body)

    if (!validation.success) {
      // Retorna erros de validação
      const errors: Record<string, string> = {}
      validation.errors.issues.forEach((error) => {
        if (error.path.length > 0) {
          const field = error.path[0] as string
          errors[field] = error.message
        }
      })

      return NextResponse.json(
        {
          success: false,
          errors,
          message: 'Dados inválidos. Por favor, verifique os campos.',
        },
        { status: 400 }
      )
    }

    // Bots que preenchem o campo honeypot recebem uma resposta neutra.
    if (validation.data.website) {
      return NextResponse.json({
        success: true,
        message: 'Mensagem enviada com sucesso! Logo entrarei em contato.',
      })
    }

    // Enfileira o e-mail no Firestore para a extensão Firebase Trigger Email.
    try {
      await enqueueContactEmail(validation.data)
      
      return NextResponse.json(
        {
          success: true,
          message: 'Mensagem enviada com sucesso! Logo entrarei em contato.',
        },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
      
      return NextResponse.json(
        {
          success: false,
          message: 'Erro ao enviar mensagem. Por favor, tente novamente mais tarde.',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erro na API de contato:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.',
      },
      { status: 500 }
    )
  }
}

// Método não permitido
export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST.' },
    { status: 405, headers: { Allow: 'POST' } }
  )
}
