import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAeILZIvHMhKO51ij2MKLKGM1gTeGwNUPU",
  authDomain: "amoun-bc9c4.firebaseapp.com",
  projectId: "amoun-bc9c4",
  storageBucket: "amoun-bc9c4.firebasestorage.app",
  messagingSenderId: "562778794276",
  appId: "1:562778794276:web:28ac03027e30c1c1e06bb1",
  measurementId: "G-62PL0M946W"
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

// Initialize Analytics
let analytics
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { db, analytics, auth }

