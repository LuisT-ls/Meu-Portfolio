import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database } from 'firebase/database'
import { getAnalytics, type Analytics } from 'firebase/analytics'

// Carrega credenciais de variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Validação das variáveis de ambiente (apenas em runtime, não durante build)
const validateFirebaseConfig = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  ] as const

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  )

  if (missingVars.length > 0) {
    console.warn(
      `Firebase configuration is missing: ${missingVars.join(', ')}. Please check your environment variables.`
    )
    return false
  }

  return true
}

let app: FirebaseApp | undefined
let database: Database | undefined
let analytics: Analytics | undefined

export const getFirebaseApp = (): FirebaseApp => {
  if (!validateFirebaseConfig()) {
    throw new Error(
      'Firebase não está configurado corretamente. Verifique as variáveis de ambiente.'
    )
  }

  if (!app) {
    const existingApps = getApps()
    app = existingApps.length === 0 ? initializeApp(firebaseConfig) : existingApps[0]
  }
  
  if (!app) {
    throw new Error('Falha ao inicializar Firebase')
  }
  
  return app
}

export const getFirebaseDatabase = (): Database => {
  if (!database) {
    const firebaseApp = getFirebaseApp()
    database = getDatabase(firebaseApp)
  }
  return database
}

export const getFirebaseAnalytics = (): Analytics | undefined => {
  if (typeof window === 'undefined') return undefined
  
  if (!analytics) {
    try {
      const firebaseApp = getFirebaseApp()
      analytics = getAnalytics(firebaseApp)
    } catch (error) {
      console.warn('Erro ao inicializar Analytics:', error)
    }
  }
  return analytics
}

