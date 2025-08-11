"use client"
import Image from "next/image"
import { useTranslation } from "react-i18next"

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
}

interface CategoryClientProps {
  products: Product[]
  categoryName: { en: string; ar: string }
  slug: string
}

export default function CategoryClient({ products, categoryName, slug }: CategoryClientProps) {
  const { t, i18n } = useTranslation()

  const getCurrentLanguage = () => i18n.language || "en"

  const createEmailLink = (product: Product) => {
    const subject = encodeURIComponent("Product Inquiry")
    const body = encodeURIComponent(`I would like more details about the following product:
- Product Name: ${product.name[getCurrentLanguage()]}
- Category: ${categoryName[getCurrentLanguage()]}`)
    return `mailto:info@amounchemicals.com?subject=${subject}&body=${body}`
  }

  const createWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(`I would like more details about the following product:
- Product Name: ${product.name[getCurrentLanguage()]}
- Category: ${categoryName[getCurrentLanguage()]}`)
    return `https://wa.me/201004724510?text=${message}`
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {categoryName[getCurrentLanguage()]}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t("products.categoryDescription", { category: categoryName[getCurrentLanguage()] })}
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        {products.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">{t("products.noProductsInCategory")}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name[getCurrentLanguage()]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {product.name[getCurrentLanguage()]}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description[getCurrentLanguage()]}</p>
                  <div className="flex flex-col space-y-2">
                    <a
                      href={createEmailLink(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-500 transition duration-300"
                    >
                      {t("products.emailInquiry")}
                    </a>
                    <a
                      href={createWhatsAppLink(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-500 transition duration-300"
                    >
                      {t("products.whatsappInquiry")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
