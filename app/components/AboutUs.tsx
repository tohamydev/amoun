"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import I18nProvider from "@/components/I18nProvider"

interface AboutContent {
  title: { en: string; ar: string }
  mission: {
    title: { en: string; ar: string }
    description: { en: string; ar: string }
  }
  values: {
    title: { en: string; ar: string }
    items: { en: string[]; ar: string[] }
  }
  experience: { en: string; ar: string }
}

// Default fallback content
const defaultAboutContent: AboutContent = {
  title: { en: "About Us", ar: "من نحن" },
  mission: {
    title: { en: "Our Mission", ar: "مهمتنا" },
    description: {
      en: "At Amoun Chemicals, we strive to provide innovative and sustainable chemical solutions to meet the evolving needs of industries worldwide. Our mission is to contribute to the growth and success of our clients through high-quality products and exceptional service.",
      ar: "في أمون للكيماويات، نسعى جاهدين لتقديم حلول كيميائية مبتكرة ومستدامة لتلبية الاحتياجات المتطورة للصناعات في جميع أنحاء العالم. مهمتنا هي المساهمة في نمو ونجاح عملائنا من خلال المنتجات عالية الجودة والخدمة الاستثنائية.",
    },
  },
  values: {
    title: { en: "Our Values", ar: "قيمنا" },
    items: {
      en: [
        "Commitment to quality and safety",
        "Innovation and continuous improvement",
        "Environmental responsibility",
        "Customer-centric approach",
        "Integrity and transparency",
      ],
      ar: [
        "الالتزام بالجودة والسلامة",
        "الابتكار والتحسين المستمر",
        "المسؤولية البيئية",
        "نهج يركز على العملاء",
        "النزاهة والشفافية",
      ],
    },
  },
  experience: {
    en: "With over 20 years of experience in the chemical industry, Amoun Chemicals has established itself as a leader in providing cutting-edge solutions to diverse sectors, including pharmaceuticals, agriculture, and manufacturing.",
    ar: "مع أكثر من 20 عامًا من الخبرة في صناعة الكيماويات، رسخت أمون للكيماويات نفسها كشركة رائدة في تقديم الحلول المتطورة لقطاعات متنوعة، بما في ذلك الأدوية والزراعة والتصنيع.",
  },
}

// Helper function to safely merge content with defaults
const mergeWithDefaults = (fetchedContent: any): AboutContent => {
  return {
    title: {
      en: fetchedContent?.title?.en || defaultAboutContent.title.en,
      ar: fetchedContent?.title?.ar || defaultAboutContent.title.ar,
    },
    mission: {
      title: {
        en: fetchedContent?.mission?.title?.en || defaultAboutContent.mission.title.en,
        ar: fetchedContent?.mission?.title?.ar || defaultAboutContent.mission.title.ar,
      },
      description: {
        en: fetchedContent?.mission?.description?.en || defaultAboutContent.mission.description.en,
        ar: fetchedContent?.mission?.description?.ar || defaultAboutContent.mission.description.ar,
      },
    },
    values: {
      title: {
        en: fetchedContent?.values?.title?.en || defaultAboutContent.values.title.en,
        ar: fetchedContent?.values?.title?.ar || defaultAboutContent.values.title.ar,
      },
      items: {
        en: Array.isArray(fetchedContent?.values?.items?.en)
          ? fetchedContent.values.items.en
          : defaultAboutContent.values.items.en,
        ar: Array.isArray(fetchedContent?.values?.items?.ar)
          ? fetchedContent.values.items.ar
          : defaultAboutContent.values.items.ar,
      },
    },
    experience: {
      en: fetchedContent?.experience?.en || defaultAboutContent.experience.en,
      ar: fetchedContent?.experience?.ar || defaultAboutContent.experience.ar,
    },
  }
}

function AboutUsContent() {
  const { i18n } = useTranslation()
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "homeContent", "main")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data?.about) {
            const mergedContent = mergeWithDefaults(data.about)
            setAboutContent(mergedContent)
          }
        } else {
          console.log("No homeContent document found, using default content")
        }
      } catch (error) {
        console.error("Error fetching about content:", error)
        // Continue using default content
      } finally {
        setLoading(false)
      }
    }

    fetchAboutContent()
  }, [])

  const getCurrentLanguage = (): "en" | "ar" => {
    const lang = i18n.language || "en"
    return lang === "ar" ? "ar" : "en"
  }

  // Additional safety check
  const safeGetValues = () => {
    const currentLang = getCurrentLanguage()
    const values = aboutContent?.values?.items?.[currentLang]
    return Array.isArray(values) ? values : defaultAboutContent.values.items[currentLang]
  }

  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {aboutContent?.title?.[getCurrentLanguage()] || "About Us"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {aboutContent?.mission?.title?.[getCurrentLanguage()] || "Our Mission"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {aboutContent?.mission?.description?.[getCurrentLanguage()] || ""}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {aboutContent?.values?.title?.[getCurrentLanguage()] || "Our Values"}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {safeGetValues().map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {aboutContent?.experience?.[getCurrentLanguage()] || ""}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function AboutUs() {
  return (
    <I18nProvider>
      <AboutUsContent />
    </I18nProvider>
  )
}
