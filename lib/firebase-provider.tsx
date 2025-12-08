'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getFirebaseDatabase, getFirebaseAnalytics } from './firebase'
import { ref, get, set, onValue } from 'firebase/database'

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
    // Inicializar Analytics
    getFirebaseAnalytics()

    // Verificar se esta visita já foi contada nesta sessão
    const sessionKey = 'visit_counted'
    const hasVisitBeenCounted = sessionStorage.getItem(sessionKey)

    const initializeVisitCounter = async () => {
      try {
        const database = getFirebaseDatabase()
        const visitsCountRef = ref(database, 'visitCount')

        if (!hasVisitBeenCounted) {
          try {
            // Obter valor atual
            const snapshot = await get(visitsCountRef)

            // Definir valor inicial ou incrementar
            let newCount = 1
            if (snapshot.exists()) {
              newCount = snapshot.val() + 1
            }

            // Atualizar o contador
            await set(visitsCountRef, newCount)

            // Marcar que a visita foi contada nesta sessão
            sessionStorage.setItem(sessionKey, 'true')

            console.log('Visita registrada com sucesso!')
          } catch (updateError) {
            console.warn('Erro ao incrementar contador:', updateError)
          }
        }

        // Configurar listener para atualizações em tempo real
        onValue(
          visitsCountRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const count = snapshot.val()
              setVisitCount(count)
            } else {
              console.log('Nenhum dado de visitas encontrado')
            }
            setIsLoading(false)
          },
          (error) => {
            console.error('Erro ao observar contador:', error)
            setIsLoading(false)

            // Fallback para contador local
            try {
              let localCount = parseInt(localStorage.getItem('localVisitCount') || '0', 10) + 1
              localStorage.setItem('localVisitCount', localCount.toString())
              setVisitCount(localCount)
            } catch (localError) {
              console.warn('Erro no contador local:', localError)
            }
          }
        )
      } catch (mainError) {
        // Fallback se o Firebase falhar completamente
        console.warn('Erro ao inicializar Firebase:', mainError)
        setIsLoading(false)

        // Mostrar contador local
        try {
          let localCount = parseInt(localStorage.getItem('localVisitCount') || '0', 10) + 1
          localStorage.setItem('localVisitCount', localCount.toString())
          setVisitCount(localCount)
        } catch (localError) {
          console.warn('Erro no contador local:', localError)
        }
      }
    }

    initializeVisitCounter()
  }, [])

  return (
    <FirebaseContext.Provider value={{ visitCount, isLoading }}>
      {children}
    </FirebaseContext.Provider>
  )
}

