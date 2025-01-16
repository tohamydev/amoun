'use client'

import { useState } from 'react'
import { Trash2, EyeOff, Eye, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
  hidden?: boolean
}

interface ProductTableProps {
  products: Product[]
  onDelete: (id: string) => void
  onToggleVisibility: (id: string) => void
  onEdit: (product: Product) => void
}

export default function ProductTable({ products, onDelete, onToggleVisibility, onEdit }: ProductTableProps) {
  const [visibleProducts, setVisibleProducts] = useState(products)
  const { i18n } = useTranslation()

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(id)
      setVisibleProducts(visibleProducts.filter(product => product.id !== id))
    }
  }

  const handleToggleVisibility = (id: string) => {
    onToggleVisibility(id)
    setVisibleProducts(visibleProducts.map(product =>
      product.id === id ? { ...product, hidden: !product.hidden } : product
    ))
  }

  const getCurrentLanguage = () => i18n.language || 'en'

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Category</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Description</th>
            <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleProducts.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                {product.name[getCurrentLanguage()]}
              </td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{product.category}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                <div className="relative group">
                  <p>{product.description[getCurrentLanguage()].substring(0, 50)}...</p>
                  <div className="absolute z-10 invisible group-hover:visible bg-white dark:bg-gray-800 p-2 rounded shadow-lg">
                    <p className="mb-2"><strong>English:</strong> {product.description.en}</p>
                    <p dir="rtl"><strong>Arabic:</strong> {product.description.ar}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800 mr-2"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => handleToggleVisibility(product.id)}
                  className={`${product.hidden ? 'text-gray-600 hover:text-gray-800' : 'text-blue-600 hover:text-blue-800'}`}
                  title={product.hidden ? 'Show' : 'Hide'}
                >
                  {product.hidden ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

