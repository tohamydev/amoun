"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Popup from "./Popup"
import { Package, Globe, Link, ImageIcon } from "lucide-react"

interface Category {
  id: string
  name: {
    en: string
    ar: string
  }
  slug: string
  image: string
}

interface CategoryFormProps {
  category?: Category
  onSubmit: (category: Omit<Category, "id">) => void
  onCancel: () => void
  isOpen: boolean
}

export default function CategoryForm({ category, onSubmit, onCancel, isOpen }: CategoryFormProps) {
  const [nameEn, setNameEn] = useState(category?.name?.en || "")
  const [nameAr, setNameAr] = useState(category?.name?.ar || "")
  const [slug, setSlug] = useState(category?.slug || "")
  const [image, setImage] = useState(category?.image || "")

  useEffect(() => {
    if (category) {
      setNameEn(category.name.en)
      setNameAr(category.name.ar)
      setSlug(category.slug)
      setImage(category.image)
    } else {
      setNameEn("")
      setNameAr("")
      setSlug("")
      setImage("")
    }
  }, [category])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .replace(/^-+|-+$/g, "")
  }

  const handleNameEnChange = (value: string) => {
    setNameEn(value)
    if (!category) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nameEn.trim() || !nameAr.trim() || !slug.trim() || !image.trim()) {
      alert("Please fill in all required fields")
      return
    }

    const updatedCategory = category
      ? { ...category, name: { en: nameEn.trim(), ar: nameAr.trim() }, slug: slug.trim(), image: image.trim() }
      : { name: { en: nameEn.trim(), ar: nameAr.trim() }, slug: slug.trim(), image: image.trim() }
    onSubmit(updatedCategory)
  }

  return (
    <Popup isOpen={isOpen} onClose={onCancel} title={category ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2 pb-4 border-b border-gray-200 dark:border-gray-600">
          <Package className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Category Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="nameEn"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <Globe className="w-4 h-4 mr-2 text-blue-600" />
              Name (English) *
            </label>
            <input
              type="text"
              id="nameEn"
              value={nameEn}
              onChange={(e) => handleNameEnChange(e.target.value)}
              placeholder="Enter category name in English"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="nameAr"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <Globe className="w-4 h-4 mr-2 text-green-600" />
              Name (Arabic) *
            </label>
            <input
              type="text"
              id="nameAr"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="أدخل اسم الفئة بالعربية"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <Link className="w-4 h-4 mr-2 text-purple-600" />
              Slug *<span className="ml-2 text-xs text-gray-500">(URL-friendly identifier)</span>
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="category-slug"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Preview URL: /products/{slug || "your-slug"}</p>
          </div>

          <div>
            <label
              htmlFor="image"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              <ImageIcon className="w-4 h-4 mr-2 text-orange-600" />
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/category-image.jpg"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
              required
            />
            {image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                <img
                  src={image || "/placeholder.svg"}
                  alt="Category preview"
                  className="w-24 h-24 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-600">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
          >
            {category ? "Update" : "Add"} Category
          </button>
        </div>
      </form>
    </Popup>
  )
}
