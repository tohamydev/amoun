import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

export const defaultNS = 'common'
export const fallbackLng = 'en'
export const languages = ['en', 'ar']

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    languages,
    ns: ['common'],
    defaultNS,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })

export default i18n

