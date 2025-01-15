'use client'

import './globals.css'
import '@/app/styles/partners.css'
import { Inter } from 'next/font/google'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/components/whatsapp-button'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900`}>
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
      </body>
    </html>
  )
}

