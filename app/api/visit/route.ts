import { NextRequest, NextResponse } from 'next/server'
import { consumeContactRateLimit, getClientIp } from '@/lib/contact-rate-limit'
import { incrementVisitCount } from '@/lib/firebase-admin'
import { isAllowedOrigin } from '@/lib/request-security'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return NextResponse.json(
      { success: false, message: 'Origem não autorizada.' },
      { status: 403 }
    )
  }

  const rateLimit = consumeContactRateLimit(`visit:${getClientIp(request)}`)
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
    const visitCount = await incrementVisitCount()

    return NextResponse.json(
      { success: true, visitCount },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Erro ao incrementar contador de visitas:', error)

    return NextResponse.json(
      { success: false, message: 'Contador de visitas indisponível.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Método não permitido. Use POST.' },
    { status: 405, headers: { Allow: 'POST' } }
  )
}
