"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Inter, Noto_Kufi_Arabic } from "next/font/google"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

const inter = Inter({ subsets: ["latin"] })
const notoKufiArabic = Noto_Kufi_Arabic({ subsets: ["arabic"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Update document attributes when language changes
    if (mounted) {
      document.documentElement.lang = i18n.language
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
    }
  }, [i18n.language, mounted])

  if (!mounted) {
    return <LoadingSpinner />
  }

  const fontClass = i18n.language === "ar" ? notoKufiArabic.className : inter.className

  return (
    <div className={`${fontClass} bg-white text-gray-900`}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
      </ThemeProvider>
    </div>
  )
}
