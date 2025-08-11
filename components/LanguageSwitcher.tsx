"use client"

import { useTranslation } from "react-i18next"
import { Languages } from "lucide-react"
import { useEffect } from "react"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const currentLang = i18n.language || "en"
    if (currentLang === "ar") {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.lang = "en"
    }
  }, [i18n.language])

  const toggleLanguage = () => {
    const currentLang = i18n.language || "en"
    const newLang = currentLang === "en" ? "ar" : "en"
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle language"
    >
      <Languages className="h-5 w-5" />
      <span>{(i18n.language || "en").toUpperCase()}</span>
    </button>
  )
}
