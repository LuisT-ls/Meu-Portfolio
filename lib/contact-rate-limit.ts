const MAX_ATTEMPTS = 3
const WINDOW_MS = 60_000
const MAX_BUCKETS = 10_000

interface RateLimitBucket {
  attempts: number
  resetAt: number
}

const buckets = new Map<string, RateLimitBucket>()

function pruneExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export function getClientIp(request: Request): string {
  // Em produção, o provedor deve sobrescrever esses headers com o IP real.
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  return forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'
}

export function consumeContactRateLimit(identifier: string) {
  const now = Date.now()
  pruneExpiredBuckets(now)

  if (buckets.size >= MAX_BUCKETS && !buckets.has(identifier)) {
    const oldestKey = buckets.keys().next().value
    if (oldestKey) buckets.delete(oldestKey)
  }

  const current = buckets.get(identifier)
  if (!current || current.resetAt <= now) {
    buckets.set(identifier, { attempts: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  if (current.attempts >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    }
  }

  current.attempts += 1

  return { allowed: true, retryAfter: 0 }
}
