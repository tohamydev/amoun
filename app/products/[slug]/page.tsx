import Link from 'next/link'
import Image from 'next/image'
import { WhatsappIcon } from '@/components/whatsapp-icon'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
}

async function getProductsByCategory(category: string): Promise<Product[]> {
  const productsRef = collection(db, 'products')
  const q = query(productsRef, where('category', '==', category))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
}

async function getCategoryName(slug: string): Promise<string> {
  const categoriesRef = collection(db, 'categories')
  const q = query(categoriesRef, where('slug', '==', slug))
  const querySnapshot = await getDocs(q)
  const category = querySnapshot.docs[0]?.data()
  return category?.name || 'Products'
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [products, categoryName] = await Promise.all([
    getProductsByCategory(params.slug),
    getCategoryName(params.slug)
  ])

  const createEmailLink = (product: Product) => {
    const subject = encodeURIComponent('Product Inquiry')
    const body = encodeURIComponent(`I would like more details about the following product:
- Product Name: ${product.name}
- Category: ${categoryName}`)
    return `mailto:info@amounchemicals.com?subject=${subject}&body=${body}`
  }

  const createWhatsAppLink = (product: Product) => {
    const message = encodeURIComponent(`I would like more details about the following product:
- Product Name: ${product.name}
- Category: ${categoryName}`)
    return `https://wa.me/201004724510?text=${message}`
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{categoryName}</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        {products.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No products available in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                  <div className="flex flex-col space-y-2">
                    <a
                      href={createEmailLink(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-500 transition duration-300"
                    >
                      Email Inquiry
                    </a>
                    <a
                      href={createWhatsAppLink(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-center hover:bg-green-500 transition duration-300"
                    >
                      WhatsApp Inquiry
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

