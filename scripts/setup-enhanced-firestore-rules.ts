console.log("Enhanced Firestore Security Rules for Amoun Chemicals Admin Dashboard")
console.log("=================================================================")
console.log("")
console.log("Copy and paste these rules into your Firebase Console:")
console.log("Firebase Console → Firestore Database → Rules → Replace all content")
console.log("")
console.log("```")
console.log(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to all collections (needed for website visitors)
    // Allow write access only to authenticated users (admin dashboard)
    
    // Home page content
    match /homeContent/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Product categories
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Site settings (logos, social media, contact info)
    match /siteSettings/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Contact information
    match /contactInfo/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Social media links
    match /socialMedia/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Company logos
    match /logos/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`)
console.log("```")
console.log("")
console.log('After updating the rules, click "Publish" to apply changes.')
console.log("")
console.log("Database Collections Structure:")
console.log("==============================")
console.log("")
console.log("1. siteSettings/main - General site configuration")
console.log("2. contactInfo/main - Contact details and WhatsApp numbers")
console.log("3. socialMedia/main - Social media links")
console.log("4. logos/main - Company and partner logos")
console.log("")
console.log("Run this script completed successfully!")
