'use client'

import './globals.css'
import '@/app/styles/partners.css'
import { Inter, Noto_Kufi_Arabic } from 'next/font/google'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import '../lib/i18n/config'
import { useTranslation } from 'react-i18next'
import I18nProvider from '@/components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })
const notoKufiArabic = Noto_Kufi_Arabic({ subsets: ['arabic'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const { i18n } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const fontClass = i18n.language === 'ar' ? notoKufiArabic.className : inter.className

  return (
    <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${fontClass} bg-white text-gray-900`}>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                  {children}
                </Suspense>
              </main>
              <Footer />
            </div>
            <WhatsAppButton />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

