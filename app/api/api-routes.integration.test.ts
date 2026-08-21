import { deleteApp, getApps } from 'firebase-admin/app'
import { getFirebaseAdminDatabase, getFirebaseAdminFirestore } from '@/lib/firebase-admin'
import { GET as getContact, POST as postContact } from '@/app/api/contact/route'
import { GET as getVisit, POST as postVisit } from '@/app/api/visit/route'
import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'

const PROJECT_ID = 'portfolio-contador'
const FIRESTORE_CLEAR_URL =
  `http://127.0.0.1:8080/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`

function makeRequest(path: string, body: string, ip: string, origin = 'http://localhost:3000') {
  return new NextRequest(`http://localhost:3000${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin,
      'x-forwarded-for': ip,
    },
    body,
  })
}

function validContactBody(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    nome: 'Luís Teixeira',
    email: 'visitor@example.com',
    mensagem: 'Mensagem válida para o teste de integração.',
    acceptedPrivacy: true,
    website: '',
    ...overrides,
  })
}

async function clearFirestore() {
  const response = await fetch(FIRESTORE_CLEAR_URL, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(`Não foi possível limpar o Firestore Emulator: ${response.status}`)
  }
}

async function clearRealtimeDatabase() {
  await getFirebaseAdminDatabase().ref('/').set(null)
}

describe('API routes com Firebase Emulator Suite', () => {
  beforeAll(async () => {
    getFirebaseAdminFirestore()
    getFirebaseAdminDatabase()
    await clearFirestore()
    await clearRealtimeDatabase()
  })

  beforeEach(async () => {
    await clearFirestore()
    await clearRealtimeDatabase()
  })

  afterAll(async () => {
    await Promise.all(getApps().map((app) => deleteApp(app)))
  })

  it('recusa origens não autorizadas antes de acessar o Firebase', async () => {
    const response = await postContact(
      makeRequest('/api/contact', validContactBody(), '203.0.113.1', 'https://example.com')
    )

    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toMatchObject({ success: false })
  })

  it('rejeita JSON inválido com status 400', async () => {
    const response = await postContact(
      makeRequest('/api/contact', '{invalido', '203.0.113.2')
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toMatchObject({ message: 'JSON inválido.' })
  })

  it('protege o consentimento de privacidade no servidor', async () => {
    const response = await postContact(
      makeRequest(
        '/api/contact',
        validContactBody({ acceptedPrivacy: false }),
        '203.0.113.3'
      )
    )

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.errors.acceptedPrivacy).toContain('Política de Privacidade')
    expect((await getFirebaseAdminFirestore().collection('mail').get()).empty).toBe(true)
  })

  it('enfileira uma mensagem válida no Firestore sem enviar e-mail real', async () => {
    const response = await postContact(
      makeRequest('/api/contact', validContactBody(), '203.0.113.4')
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({ success: true })

    const snapshot = await getFirebaseAdminFirestore().collection('mail').get()
    expect(snapshot.size).toBe(1)
    expect(snapshot.docs[0]?.data()).toMatchObject({
      to: 'inbox@example.com',
      replyTo: 'visitor@example.com',
      metadata: { source: 'portfolio-contact' },
      message: {
        subject: 'Nova mensagem do portfólio: Luís Teixeira',
      },
    })
  })

  it('responde neutro ao honeypot sem enfileirar mensagem', async () => {
    const response = await postContact(
      makeRequest('/api/contact', validContactBody({ website: 'bot-value' }), '203.0.113.5')
    )

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toMatchObject({ success: true })
    expect((await getFirebaseAdminFirestore().collection('mail').get()).empty).toBe(true)
  })

  it('aplica rate limit distribuído depois de três tentativas', async () => {
    const ip = '203.0.113.6'

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await postContact(makeRequest('/api/contact', '{}', ip))
      expect(response.status).toBe(400)
    }

    const blocked = await postContact(makeRequest('/api/contact', '{}', ip))

    expect(blocked.status).toBe(429)
    expect(Number(blocked.headers.get('retry-after'))).toBeGreaterThan(0)
  })

  it('incrementa o contador via transação no Realtime Database', async () => {
    const first = await postVisit(makeRequest('/api/visit', '', '203.0.113.7'))
    const second = await postVisit(makeRequest('/api/visit', '', '203.0.113.8'))

    expect(first.status).toBe(200)
    expect(second.status).toBe(200)
    await expect(first.json()).resolves.toMatchObject({ success: true, visitCount: 1 })
    await expect(second.json()).resolves.toMatchObject({ success: true, visitCount: 2 })
  })

  it('retorna 405 para métodos GET das APIs', async () => {
    const contactResponse = await getContact()
    const visitResponse = await getVisit()

    expect(contactResponse.status).toBe(405)
    expect(visitResponse.status).toBe(405)
    expect(contactResponse.headers.get('allow')).toBe('POST')
    expect(visitResponse.headers.get('allow')).toBe('POST')
  })
})
