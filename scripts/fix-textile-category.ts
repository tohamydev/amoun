import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBKqKqBqKqBqKqBqKqBqKqBqKqBqKqBqKq",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "amoun-chemicals.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "amoun-chemicals",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "amoun-chemicals.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdefghijklmnop",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function fixTextileCategory() {
  try {
    console.log('🔍 Searching for products with category "textiledyes"...')

    // Find products with category "textiledyes"
    const productsQuery = query(collection(db, "products"), where("category", "==", "textiledyes"))

    const productsSnapshot = await getDocs(productsQuery)
    console.log(`📦 Found ${productsSnapshot.size} products with category "textiledyes"`)

    if (productsSnapshot.empty) {
      console.log('❌ No products found with category "textiledyes"')
      return
    }

    // Update each product's category to "textileauxillaries"
    const updatePromises = productsSnapshot.docs.map(async (productDoc) => {
      const productRef = doc(db, "products", productDoc.id)
      await updateDoc(productRef, {
        category: "textileauxillaries",
      })
      console.log(`✅ Updated product ${productDoc.id} category to "textileauxillaries"`)
    })

    await Promise.all(updatePromises)

    // Also check if we need to update/create the category document
    console.log("🔍 Checking categories collection...")
    const categoriesQuery = query(collection(db, "categories"), where("slug", "==", "textiledyes"))

    const categoriesSnapshot = await getDocs(categoriesQuery)

    if (!categoriesSnapshot.empty) {
      const categoryDoc = categoriesSnapshot.docs[0]
      const categoryRef = doc(db, "categories", categoryDoc.id)
      await updateDoc(categoryRef, {
        slug: "textileauxillaries",
      })
      console.log(`✅ Updated category slug to "textileauxillaries"`)
    }

    console.log("🎉 Successfully updated all textile category references!")
    console.log("Now /products/textileauxillaries should display the products correctly.")
  } catch (error) {
    console.error("❌ Error fixing textile category:", error)
  }
}

fixTextileCategory()
