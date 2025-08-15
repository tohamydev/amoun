"use client"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { getContactInfo, type ContactInfo } from "@/lib/firebase-collections"
import CategorySkeleton from "@/components/CategorySkeleton"
import { FileText, Download } from "lucide-react"

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
  pdfUrl?: string
  pdfType?: "upload" | "link"
}

interface CategoryClientProps {
  products: Product[]
  categoryName: { en: string; ar: string }
  slug: string
}

export default function CategoryClient({ products, categoryName, slug }: CategoryClientProps) {
  const { t, i18n } = useTranslation()
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] CategoryClient received props:")
    console.log("[v0] - slug:", slug)
    console.log("[v0] - categoryName:", categoryName)
    console.log("[v0] - products count:", products.length)
    console.log("[v0] - products data:", products)
  }, [products, categoryName, slug])

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await getContactInfo()
        setContactInfo(data)
      } catch (error) {
        console.error("Error loading contact info:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContactInfo()
  }, [])

  if (loading) {
    return <CategorySkeleton />
  }

  const getCurrentLanguage = () => i18n.language || "en"

  const createEmailLink = (product: Product) => {
    const subject = encodeURIComponent("Product Inquiry")
    const body = encodeURIComponent(`I would like more details about the following product:
- Product Name: ${product.name[getCurrentLanguage()]}
- Category: ${categoryName[getCurrentLanguage()]}`)
    const email = contactInfo?.email || "info@amounchemicals.com"
    return `mailto:${email}?subject=${subject}&body=${body}`
  }

  const createWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(`I would like more details about the following product:
- Product Name: ${product.name[getCurrentLanguage()]}
- Category: ${categoryName[getCurrentLanguage()]}`)
    const whatsappNumber = contactInfo?.whatsapp || "+201004724510"
    const cleanNumber = whatsappNumber.replace(/\D/g, "")
    return `https://wa.me/${cleanNumber}?text=${message}`
  }

  const handlePdfClick = (product: Product) => {
    if (product.pdfUrl) {
      if (product.pdfType === "upload") {
        // For uploaded files, open in new tab for viewing/downloading
        window.open(product.pdfUrl, "_blank")
      } else {
        // For external links, open directly
        window.open(product.pdfUrl, "_blank")
      }
    } else {
      // No PDF available, redirect to WhatsApp
      const message = encodeURIComponent(`I need the product details PDF for:
- Product Name: ${product.name[getCurrentLanguage()]}
- Category: ${categoryName[getCurrentLanguage()]}

Please provide the product specification document.`)
      const whatsappNumber = contactInfo?.whatsapp || "+201004724510"
      const cleanNumber = whatsappNumber.replace(/\D/g, "")
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank")
    }
  }

  return (
    <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>Products</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900 dark:text-white font-medium">{categoryName[getCurrentLanguage()]}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryName[getCurrentLanguage()]}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {t("products.categoryDescription", { category: categoryName[getCurrentLanguage()] })}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {t("products.noProductsInCategory")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">No products available in this category at the moment</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {products.length} {products.length === 1 ? "product" : "products"} found
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm">
                  <option>Relevance</option>
                  <option>Name A-Z</option>
                  <option>Name Z-A</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?height=200&width=300&query=chemical product"}
                      alt={product.name[getCurrentLanguage()]}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name[getCurrentLanguage()]}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                      {product.description[getCurrentLanguage()]}
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                    </div>

                    <div className="mb-3">
                      <button
                        onClick={() => handlePdfClick(product)}
                        className={`w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                          product.pdfUrl
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {product.pdfUrl ? (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Product Details PDF
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4 mr-2" />
                            Not Available - Contact Amoun
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex space-x-2 mt-auto">
                      <a
                        href={createEmailLink(product)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-center text-sm hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Email
                      </a>
                      <a
                        href={createWhatsAppLink(product)}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-center text-sm hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
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
