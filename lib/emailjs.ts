import emailjs from '@emailjs/browser'
import type { ContactFormData } from '@/lib/validations/contact'

// Carrega credenciais de variáveis de ambiente
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

// Validação das variáveis de ambiente (apenas em runtime)
const validateEmailJSConfig = () => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
    console.warn(
      'EmailJS credentials are missing. Please check your environment variables.'
    )
    return false
  }
  return true
}

// Inicializar EmailJS (apenas se as credenciais estiverem disponíveis)
if (typeof window !== 'undefined' && EMAILJS_USER_ID) {
  emailjs.init(EMAILJS_USER_ID)
}

// Re-exportar o tipo para compatibilidade
export type { ContactFormData }

export const sendEmail = async (formData: ContactFormData): Promise<void> => {
  if (!validateEmailJSConfig() || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_USER_ID) {
    throw new Error('EmailJS não está configurado corretamente')
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formData,
      EMAILJS_USER_ID
    )

    if (response.status !== 200) {
      throw new Error('Erro ao enviar mensagem')
    }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw error
  }
}

