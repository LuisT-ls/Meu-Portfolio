'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { revealItem, staggerContainer } from '@/lib/animations'
import { useContactForm } from '@/hooks/use-contact-form'
import { SectionHeading } from '@/components/ui/section-heading'
import { IconBadge } from '@/components/ui/icon-badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Contato() {
  const {
    formData,
    isSubmitting,
    fieldErrors,
    isBlocked,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm()

  return (
    <section
      id="contato"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="container mx-auto">
        <SectionHeading
          title="Entre em Contato"
          subtitle="Tem um projeto em mente ou apenas quer dizer oi? Sinta-se à vontade para me mandar uma mensagem!"
        />

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
                className="glass-panel p-6 rounded-2xl border border-line hover:border-brand/30 transition-all group flex items-center gap-6"
              >
                <IconBadge
                  icon={`${info.prefix} ${info.icon}`}
                  size="lg"
                  className="group-hover:scale-110 transition-transform"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{info.title}</h3>
                  <p className="text-content-secondary mb-2">{info.value}</p>
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-brand font-bold text-sm hover:underline inline-flex items-center gap-2"
                  >
                    {info.label}
                    <i className="fas fa-arrow-right text-[10px]" aria-hidden="true"></i>
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
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-line shadow-2xl space-y-6"
              aria-label="Formulário de contato"
              noValidate
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-bold uppercase tracking-widest text-content-secondary">
                    Nome Completo <span className="text-brand">*</span>
                  </label>
                  <div className="relative group">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-content-muted group-focus-within:text-brand transition-colors" aria-hidden="true"></i>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!fieldErrors.nome}
                      aria-describedby={fieldErrors.nome ? 'nome-error' : undefined}
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-xl bg-surface-inset border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 placeholder:text-content-muted",
                        fieldErrors.nome ? "border-err/50" : "border-line focus:border-brand/50"
                      )}
                      placeholder="Seu nome"
                    />
                  </div>
                  <AnimatePresence>
                    {fieldErrors.nome && (
                      <motion.p
                        id="nome-error"
                        role="alert"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-err font-medium"
                      >
                        {fieldErrors.nome}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-content-secondary">
                    Email <span className="text-brand">*</span>
                  </label>
                  <div className="relative group">
                    <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-content-muted group-focus-within:text-brand transition-colors" aria-hidden="true"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-xl bg-surface-inset border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 placeholder:text-content-muted",
                        fieldErrors.email ? "border-err/50" : "border-line focus:border-brand/50"
                      )}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <AnimatePresence>
                    {fieldErrors.email && (
                      <motion.p
                        id="email-error"
                        role="alert"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-err font-medium"
                      >
                        {fieldErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-sm font-bold uppercase tracking-widest text-content-secondary">
                    Mensagem <span className="text-brand">*</span>
                  </label>
                  <div className="relative group">
                    <i className="fas fa-comment-alt absolute left-4 top-5 text-content-muted group-focus-within:text-brand transition-colors" aria-hidden="true"></i>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      required
                      value={formData.mensagem}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      aria-invalid={!!fieldErrors.mensagem}
                      aria-describedby={fieldErrors.mensagem ? 'mensagem-error' : undefined}
                      className={cn(
                        "w-full pl-12 pr-4 py-4 rounded-xl bg-surface-inset border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 resize-none placeholder:text-content-muted",
                        fieldErrors.mensagem ? "border-err/50" : "border-line focus:border-brand/50"
                      )}
                      placeholder="Como posso ajudar?"
                    />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] uppercase font-bold text-content-muted tracking-tighter">
                      {formData.mensagem.length} / 2000
                    </span>
                    {fieldErrors.mensagem && (
                      <span id="mensagem-error" role="alert" className="text-xs text-err font-medium">
                        {fieldErrors.mensagem}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-brand/5 border border-brand/10">
                <input
                  type="checkbox"
                  id="privacy-check"
                  required
                  className="mt-1 accent-brand"
                />
                <label
                  htmlFor="privacy-check"
                  className="text-xs text-content-secondary leading-relaxed"
                >
                  Concordo com a{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-brand font-bold hover:underline focus-visible:ring-2 focus-visible:ring-brand/40 rounded"
                  >
                    Política de Privacidade
                  </Link>{' '}
                  e autorizo o processamento dos meus dados para este contato.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isBlocked}
                className="w-full py-4 px-8 rounded-xl bg-brand text-content-on-brand font-bold text-lg hover:shadow-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden relative group focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <i className="fas fa-circle-notch" aria-hidden="true"></i>
                  </motion.div>
                ) : (
                  <>
                    <i className="fas fa-paper-plane text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true"></i>
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
