'use client'

import { useState, useCallback, FormEvent } from 'react'
import { validateContactForm, type ContactFormData } from '@/lib/validations/contact'
import { useRateLimit } from '@/hooks/use-rate-limit'
import { toast } from 'sonner'

interface UseContactFormReturn {
  formData: ContactFormData
  isSubmitting: boolean
  fieldErrors: Record<string, string>
  isBlocked: boolean
  submissionStatus: 'idle' | 'success' | 'error'
  submissionMessage: string
  retryAfter: number | null
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handlePrivacyChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  startNewMessage: () => void
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    mensagem: '',
    acceptedPrivacy: false,
    website: '',
    tipoProjeto: '',
    prazo: '',
    faixaInvestimento: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [retryAfter, setRetryAfter] = useState<number | null>(null)

  const { isBlocked, recordAttempt, getTimeUntilReset } = useRateLimit()

  const validateField = useCallback(
    (name: string, value: string) => {
      const tempFormData = { ...formData, [name]: value }
      const validation = validateContactForm(tempFormData)

      if (!validation.success) {
        const fieldError = validation.errors.issues.find(
          (error) => error.path[0] === name
        )
        if (fieldError) {
          setFieldErrors((prev) => ({ ...prev, [name]: fieldError.message }))
          return false
        }
      }

      if (fieldErrors[name]) {
        setFieldErrors((prev) => {
          const next = { ...prev }
          delete next[name]
          return next
        })
      }
      return true
    },
    [formData, fieldErrors]
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle')
      setSubmissionMessage('')
      setRetryAfter(null)
    }
    if (Object.keys(fieldErrors).length > 0) {
      validateField(name, value)
    }
  }

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedPrivacy = e.target.checked
    setFormData((prev) => ({ ...prev, acceptedPrivacy }))
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle')
      setSubmissionMessage('')
      setRetryAfter(null)
    }

    if (acceptedPrivacy) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next.acceptedPrivacy
        return next
      })
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    validateField(e.target.name, e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isBlocked) {
      toast.error(
        `Muitas tentativas. Aguarde ${getTimeUntilReset()} segundo(s) antes de tentar novamente.`,
        { duration: 5000 }
      )
      return
    }

    const validation = validateContactForm(formData)

    if (!validation.success) {
      const errors: Record<string, string> = {}
      validation.errors.issues.forEach((error) => {
        if (error.path.length > 0) {
          errors[error.path[0] as string] = error.message
        }
      })
      setFieldErrors(errors)
      toast.error(
        validation.errors.issues[0]?.message || 'Por favor, corrija os erros no formulário.',
        { duration: 5000 }
      )
      return
    }

    const canProceed = recordAttempt()
    if (!canProceed) {
      toast.error(
        `Limite de tentativas excedido. Aguarde ${getTimeUntilReset()} segundo(s).`,
        { duration: 5000 }
      )
      return
    }

    setIsSubmitting(true)
    setFieldErrors({})
    setSubmissionStatus('idle')
    setSubmissionMessage('')
    setRetryAfter(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) setFieldErrors(result.errors)
        const retryAfterHeader = response.headers.get('Retry-After')
        const parsedRetryAfter = retryAfterHeader ? Number.parseInt(retryAfterHeader, 10) : NaN
        setRetryAfter(Number.isFinite(parsedRetryAfter) ? parsedRetryAfter : null)
        setSubmissionStatus('error')
        setSubmissionMessage(result.message || 'Erro ao enviar mensagem. Por favor, tente novamente.')
        toast.error(
          result.message || 'Erro ao enviar mensagem. Por favor, tente novamente.',
          { duration: 5000 }
        )
        return
      }

      const successMessage = result.message || 'Mensagem enviada com sucesso! Logo entrarei em contato.'
      setSubmissionStatus('success')
      setSubmissionMessage(successMessage)
      toast.success(successMessage, { duration: 5000 })
      setFormData({
        nome: '',
        email: '',
        mensagem: '',
        acceptedPrivacy: false,
        website: '',
        tipoProjeto: '',
        prazo: '',
        faixaInvestimento: '',
      })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setSubmissionStatus('error')
      setSubmissionMessage('Ocorreu um erro ao enviar sua mensagem. Verifique sua conexão e tente novamente.')
      toast.error(
        'Ocorreu um erro ao enviar sua mensagem. Verifique sua conexão e tente novamente.',
        { duration: 5000 }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const startNewMessage = () => {
    setFormData({
      nome: '',
      email: '',
      mensagem: '',
      acceptedPrivacy: false,
      website: '',
      tipoProjeto: '',
      prazo: '',
      faixaInvestimento: '',
    })
    setFieldErrors({})
    setSubmissionStatus('idle')
    setSubmissionMessage('')
    setRetryAfter(null)
  }

  return {
    formData,
    isSubmitting,
    fieldErrors,
    isBlocked,
    submissionStatus,
    submissionMessage,
    retryAfter,
    handleChange,
    handlePrivacyChange,
    handleBlur,
    handleSubmit,
    startNewMessage,
  }
}
