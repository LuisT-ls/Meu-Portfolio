'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getFirebaseDatabase, getFirebaseAnalytics } from './firebase'
import { onValue, ref } from 'firebase/database'

interface FirebaseContextType {
  visitCount: number | null
  isLoading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  visitCount: null,
  isLoading: true,
})

export const useFirebase = () => useContext(FirebaseContext)

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [visitCount, setVisitCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    let unsubscribe: (() => void) | undefined

    // Inicializar Analytics
    getFirebaseAnalytics()

    // Verificar se esta visita já foi contada nesta sessão
    const sessionKey = 'visit_counted'
    const hasVisitBeenCounted = sessionStorage.getItem(sessionKey)

    const setLocalFallback = () => {
      if (cancelled) return

      try {
        const storedCount = Number.parseInt(localStorage.getItem('localVisitCount') || '0', 10)
        const localCount = Number.isFinite(storedCount) ? storedCount + 1 : 1
        localStorage.setItem('localVisitCount', localCount.toString())
        setVisitCount(localCount)
      } catch (localError) {
        console.warn('Erro no contador local:', localError)
      }
    }

    const initializeVisitCounter = async () => {
      try {
        if (!hasVisitBeenCounted) {
          try {
            const response = await fetch('/api/visit', {
              method: 'POST',
              headers: { Accept: 'application/json' },
              credentials: 'same-origin',
            })

            if (!response.ok) {
              throw new Error(`A API de visitas respondeu ${response.status}.`)
            }

            if (!cancelled) {
              sessionStorage.setItem(sessionKey, 'true')
            }

            console.log('Visita registrada com sucesso!')
          } catch (visitError) {
            console.warn('Erro ao registrar visita:', visitError)
          }
        }

        if (cancelled) return

        const database = getFirebaseDatabase()
        const visitsCountRef = ref(database, 'visitCount')

        // Configurar listener para atualizações em tempo real
        unsubscribe = onValue(
          visitsCountRef,
          (snapshot) => {
            if (cancelled) return

            if (snapshot.exists()) {
              const count = snapshot.val()
              setVisitCount(typeof count === 'number' && Number.isFinite(count) ? count : null)
            } else {
              setVisitCount(null)
            }
            setIsLoading(false)
          },
          (error) => {
            if (cancelled) return

            console.error('Erro ao observar contador:', error)
            setIsLoading(false)
            setLocalFallback()
          }
        )
      } catch (mainError) {
        // Fallback se o Firebase falhar completamente
        console.warn('Erro ao inicializar Firebase:', mainError)
        setIsLoading(false)
        setLocalFallback()
      }
    }

    void initializeVisitCounter()

    return () => {
      cancelled = true
      unsubscribe?.()
    }
  }, [])

  return (
    <FirebaseContext.Provider value={{ visitCount, isLoading }}>
      {children}
    </FirebaseContext.Provider>
  )
}
