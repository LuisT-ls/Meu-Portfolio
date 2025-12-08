import { NextRequest, NextResponse } from 'next/server'
import { validateContactForm } from '@/lib/validations/contact'
import { sanitizeInput } from '@/lib/utils/sanitize'
import { sendEmail } from '@/lib/emailjs'

/**
 * API Route para processar formulário de contato
 * Validação server-side e envio de email
 */
export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const body = await request.json()

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

    // Sanitização dos dados validados
    const sanitizedData = {
      nome: sanitizeInput(validation.data.nome),
      email: sanitizeInput(validation.data.email),
      mensagem: sanitizeInput(validation.data.mensagem),
    }

    // Envio do email
    try {
      await sendEmail(sanitizedData)
      
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
    { status: 405 }
  )
}
