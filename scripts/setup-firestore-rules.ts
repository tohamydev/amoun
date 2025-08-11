// This script shows the Firestore security rules that need to be applied
// Copy these rules to your Firebase Console -> Firestore Database -> Rules

const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /homeContent/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow public read access to categories and products for website visitors
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`

console.log("🔥 IMPORTANT: Apply these Firestore Security Rules in your Firebase Console:")
console.log("1. Go to Firebase Console -> Firestore Database -> Rules")
console.log("2. Replace the existing rules with the rules below:")
console.log("3. Click 'Publish' to apply the changes")
console.log("\n" + "=".repeat(60))
console.log(firestoreRules)
console.log("=".repeat(60))
console.log("\n⚠️  NOTE: These rules allow public read access for your website content.")
console.log("Write access requires authentication for security.")

export { firestoreRules }
