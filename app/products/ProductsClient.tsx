'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

interface Category {
  id: string
  name: { en: string; ar: string }
  image: string
  slug: string
}

export default function ProductsClient() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesSnapshot = await getDocs(collection(db, 'categories'))
        const fetchedCategories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category))
        setCategories(fetchedCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  const getCurrentLanguage = () => i18n.language || 'en'

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('products.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{t('products.description')}</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        {categories.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            {t('products.noCategories')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                  <div className="relative h-48">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={getCurrentLanguage() === 'en' ? category.name.en : category.name.ar}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center group-hover:text-blue-600">
                      {getCurrentLanguage() === 'en' ? category.name.en : category.name.ar}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

