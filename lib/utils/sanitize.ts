const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/**
 * Codifica uma string para que conteúdo controlado pelo usuário permaneça texto
 * mesmo quando o template de e-mail for renderizado como HTML.
 * 
 * @param input - String a ser sanitizada
 * @returns String sanitizada
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return ''
  }

  return input.replace(/[&<>"']/g, (character) => HTML_ENTITIES[character] ?? character)
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
