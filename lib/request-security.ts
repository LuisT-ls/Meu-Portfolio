const PRODUCTION_ORIGIN = 'https://luistls.vercel.app'

export function isAllowedOrigin(origin: string | null) {
  if (!origin) return true

  const allowedOrigins = new Set([
    process.env.APP_ORIGIN,
    PRODUCTION_ORIGIN,
    ...(process.env.NODE_ENV === 'production'
      ? []
      : ['http://localhost:3000', 'http://127.0.0.1:3000']),
  ])

  return allowedOrigins.has(origin)
}
