import type { ContactEmailData } from '@/lib/validations/contact'
import { getFirebaseAdminFirestore } from '@/lib/firebase-admin'

const DEFAULT_MAIL_COLLECTION = 'mail'

export interface ContactEmailDocument {
  to: string
  replyTo: string
  message: {
    subject: string
    text: string
  }
  metadata: {
    source: 'portfolio-contact'
  }
}

function getContactEmailRecipient(): string {
  const recipient = process.env.CONTACT_EMAIL_TO?.trim()

  if (!recipient) {
    throw new Error('CONTACT_EMAIL_TO não está configurado.')
  }

  return recipient
}

export function buildContactEmailDocument(
  formData: ContactEmailData
): ContactEmailDocument {
  const briefing = [
    formData.tipoProjeto && `Tipo de projeto: ${formData.tipoProjeto}`,
    formData.prazo && `Prazo: ${formData.prazo}`,
    formData.faixaInvestimento && `Faixa de investimento: ${formData.faixaInvestimento}`,
  ].filter(Boolean)

  return {
    to: getContactEmailRecipient(),
    replyTo: formData.email,
    message: {
      subject: `Nova mensagem do portfólio: ${formData.nome}`,
      text: [
        `Nome: ${formData.nome}`,
        `E-mail: ${formData.email}`,
        ...(briefing.length > 0 ? ['', 'Briefing:', ...briefing] : []),
        '',
        'Mensagem:',
        formData.mensagem,
      ].join('\n'),
    },
    metadata: {
      source: 'portfolio-contact',
    },
  }
}

export async function enqueueContactEmail(
  formData: ContactEmailData
): Promise<string> {
  const collection =
    process.env.FIREBASE_MAIL_COLLECTION?.trim() || DEFAULT_MAIL_COLLECTION
  const emailDocument = buildContactEmailDocument(formData)
  const documentReference = await getFirebaseAdminFirestore()
    .collection(collection)
    .add(emailDocument)

  return documentReference.id
}
