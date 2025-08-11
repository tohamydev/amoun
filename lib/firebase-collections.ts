import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

// Type definitions for new collections
export interface SiteSettings {
  siteName: { en: string; ar: string }
  tagline: { en: string; ar: string }
  lastUpdated: string
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  address: { en: string; ar: string }
  workingHours: { en: string; ar: string }
  lastUpdated: string
}

export interface SocialMedia {
  facebook: string
  instagram: string
  linkedin: string
  twitter: string
  youtube: string
  lastUpdated: string
}

export interface PartnerLogo {
  id: string
  name: string
  logo: string
  url: string
}

export interface Logos {
  mainLogo: string
  darkLogo: string
  favicon: string
  partnerLogos: PartnerLogo[]
  lastUpdated: string
}

// Site Settings functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const docRef = doc(db, "siteSettings", "main")
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? (docSnap.data() as SiteSettings) : null
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<boolean> {
  try {
    const docRef = doc(db, "siteSettings", "main")
    await setDoc(docRef, { ...settings, lastUpdated: new Date().toISOString() })
    return true
  } catch (error) {
    console.error("Error saving site settings:", error)
    return false
  }
}

// Contact Info functions
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const docRef = doc(db, "contactInfo", "main")
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? (docSnap.data() as ContactInfo) : null
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return null
  }
}

export async function saveContactInfo(contactInfo: ContactInfo): Promise<boolean> {
  try {
    const docRef = doc(db, "contactInfo", "main")
    await setDoc(docRef, { ...contactInfo, lastUpdated: new Date().toISOString() })
    return true
  } catch (error) {
    console.error("Error saving contact info:", error)
    return false
  }
}

// Social Media functions
export async function getSocialMedia(): Promise<SocialMedia | null> {
  try {
    const docRef = doc(db, "socialMedia", "main")
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? (docSnap.data() as SocialMedia) : null
  } catch (error) {
    console.error("Error fetching social media:", error)
    return null
  }
}

export async function saveSocialMedia(socialMedia: SocialMedia): Promise<boolean> {
  try {
    const docRef = doc(db, "socialMedia", "main")
    await setDoc(docRef, { ...socialMedia, lastUpdated: new Date().toISOString() })
    return true
  } catch (error) {
    console.error("Error saving social media:", error)
    return false
  }
}

// Logos functions
export async function getLogos(): Promise<Logos | null> {
  try {
    const docRef = doc(db, "logos", "main")
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? (docSnap.data() as Logos) : null
  } catch (error) {
    console.error("Error fetching logos:", error)
    return null
  }
}

export async function saveLogos(logos: Logos): Promise<boolean> {
  try {
    const docRef = doc(db, "logos", "main")
    await setDoc(docRef, { ...logos, lastUpdated: new Date().toISOString() })
    return true
  } catch (error) {
    console.error("Error saving logos:", error)
    return false
  }
}
