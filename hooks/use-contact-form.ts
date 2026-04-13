'use client'

import { useState, useCallback, FormEvent } from 'react'
import { validateContactForm, type ContactFormData } from '@/lib/validations/contact'
import { sanitizeInput } from '@/lib/utils/sanitize'
import { useRateLimit } from '@/hooks/use-rate-limit'
import { toast } from 'sonner'

interface UseContactFormReturn {
  formData: ContactFormData
  isSubmitting: boolean
  fieldErrors: Record<string, string>
  isBlocked: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    mensagem: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value)
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))
    if (Object.keys(fieldErrors).length > 0) {
      validateField(name, sanitizedValue)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) setFieldErrors(result.errors)
        toast.error(
          result.message || 'Erro ao enviar mensagem. Por favor, tente novamente.',
          { duration: 5000 }
        )
        return
      }

      toast.success(
        result.message || 'Mensagem enviada com sucesso! Logo entrarei em contato.',
        { duration: 5000 }
      )
      setFormData({ nome: '', email: '', mensagem: '' })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.error(
        'Ocorreu um erro ao enviar sua mensagem. Por favor, verifique sua conexão e tente novamente.',
        { duration: 5000 }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    fieldErrors,
    isBlocked,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
