"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import {
  Beaker,
  Truck,
  FlaskRoundIcon as Flask,
  Settings,
  Wrench,
  Cog,
  Package,
  Shield,
  Zap,
  Globe,
} from "lucide-react"
import I18nProvider from "@/components/I18nProvider"

interface ServiceItem {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  icon: string
}

interface ServicesContent {
  title: { en: string; ar: string }
  items: ServiceItem[]
}

const iconMap = {
  Beaker,
  Truck,
  Flask,
  Settings,
  Wrench,
  Cog,
  Package,
  Shield,
  Zap,
  Globe,
}

// Default fallback content
const defaultServicesContent: ServicesContent = {
  title: { en: "Our Services", ar: "خدماتنا" },
  items: [
    {
      id: "1",
      title: { en: "Chemical Manufacturing", ar: "تصنيع المواد الكيميائية" },
      description: {
        en: "State-of-the-art facilities producing high-quality chemicals for various industries.",
        ar: "مرافق حديثة لإنتاج مواد كيميائية عالية الجودة لمختلف الصناعات.",
      },
      icon: "Beaker",
    },
    {
      id: "2",
      title: { en: "Supply Chain Solutions", ar: "حلول سلسلة التوريد" },
      description: {
        en: "Efficient and reliable distribution network ensuring timely delivery of products.",
        ar: "شبكة توزيع فعالة وموثوقة تضمن التسليم في الوقت المناسب للمنتجات.",
      },
      icon: "Truck",
    },
    {
      id: "3",
      title: { en: "Custom Formulations", ar: "تركيبات مخصصة" },
      description: {
        en: "Tailored chemical solutions to meet your specific requirements and challenges.",
        ar: "حلول كيميائية مخصصة لتلبية متطلباتك وتحدياتك المحددة.",
      },
      icon: "Flask",
    },
  ],
}

// Helper function to safely merge content with defaults
const mergeWithDefaults = (fetchedContent: any): ServicesContent => {
  return {
    title: {
      en: fetchedContent?.title?.en || defaultServicesContent.title.en,
      ar: fetchedContent?.title?.ar || defaultServicesContent.title.ar,
    },
    items: Array.isArray(fetchedContent?.items)
      ? fetchedContent.items.map((item: any, index: number) => ({
          id: item?.id || `service-${index}`,
          title: {
            en: item?.title?.en || `Service ${index + 1}`,
            ar: item?.title?.ar || `خدمة ${index + 1}`,
          },
          description: {
            en: item?.description?.en || "",
            ar: item?.description?.ar || "",
          },
          icon: item?.icon || "Settings",
        }))
      : defaultServicesContent.items,
  }
}

function ServicesContent() {
  const { i18n } = useTranslation()
  const [servicesContent, setServicesContent] = useState<ServicesContent>(defaultServicesContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServicesContent = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "homeContent", "main")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data?.services) {
            const mergedContent = mergeWithDefaults(data.services)
            setServicesContent(mergedContent)
          }
        } else {
          console.log("No homeContent document found, using default content")
        }
      } catch (error) {
        console.error("Error fetching services content:", error)
        // Continue using default content
      } finally {
        setLoading(false)
      }
    }

    fetchServicesContent()
  }, [])

  const getCurrentLanguage = (): "en" | "ar" => {
    const lang = i18n.language || "en"
    return lang === "ar" ? "ar" : "en"
  }

  // Additional safety check for services items
  const safeGetServices = () => {
    return Array.isArray(servicesContent?.items) ? servicesContent.items : defaultServicesContent.items
  }

  return (
    <section id="services" className="bg-gray-100 dark:bg-gray-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {servicesContent?.title?.[getCurrentLanguage()] || "Our Services"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {safeGetServices().map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Settings
            return (
              <div key={service.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <IconComponent className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {service?.title?.[getCurrentLanguage()] || "Service"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{service?.description?.[getCurrentLanguage()] || ""}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <I18nProvider>
      <ServicesContent />
    </I18nProvider>
  )
}
