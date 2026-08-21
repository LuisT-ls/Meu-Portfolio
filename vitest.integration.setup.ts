import { generateKeyPairSync } from 'node:crypto'

const { privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
})

process.env.FIRESTORE_EMULATOR_HOST ??= '127.0.0.1:8080'
process.env.FIREBASE_DATABASE_EMULATOR_HOST ??= '127.0.0.1:9000'
process.env.FIREBASE_PROJECT_ID ??= 'portfolio-contador'
process.env.FIREBASE_CLIENT_EMAIL ??= 'firebase-adminsdk-test@portfolio-contador.iam.gserviceaccount.com'
process.env.FIREBASE_PRIVATE_KEY ??= privateKey
process.env.FIREBASE_DATABASE_URL ??= 'https://portfolio-contador-default-rtdb.firebaseio.com'
process.env.APP_ORIGIN ??= 'http://localhost:3000'
process.env.CONTACT_EMAIL_TO ??= 'inbox@example.com'
process.env.FIREBASE_MAIL_COLLECTION ??= 'mail'
process.env.FIREBASE_RATE_LIMIT_COLLECTION ??= 'rateLimits'
