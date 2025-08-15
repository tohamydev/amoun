"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import ProductsSkeleton from "@/components/ProductsSkeleton"
import { useTranslation } from "react-i18next"

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
        const categoriesSnapshot = await getDocs(collection(db, "categories"))
        const fetchedCategories = categoriesSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Category,
        )

        console.log("[v0] Fetched categories:", fetchedCategories)
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <ProductsSkeleton />
  }

  const getCurrentLanguage = () => i18n.language || "en"

  return (
    <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("products.title")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">{t("products.description")}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{t("products.noCategories")}</h3>
            <p className="text-gray-600 dark:text-gray-400">Check back later for new product categories</p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Premium Chemical Solutions</h2>
              <p className="text-blue-100 text-lg">
                Discover our comprehensive range of industrial and specialty chemicals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="group block transform transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg?height=200&width=300&query=chemical category"}
                        alt={getCurrentLanguage() === "en" ? category.name.en : category.name.ar}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {getCurrentLanguage() === "en" ? category.name.en : category.name.ar}
                      </h2>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>View Products</span>
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
