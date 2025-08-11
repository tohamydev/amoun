import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

async function checkFirestorePermissions() {
  console.log("🔍 Checking Firestore permissions...")

  try {
    // Test read permission
    console.log("Testing read permission...")
    const docRef = doc(db, "homeContent", "main")
    const docSnap = await getDoc(docRef)
    console.log("✅ Read permission: OK")

    console.log("Testing write permission...")
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
    }

    try {
      await setDoc(docRef, testData, { merge: true })
      console.log("✅ Write permission: OK")
    } catch (writeError: any) {
      if (writeError.code === "permission-denied") {
        console.log("⚠️  Write permission: Requires authentication (this is expected)")
        console.log("   Public users can read content, but writing requires admin login")
      } else {
        throw writeError
      }
    }

    console.log("🎉 Permissions are configured correctly!")
  } catch (error: any) {
    console.error("❌ Permission check failed:", error)

    if (error.code === "permission-denied") {
      console.log("\n🔧 To fix this issue:")
      console.log("1. Go to Firebase Console -> Firestore Database -> Rules")
      console.log("2. Replace your current rules with:")
      console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /homeContent/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`)
      console.log('3. Click "Publish" to apply the changes')
    }
  }
}

checkFirestorePermissions()
