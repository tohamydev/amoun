import Link from 'next/link'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'

interface Category {
  id: number
  name: string
  image: string
  slug: string
}

async function getCategories(): Promise<Category[]> {
  const dataFilePath = path.join(process.cwd(), 'data', 'data.json')
  const jsonData = await fs.readFile(dataFilePath, 'utf-8')
  const data = JSON.parse(jsonData)
  return data.categories
}

export default async function ProductsPage() {
  const categories = await getCategories()

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Products</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
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
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center group-hover:text-blue-600">
                    {category.name}
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

