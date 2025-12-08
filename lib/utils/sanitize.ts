import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitiza uma string removendo tags HTML e scripts maliciosos
 * Protege contra XSS (Cross-Site Scripting)
 * 
 * @param input - String a ser sanitizada
 * @returns String sanitizada
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  // Remove todas as tags HTML e mantém apenas texto puro
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  })
}

/**
 * Sanitiza um objeto com strings, aplicando sanitizeInput em cada valor
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T
): T {
  const sanitized = { ...obj }

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key] as string) as T[Extract<keyof T, string>]
    }
  }

  return sanitized
}
