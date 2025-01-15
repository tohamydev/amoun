import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs/promises'
import path from 'path'

async function getProducts() {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const jsonData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(jsonData)
}

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = [...new Set(products.filter(p => p.isVisible).map(p => p.category))]

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Products</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/products/${category.toLowerCase().replace(/ /g, '-')}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt={category}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 text-center group-hover:text-blue-600">
                    {category}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

