import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAeILZIvHMhKO51ij2MKLKGM1gTeGwNUPU",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "amoun-bc9c4.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "amoun-bc9c4",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "amoun-bc9c4.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "562778794276",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:562778794276:web:28ac03027e30c1c1e06bb1",
  measurementId: "G-62PL0M946W",
}

// Initialize Firebase
let app: any
let db: any
let auth: any
let analytics: any

if (typeof window !== "undefined") {
  // Client-side initialization
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)

    // Initialize Analytics only on client-side
    analytics = getAnalytics(app)
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
} else {
  // Server-side - create minimal exports to prevent errors
  app = null
  db = null
  auth = null
  analytics = null
}

export { db, analytics, auth }
