'use client'

import { useState, useCallback, useEffect } from 'react'

interface RateLimitState {
  attempts: number
  resetTime: number | null
  isBlocked: boolean
}

const MAX_SUBMISSIONS = 3 // Máximo de 3 tentativas
const TIME_WINDOW = 60000 // 1 minuto em milissegundos
const STORAGE_KEY = 'contact-form-rate-limit'

/**
 * Hook para implementar rate limiting no formulário de contato
 * Previne abuso e spam
 */
export function useRateLimit() {
  const [rateLimitState, setRateLimitState] = useState<RateLimitState>(() => {
    if (typeof window === 'undefined') {
      return { attempts: 0, resetTime: null, isBlocked: false }
    }

    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as RateLimitState
        const now = Date.now()

        // Se o tempo de reset passou, resetar
        if (parsed.resetTime && now > parsed.resetTime) {
          sessionStorage.removeItem(STORAGE_KEY)
          return { attempts: 0, resetTime: null, isBlocked: false }
        }

        return parsed
      }
    } catch (error) {
      console.warn('Erro ao ler rate limit do sessionStorage:', error)
    }

    return { attempts: 0, resetTime: null, isBlocked: false }
  })

  // Limpar rate limit quando o tempo expirar
  useEffect(() => {
    if (rateLimitState.resetTime && rateLimitState.isBlocked) {
      const timeUntilReset = rateLimitState.resetTime - Date.now()

      if (timeUntilReset > 0) {
        const timer = setTimeout(() => {
          setRateLimitState({ attempts: 0, resetTime: null, isBlocked: false })
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem(STORAGE_KEY)
          }
        }, timeUntilReset)

        return () => clearTimeout(timer)
      }
    }
    return undefined
  }, [rateLimitState.resetTime, rateLimitState.isBlocked])

  const recordAttempt = useCallback(() => {
    const now = Date.now()
    const newAttempts = rateLimitState.attempts + 1
    const isBlocked = newAttempts >= MAX_SUBMISSIONS
    const resetTime = isBlocked ? now + TIME_WINDOW : null

    const newState: RateLimitState = {
      attempts: newAttempts,
      resetTime,
      isBlocked,
    }

    setRateLimitState(newState)

    // Salvar no sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      } catch (error) {
        console.warn('Erro ao salvar rate limit no sessionStorage:', error)
      }
    }

    return !isBlocked
  }, [rateLimitState.attempts])

  const reset = useCallback(() => {
    setRateLimitState({ attempts: 0, resetTime: null, isBlocked: false })
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const getTimeUntilReset = useCallback((): number => {
    if (!rateLimitState.resetTime) return 0
    const remaining = rateLimitState.resetTime - Date.now()
    return Math.max(0, Math.ceil(remaining / 1000)) // Retorna em segundos
  }, [rateLimitState.resetTime])

  return {
    isBlocked: rateLimitState.isBlocked,
    attempts: rateLimitState.attempts,
    remainingAttempts: Math.max(0, MAX_SUBMISSIONS - rateLimitState.attempts),
    recordAttempt,
    reset,
    getTimeUntilReset,
  }
}
