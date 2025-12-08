import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_luist-ls'
const EMAILJS_TEMPLATE_ID = 'template_8vzhxeg'
const EMAILJS_USER_ID = '1PLc3xymOa3PrKHEX'

// Inicializar EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_USER_ID)
}

export interface ContactFormData extends Record<string, unknown> {
  nome: string
  email: string
  mensagem: string
}

export const sendEmail = async (formData: ContactFormData): Promise<void> => {
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

