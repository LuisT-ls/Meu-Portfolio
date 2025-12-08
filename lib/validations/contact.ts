import { z } from 'zod'

/**
 * Schema de validação para o formulário de contato
 * Usa Zod para validação type-safe e proteção contra XSS
 */
export const contactFormSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(100, 'Nome muito longo (máximo 100 caracteres)')
    .regex(
      /^[a-zA-ZÀ-ÿ\s'-]+$/,
      'Nome deve conter apenas letras, espaços, hífens e apóstrofes'
    )
    .trim(),
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'Email muito longo (máximo 255 caracteres)')
    .toLowerCase()
    .trim(),
  mensagem: z
    .string()
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(2000, 'Mensagem muito longa (máximo 2000 caracteres)')
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Valida os dados do formulário e retorna os dados validados ou erros
 */
export function validateContactForm(
  data: unknown
): { success: true; data: ContactFormData } | { success: false; errors: z.ZodError } {
  const result = contactFormSchema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: result.error }
}
