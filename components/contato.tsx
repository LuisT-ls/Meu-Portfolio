'use client'

import { useState, FormEvent } from 'react'
import { sendEmail, type ContactFormData } from '@/lib/emailjs'
import Link from 'next/link'

export function Contato() {
  const [formData, setFormData] = useState<ContactFormData>({
    nome: '',
    email: '',
    mensagem: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | null
  }>({ message: '', type: null })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.nome.trim() || formData.nome.length < 2) {
      setNotification({
        message: 'Por favor, digite um nome válido (mínimo 2 caracteres)',
        type: 'error',
      })
      return false
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setNotification({
        message: 'Por favor, digite um email válido',
        type: 'error',
      })
      return false
    }

    if (!formData.mensagem.trim() || formData.mensagem.length < 10) {
      setNotification({
        message: 'Por favor, digite uma mensagem válida (mínimo 10 caracteres)',
        type: 'error',
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      setTimeout(() => setNotification({ message: '', type: null }), 5000)
      return
    }

    setIsSubmitting(true)
    setNotification({ message: '', type: null })

    try {
      await sendEmail(formData)
      setNotification({
        message: 'Mensagem enviada com sucesso! Logo entrarei em contato.',
        type: 'success',
      })
      setFormData({ nome: '', email: '', mensagem: '' })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setNotification({
        message:
          'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setNotification({ message: '', type: null }), 5000)
    }
  }

  return (
    <section
      id="contato"
      className="section-contato section-padding py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2 className="section-title text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Entre em Contato
        </h2>
        <div className="contato-wrapper grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="contato-info space-y-6">
            <div className="info-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <i className="fas fa-envelope text-3xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                luisps4.lt@gmail.com
              </p>
              <a
                href="mailto:luisps4.lt@gmail.com"
                className="btn-contato inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Enviar Email
              </a>
            </div>
            <div className="info-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <i className="fab fa-whatsapp text-3xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                WhatsApp
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                +55 (71) 99332-2305
              </p>
              <a
                href="https://wa.link/u8h8e6"
                target="_blank"
                rel="noopener"
                className="btn-contato inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Enviar Mensagem
              </a>
            </div>
            <div className="info-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <i className="fab fa-linkedin text-3xl text-primary mb-4"></i>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                LinkedIn
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">luis-tei</p>
              <a
                href="https://www.linkedin.com/in/luis-tei"
                target="_blank"
                rel="noopener"
                className="btn-contato inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Conectar
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contato-form bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="form-header mb-6">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Envie uma Mensagem
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Responderei o mais breve possível!
              </p>
            </div>

            {notification.type && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  notification.type === 'success'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}
              >
                {notification.message}
              </div>
            )}

            <div className="form-group mb-4">
              <label
                htmlFor="nome"
                className="block mb-2 text-gray-700 dark:text-gray-300"
              >
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <div className="input-group relative">
                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  minLength={2}
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-gray-700 dark:text-gray-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <div className="input-group relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="mensagem"
                className="block mb-2 text-gray-700 dark:text-gray-300"
              >
                Mensagem <span className="text-red-500">*</span>
              </label>
              <div className="input-group relative">
                <i className="fas fa-comment-alt absolute left-3 top-3 text-gray-400"></i>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  minLength={10}
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={5}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Digite sua mensagem aqui..."
                />
              </div>
              <small className="text-gray-500 dark:text-gray-400 text-sm mt-1 block">
                {formData.mensagem.length} / 10-1000 caracteres
              </small>
            </div>

            <div className="form-group mb-6">
              <div className="form-check flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy-check"
                  required
                  className="mt-1"
                />
                <label
                  htmlFor="privacy-check"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  Concordo com a{' '}
                  <Link
                    href="/privacy-policy/privacy-policy.html"
                    className="text-primary hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Enviar Mensagem
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

