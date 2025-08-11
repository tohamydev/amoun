import type React from "react"
import "./globals.css"
import "@/app/styles/partners.css"
import { Inter } from "next/font/google"
import I18nProvider from "@/components/I18nProvider"
import ClientLayout from "@/components/ClientLayout"
import "../lib/i18n/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Amoun Chemicals",
  description: "Leading chemical solutions provider",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProvider>
          <ClientLayout>{children}</ClientLayout>
        </I18nProvider>
      </body>
    </html>
  )
}
