import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

const firebaseConfig = {
  // Your Firebase config will be loaded from environment variables
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function initializeCollections() {
  console.log("Initializing database collections...")

  try {
    // Initialize site settings
    const siteSettingsRef = doc(db, "siteSettings", "main")
    const siteSettingsDoc = await getDoc(siteSettingsRef)

    if (!siteSettingsDoc.exists()) {
      await setDoc(siteSettingsRef, {
        siteName: {
          en: "Amoun Chemicals",
          ar: "أمون للكيماويات",
        },
        tagline: {
          en: "Leading Chemical Solutions Provider",
          ar: "مزود رائد للحلول الكيميائية",
        },
        lastUpdated: new Date().toISOString(),
      })
      console.log("✓ Site settings initialized")
    }

    // Initialize contact info
    const contactInfoRef = doc(db, "contactInfo", "main")
    const contactInfoDoc = await getDoc(contactInfoRef)

    if (!contactInfoDoc.exists()) {
      await setDoc(contactInfoRef, {
        phone: "+20 123 456 7890",
        whatsapp: "+20 123 456 7890",
        email: "info@amounchemicals.com",
        address: {
          en: "Cairo, Egypt",
          ar: "القاهرة، مصر",
        },
        workingHours: {
          en: "Sunday - Thursday: 9:00 AM - 6:00 PM",
          ar: "الأحد - الخميس: 9:00 ص - 6:00 م",
        },
        lastUpdated: new Date().toISOString(),
      })
      console.log("✓ Contact info initialized")
    }

    // Initialize social media
    const socialMediaRef = doc(db, "socialMedia", "main")
    const socialMediaDoc = await getDoc(socialMediaRef)

    if (!socialMediaDoc.exists()) {
      await setDoc(socialMediaRef, {
        facebook: "https://facebook.com/amounchemicals",
        instagram: "https://instagram.com/amounchemicals",
        linkedin: "https://linkedin.com/company/amounchemicals",
        twitter: "https://twitter.com/amounchemicals",
        youtube: "",
        lastUpdated: new Date().toISOString(),
      })
      console.log("✓ Social media links initialized")
    }

    // Initialize logos
    const logosRef = doc(db, "logos", "main")
    const logosDoc = await getDoc(logosRef)

    if (!logosDoc.exists()) {
      await setDoc(logosRef, {
        mainLogo: "/placeholder.svg?height=60&width=200&text=Amoun+Chemicals",
        darkLogo: "/placeholder.svg?height=60&width=200&text=Amoun+Chemicals+Dark",
        favicon: "/placeholder.svg?height=32&width=32&text=AC",
        partnerLogos: [
          {
            id: "1",
            name: "Partner 1",
            logo: "/placeholder.svg?height=80&width=120&text=Partner+1",
            url: "https://partner1.com",
          },
          {
            id: "2",
            name: "Partner 2",
            logo: "/placeholder.svg?height=80&width=120&text=Partner+2",
            url: "https://partner2.com",
          },
        ],
        lastUpdated: new Date().toISOString(),
      })
      console.log("✓ Logos initialized")
    }

    console.log("")
    console.log("🎉 All database collections initialized successfully!")
    console.log("")
    console.log("Collections created:")
    console.log("- siteSettings/main")
    console.log("- contactInfo/main")
    console.log("- socialMedia/main")
    console.log("- logos/main")
  } catch (error) {
    console.error("Error initializing collections:", error)
  }
}

initializeCollections()
