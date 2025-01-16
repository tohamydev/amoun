'use client'

import { useEffect, useState } from 'react'
import i18n from '@/lib/i18n/config'

interface I18nProviderProps {
  children: React.ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    i18n.on('initialized', () => {
      setIsInitialized(true)
    })

    if (i18n.isInitialized) {
      setIsInitialized(true)
    }
  }, [])

  if (!isInitialized) {
    return null // or a loading spinner
  }

  return <>{children}</>
}

