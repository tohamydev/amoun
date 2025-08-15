"use client"

import { useState } from "react"
import { Pencil, Trash2, Search, ExternalLink, Package } from "lucide-react"

interface Category {
  id: string
  name: {
    en: string
    ar: string
  }
  slug: string
  image: string
}

interface CategoryListProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter(
    (category) =>
      category.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.ar.includes(searchTerm) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string, categoryName: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${categoryName}"? This will also delete all associated products.`,
      )
    ) {
      onDelete(id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Package className="w-5 h-5 mr-2 text-blue-600" />
            Categories Management
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredCategories.length} of {categories.length} categories
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Slug</th>
                <th className="px-6 py-4 text-left font-semibold">Image</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-750"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{category.name.en}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400" dir="rtl">
                        {category.name.ar}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        ID: {category.id.substring(0, 8)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {category.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name.en}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                        onError={(e) => {
                          e.currentTarget.src = "/diverse-products-still-life.png"
                        }}
                      />
                      <a
                        href={category.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        title="View full image"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onEdit(category)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Category"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name.en)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">{searchTerm ? "No categories found" : "No categories yet"}</p>
                <p className="text-sm">
                  {searchTerm ? "Try adjusting your search criteria" : "Add your first category to get started"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
