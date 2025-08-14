"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import I18nProvider from "@/components/I18nProvider"
import HeroSkeleton from "@/components/HeroSkeleton"

interface HeroContent {
  title: { en: string; ar: string }
  subtitle: { en: string; ar: string }
  backgroundImage: string
}

// Default fallback content
const defaultHeroContent: HeroContent = {
  title: {
    en: "Make the Best Deal with Us",
    ar: "احصل على أفضل صفقة معنا",
  },
  subtitle: {
    en: "Your trusted partner in chemical solutions",
    ar: "شريكك الموثوق في الحلول الكيميائية",
  },
  backgroundImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg.jpg-u7eZt243hcDjppOlhhCsC3G6bocY03.jpeg",
}

// Helper function to safely merge content with defaults
const mergeWithDefaults = (fetchedContent: any): HeroContent => {
  return {
    title: {
      en: fetchedContent?.title?.en || defaultHeroContent.title.en,
      ar: fetchedContent?.title?.ar || defaultHeroContent.title.ar,
    },
    subtitle: {
      en: fetchedContent?.subtitle?.en || defaultHeroContent.subtitle.en,
      ar: fetchedContent?.subtitle?.ar || defaultHeroContent.subtitle.ar,
    },
    backgroundImage: fetchedContent?.backgroundImage || defaultHeroContent.backgroundImage,
  }
}

function HomeContent() {
  const { t, i18n } = useTranslation()
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent)
  const [loading, setLoading] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "homeContent", "main")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data?.hero) {
            const mergedContent = mergeWithDefaults(data.hero)
            setHeroContent(mergedContent)
          }
        } else {
          console.log("No homeContent document found, using default content")
        }
      } catch (error) {
        console.error("Error fetching hero content:", error)

        // Check if it's a permission error
        if (error instanceof Error && error.message.includes("Missing or insufficient permissions")) {
          console.warn("Firestore permission error - using default content. Please update Firestore security rules.")
        }

        // Always continue with default content - don't break the user experience
        setHeroContent(defaultHeroContent)
      } finally {
        setTimeout(() => {
          setLoading(false)
          setTimeout(() => setFadeIn(true), 100)
        }, 800)
      }
    }

    fetchHeroContent()
  }, [])

  const getCurrentLanguage = (): "en" | "ar" => {
    const lang = i18n.language || "en"
    return lang === "ar" ? "ar" : "en"
  }

  if (loading) {
    return <HeroSkeleton />
  }

  return (
    <section
      id="home"
      className={`relative bg-blue-600 dark:bg-blue-800 text-white transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-1000"
        style={{
          backgroundImage: `url('${heroContent?.backgroundImage || defaultHeroContent.backgroundImage}')`,
          filter: "brightness(0.6)",
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 transform transition-all duration-1000 delay-200 ${
              fadeIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {heroContent?.title?.[getCurrentLanguage()] || t("home.title")}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 transform transition-all duration-1000 delay-400 ${
              fadeIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {heroContent?.subtitle?.[getCurrentLanguage()] || t("home.subtitle")}
          </p>
          <div
            className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transform transition-all duration-1000 delay-600 ${
              fadeIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="/products"
              className="bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-300 text-center hover:scale-105 transform"
            >
              {t("home.exploreProducts")}
            </Link>
            <Link
              href="#contact"
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-400 transition duration-300 text-center hover:scale-105 transform"
              scroll={true}
            >
              {t("home.contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  )
}
