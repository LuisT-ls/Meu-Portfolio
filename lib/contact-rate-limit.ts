import { createHash } from 'node:crypto'
import type { DocumentReference, Firestore, Transaction } from 'firebase-admin/firestore'
import { getFirebaseAdminFirestore } from './firebase-admin'

const MAX_ATTEMPTS = 3
const WINDOW_MS = 60_000
const DEFAULT_COLLECTION = 'rateLimits'

interface RateLimitDocument {
  attempts: number
  resetAt: number
  expiresAt: Date
}

export interface RateLimitResult {
  allowed: boolean
  retryAfter: number
}

function getRateLimitCollection() {
  return process.env.FIREBASE_RATE_LIMIT_COLLECTION || DEFAULT_COLLECTION
}

export function getRateLimitKey(identifier: string) {
  return createHash('sha256').update(identifier).digest('hex')
}

function isValidRateLimitDocument(value: unknown): value is RateLimitDocument {
  if (!value || typeof value !== 'object') return false

  const document = value as Partial<RateLimitDocument>

  return (
    typeof document.attempts === 'number' &&
    Number.isInteger(document.attempts) &&
    document.attempts >= 1 &&
    typeof document.resetAt === 'number' &&
    Number.isFinite(document.resetAt)
  )
}

async function readAndConsume(
  transaction: Transaction,
  reference: DocumentReference,
  now: number
): Promise<RateLimitResult> {
  const snapshot = await transaction.get(reference)
  const current = snapshot.data()
  const document = isValidRateLimitDocument(current) ? current : undefined
  const resetAt = document?.resetAt ?? 0

  if (!document || !snapshot.exists || resetAt <= now) {
    const nextResetAt = now + WINDOW_MS

    transaction.set(reference, {
      attempts: 1,
      resetAt: nextResetAt,
      expiresAt: new Date(nextResetAt),
    } satisfies RateLimitDocument)

    return { allowed: true, retryAfter: 0 }
  }

  if (document && document.attempts >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((resetAt - now) / 1000)),
    }
  }

  transaction.update(reference, {
    attempts: document.attempts + 1,
  })

  return { allowed: true, retryAfter: 0 }
}

/**
 * Uses a Firestore transaction so the limit is shared across serverless
 * instances and concurrent requests cannot bypass the counter.
 */
export async function consumeContactRateLimit(
  identifier: string,
  firestore: Firestore = getFirebaseAdminFirestore()
): Promise<RateLimitResult> {
  const reference = firestore
    .collection(getRateLimitCollection())
    .doc(getRateLimitKey(identifier))

  return firestore.runTransaction((transaction) =>
    readAndConsume(transaction, reference, Date.now())
  )
}

export function getClientIp(request: Request): string {
  // Em produção, o provedor deve sobrescrever esses headers com o IP real.
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  return forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'
}
