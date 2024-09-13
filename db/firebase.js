// db/firebase.js

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, increment, set, get } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpatN9LybGVo-Ix7TzR7cB_k4UzQILvnk',
  authDomain: 'meu-portfolio-3b23d.firebaseapp.com',
  projectId: 'meu-portfolio-3b23d',
  storageBucket: 'meu-portfolio-3b23d.appspot.com',
  messagingSenderId: '255638489313',
  appId: '1:255638489313:web:9e0306af11a7c1d50e4fa0',
  measurementId: 'G-M9VRE07F96',
  https://console.firebase.google.com/u/0/project/meu-portfolio-3b23d/database/meu-portfolio-3b23d-default-rtdb/data/~2F
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)

export async function registrarVisita() {
  const visitCountRef = ref(database, 'visitCount')
  try {
    await set(visitCountRef, increment(1))
    console.log('Visita registrada com sucesso')
  } catch (error) {
    console.error('Erro ao registrar visita:', error)
    throw error
  }
}

export async function getTotalVisitas() {
  const visitCountRef = ref(database, 'visitCount')
  try {
    const snapshot = await get(visitCountRef)
    return snapshot.val() || 0
  } catch (error) {
    console.error('Erro ao obter total de visitas:', error)
    throw error
  }
}

export { app, analytics }
