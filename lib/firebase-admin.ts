import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getDatabase, type Database } from 'firebase-admin/database'

let database: Database | undefined

function getFirebaseAdminDatabase(): Database {
  if (database) return database

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const databaseURL = process.env.FIREBASE_DATABASE_URL

  if (!projectId || !clientEmail || !privateKey || !databaseURL) {
    throw new Error(
      'Firebase Admin não está configurado. Defina FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY e FIREBASE_DATABASE_URL.'
    )
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      databaseURL,
    })

  database = getDatabase(app)
  return database
}

export async function incrementVisitCount(): Promise<number> {
  const result = await getFirebaseAdminDatabase().ref('visitCount').transaction((currentValue) => {
    const currentCount =
      typeof currentValue === 'number' && Number.isFinite(currentValue) ? currentValue : 0

    return currentCount + 1
  })

  if (!result.committed) {
    throw new Error('A transação do contador de visitas não foi confirmada.')
  }

  const value = result.snapshot.val()
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error('O contador de visitas retornou um valor inválido.')
  }

  return value
}
