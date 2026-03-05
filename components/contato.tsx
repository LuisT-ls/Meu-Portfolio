'use client'

import { useState, FormEvent, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'
import { validateContactForm, type ContactFormData } from '@/lib/validations/contact'
import { sanitizeInput } from '@/lib/utils/sanitize'
import { useRateLimit } from '@/hooks/use-rate-limit'
import { toast } from 'sonner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Contato() {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    mensagem: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const {
    isBlocked,
    recordAttempt,
    getTimeUntilReset,
  } = useRateLimit()

  // Validação em tempo real
  const validateField = useCallback((name: string, value: string) => {
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

    // Limpa erro se campo está válido
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    return true
  }, [formData, fieldErrors])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    // Sanitiza o input antes de atualizar o estado
    const sanitizedValue = sanitizeInput(value)
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))

    // Validação em tempo real (apenas se já houve tentativa de submit ou blur)
    if (Object.keys(fieldErrors).length > 0) {
      validateField(name, sanitizedValue)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Verifica rate limiting
    if (isBlocked) {
      const secondsRemaining = getTimeUntilReset()
      toast.error(
        `Muitas tentativas. Aguarde ${secondsRemaining} segundo(s) antes de tentar novamente.`,
        { duration: 5000 }
      )
      return
    }

    // Validação com Zod
    const validation = validateContactForm(formData)

    if (!validation.success) {
      // Processa erros do Zod
      const errors: Record<string, string> = {}
      validation.errors.issues.forEach((error) => {
        if (error.path.length > 0) {
          const field = error.path[0] as string
          errors[field] = error.message
        }
      })
      setFieldErrors(errors)

      // Mostra toast com primeiro erro
      const firstError = validation.errors.issues[0]
      toast.error(
        firstError?.message || 'Por favor, corrija os erros no formulário.',
        { duration: 5000 }
      )
      return
    }

    // Registra tentativa (rate limiting)
    const canProceed = recordAttempt()
    if (!canProceed) {
      const secondsRemaining = getTimeUntilReset()
      toast.error(
        `Limite de tentativas excedido. Aguarde ${secondsRemaining} segundo(s).`,
        { duration: 5000 }
      )
      return
    }

    setIsSubmitting(true)
    setFieldErrors({})

    try {
      // Envia para API Route (validação server-side)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      })

      const result = await response.json()

      if (!response.ok) {
        // Erros de validação do servidor
        if (result.errors) {
          setFieldErrors(result.errors)
        }
        toast.error(
          result.message || 'Erro ao enviar mensagem. Por favor, tente novamente.',
          { duration: 5000 }
        )
        return
      }

      // Sucesso
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

  return (
    <section
      id="contato"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tem um projeto em mente ou apenas quer dizer oi? Sinta-se à vontade para me mandar uma mensagem!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            {[
              {
                prefix: 'fas',
                icon: 'fa-envelope',
                title: 'E-mail',
                value: 'luist_ls@outlook.pt',
                href: 'mailto:luist_ls@outlook.pt',
                label: 'Enviar E-mail'
              },
              {
                prefix: 'fab',
                icon: 'fa-whatsapp',
                title: 'WhatsApp',
                value: '+55 71 99219-3686',
                href: 'https://wa.link/u8h8e6',
                label: 'Enviar Mensagem'
              },
              {
                prefix: 'fab',
                icon: 'fa-linkedin',
                title: 'LinkedIn',
                value: 'luis-tei',
                href: 'https://www.linkedin.com/in/luis-tei',
                label: 'Conectar'
              }
            ].map((info, i) => (
              <motion.div
                key={i}
                variants={revealItem}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all group flex items-center gap-6"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform">
                  <i className={`${info.prefix} ${info.icon}`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{info.title}</h3>
                  <p className="text-muted-foreground mb-2">{info.value}</p>
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-2"
                  >
                    {info.label}
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6"
              aria-label="Formulário de contato"
              noValidate
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Nome Completo <span className="text-primary">*</span>
                  </label>
                  <div className="relative group">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"></i>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/30 border transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                        fieldErrors.nome ? "border-red-500/50" : "border-white/5 focus:border-primary/50"
                      )}
                      placeholder="Seu nome"
                    />
                  </div>
                  <AnimatePresence>
                    {fieldErrors.nome && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-medium">
                        {fieldErrors.nome}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Email <span className="text-primary">*</span>
                  </label>
                  <div className="relative group">
                    <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/30 border transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                        fieldErrors.email ? "border-red-500/50" : "border-white/5 focus:border-primary/50"
                      )}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <AnimatePresence>
                    {fieldErrors.email && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 font-medium">
                        {fieldErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                    Mensagem <span className="text-primary">*</span>
                  </label>
                  <div className="relative group">
                    <i className="fas fa-comment-alt absolute left-4 top-5 text-muted-foreground group-focus-within:text-primary transition-colors"></i>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-xl bg-secondary/30 border transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none",
                        fieldErrors.mensagem ? "border-red-500/50" : "border-white/5 focus:border-primary/50"
                      )}
                      placeholder="Como posso ajudar?"
                    />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                      {formData.mensagem.length} / 2000
                    </span>
                    {fieldErrors.mensagem && (
                      <span className="text-xs text-red-500 font-medium">
                        {fieldErrors.mensagem}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <input
                  type="checkbox"
                  id="privacy-check"
                  required
                  className="mt-1 accent-primary"
                />
                <label
                  htmlFor="privacy-check"
                  className="text-xs text-muted-foreground leading-relaxed"
                >
                  Concordo com a{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-primary font-bold hover:underline"
                  >
                    Política de Privacidade
                  </Link> e autorizo o processamento dos meus dados para este contato.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isBlocked}
                className="w-full py-4 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <i className="fas fa-circle-notch"></i>
                  </motion.div>
                ) : (
                  <>
                    <i className="fas fa-paper-plane text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

