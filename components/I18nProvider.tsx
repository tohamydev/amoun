"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { I18nextProvider } from "react-i18next"

interface I18nProviderProps {
  children: React.ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<any>(null)

  useEffect(() => {
    // Dynamically import i18n only on client side
    import("@/lib/i18n/config").then((module) => {
      setI18nInstance(module.default)
    })
  }, [])

  // Show loading only briefly, then render children even if i18n isn't ready
  if (!i18nInstance) {
    return <div style={{ opacity: 0 }}>{children}</div>
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
