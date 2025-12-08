import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database } from 'firebase/database'
import { getAnalytics, type Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCCnYZhLovinEZrDLHHIfmO-nM7tGrcq4c',
  authDomain: 'portfolio-contador.firebaseapp.com',
  databaseURL: 'https://portfolio-contador-default-rtdb.firebaseio.com',
  projectId: 'portfolio-contador',
  storageBucket: 'portfolio-contador.firebasestorage.app',
  messagingSenderId: '130162787302',
  appId: '1:130162787302:web:6c38db876d8fa3f59e4c27',
  measurementId: 'G-QS405DVJED',
}

let app: FirebaseApp | undefined
let database: Database | undefined
let analytics: Analytics | undefined

export const getFirebaseApp = (): FirebaseApp => {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
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

