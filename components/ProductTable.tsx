"use client"

import { useState } from "react"
import { Trash2, EyeOff, Eye, Pencil, FileText, ExternalLink, Search, Filter } from "lucide-react"
import { useTranslation } from "react-i18next"

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
  hidden?: boolean
  pdfUrl?: string
  pdfType?: "upload" | "link"
}

interface ProductTableProps {
  products: Product[]
  onDelete: (id: string) => void
  onToggleVisibility: (id: string) => void
  onEdit: (product: Product) => void
}

export default function ProductTable({ products, onDelete, onToggleVisibility, onEdit }: ProductTableProps) {
  const [visibleProducts, setVisibleProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { i18n } = useTranslation()

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(id)
      setVisibleProducts(visibleProducts.filter((product) => product.id !== id))
    }
  }

  const handleToggleVisibility = (id: string) => {
    onToggleVisibility(id)
    setVisibleProducts(
      visibleProducts.map((product) => (product.id === id ? { ...product, hidden: !product.hidden } : product)),
    )
  }

  const getCurrentLanguage = () => i18n.language || "en"

  const getProductText = (product: Product, field: "name" | "description") => {
    const currentLang = getCurrentLanguage()
    const fieldData = product[field]

    if (!fieldData) return "N/A"

    return fieldData[currentLang as keyof typeof fieldData] || fieldData.en || fieldData.ar || "N/A"
  }

  const filteredProducts = visibleProducts.filter((product) => {
    const matchesSearch =
      getProductText(product, "name").toLowerCase().includes(searchTerm.toLowerCase()) ||
      getProductText(product, "description").toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !categoryFilter || product.category === categoryFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "visible" && !product.hidden) ||
      (statusFilter === "hidden" && product.hidden)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const uniqueCategories = [...new Set(products.map((p) => p.category))].filter(Boolean)

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Product</th>
                <th className="px-6 py-4 text-left font-semibold">Category</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
                <th className="px-6 py-4 text-center font-semibold">PDF</th>
                <th className="px-6 py-4 text-center font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-750"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={getProductText(product, "name")}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/diverse-products-still-life.png"
                        }}
                      />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {getProductText(product, "name")}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {product.id.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {product.category || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group max-w-xs">
                      <p className="text-gray-800 dark:text-gray-200 truncate">
                        {getProductText(product, "description").substring(0, 60)}...
                      </p>
                      <div className="absolute z-20 invisible group-hover:visible bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 w-80 top-0 left-0">
                        <div className="space-y-2">
                          <div>
                            <strong className="text-blue-600 dark:text-blue-400">English:</strong>
                            <p className="text-sm mt-1">{product.description?.en || "N/A"}</p>
                          </div>
                          <div>
                            <strong className="text-blue-600 dark:text-blue-400">Arabic:</strong>
                            <p className="text-sm mt-1" dir="rtl">
                              {product.description?.ar || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {product.pdfUrl ? (
                      <a
                        href={product.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200 transition-colors"
                        title="View PDF"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {product.pdfType === "upload" ? "File" : "Link"}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        <FileText className="w-3 h-3 mr-1" />
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.hidden
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {product.hidden ? "Hidden" : "Visible"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(product.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          product.hidden
                            ? "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                            : "text-orange-600 hover:text-orange-800 hover:bg-orange-50"
                        }`}
                        title={product.hidden ? "Show Product" : "Hide Product"}
                      >
                        {product.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
