"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import Image from "next/image"
import I18nProvider from "@/components/I18nProvider"

interface PartnerItem {
  id: string
  name: string
  logo: string
}

interface PartnersContent {
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  items: PartnerItem[]
}

// Default fallback content
const defaultPartnersContent: PartnersContent = {
  title: { en: "Our Partners", ar: "شركاؤنا" },
  description: {
    en: "We collaborate with industry leaders to deliver exceptional chemical solutions and drive innovation in various sectors.",
    ar: "نتعاون مع الشركات الرائدة في الصناعة لتقديم حلول كيميائية استثنائية ودفع الابتكار في مختلف القطاعات.",
  },
  items: [
    {
      id: "1",
      name: "Partner 1",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Jatjj6qpZgwhdx9Q9SkiUnL7GrEfjk.svg",
    },
    {
      id: "2",
      name: "Partner 2",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-iI0WS0PBkZiCixHcfUnGBduTFJCEVZ.svg",
    },
  ],
}

// Helper function to safely merge content with defaults
const mergeWithDefaults = (fetchedContent: any): PartnersContent => {
  return {
    title: {
      en: fetchedContent?.title?.en || defaultPartnersContent.title.en,
      ar: fetchedContent?.title?.ar || defaultPartnersContent.title.ar,
    },
    description: {
      en: fetchedContent?.description?.en || defaultPartnersContent.description.en,
      ar: fetchedContent?.description?.ar || defaultPartnersContent.description.ar,
    },
    items: Array.isArray(fetchedContent?.items)
      ? fetchedContent.items.map((item: any, index: number) => ({
          id: item?.id || `partner-${index}`,
          name: item?.name || `Partner ${index + 1}`,
          logo: item?.logo || "/placeholder.svg",
        }))
      : defaultPartnersContent.items,
  }
}

function PartnersContent() {
  const { i18n } = useTranslation()
  const [partnersContent, setPartnersContent] = useState<PartnersContent>(defaultPartnersContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPartnersContent = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "homeContent", "main")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data?.partners) {
            const mergedContent = mergeWithDefaults(data.partners)
            setPartnersContent(mergedContent)
          }
        } else {
          console.log("No homeContent document found, using default content")
        }
      } catch (error) {
        console.error("Error fetching partners content:", error)
        // Continue using default content
      } finally {
        setLoading(false)
      }
    }

    fetchPartnersContent()
  }, [])

  const getCurrentLanguage = (): "en" | "ar" => {
    const lang = i18n.language || "en"
    return lang === "ar" ? "ar" : "en"
  }

  // Additional safety check for partners items
  const safeGetPartners = () => {
    return Array.isArray(partnersContent?.items) ? partnersContent.items : defaultPartnersContent.items
  }

  return (
    <section id="partners" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {partnersContent?.title?.[getCurrentLanguage()] || "Our Partners"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-r from-white dark:from-gray-800 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-l from-white dark:from-gray-800 to-transparent"></div>

          {/* Scrolling container */}
          <div className="flex space-x-12 partners-scroll whitespace-nowrap py-8">
            {/* First set of partners */}
            {safeGetPartners().map((partner, index) => (
              <div key={`first-${index}`} className="flex-none">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name || `Partner ${index + 1}`}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {safeGetPartners().map((partner, index) => (
              <div key={`second-${index}`} className="flex-none">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name || `Partner ${index + 1}`}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {partnersContent?.description?.[getCurrentLanguage()] || ""}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Partners() {
  return (
    <I18nProvider>
      <PartnersContent />
    </I18nProvider>
  )
}
