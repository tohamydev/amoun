'use client'

import { useState, useEffect } from 'react'
import Popup from './Popup'

interface Category {
  id: string
  name: { en: string; ar: string }
  slug: string
}

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
}

interface ProductFormProps {
  product?: Product
  categories: Category[]
  onSubmit: (product: Omit<Product, 'id'>) => void
  onCancel: () => void
  isOpen: boolean
}

export default function ProductForm({ product, categories, onSubmit, onCancel, isOpen }: ProductFormProps) {
  const [nameEn, setNameEn] = useState(product?.name?.en || '')
  const [nameAr, setNameAr] = useState(product?.name?.ar || '')
  const [descriptionEn, setDescriptionEn] = useState(product?.description?.en || '')
  const [descriptionAr, setDescriptionAr] = useState(product?.description?.ar || '')
  const [image, setImage] = useState(product?.image || '')
  const [category, setCategory] = useState(product?.category || categories[0]?.slug || '')

  useEffect(() => {
    if (product) {
      setNameEn(product.name.en)
      setNameAr(product.name.ar)
      setDescriptionEn(product.description.en)
      setDescriptionAr(product.description.ar)
      setImage(product.image)
      setCategory(product.category)
    } else {
      setNameEn('')
      setNameAr('')
      setDescriptionEn('')
      setDescriptionAr('')
      setImage('')
      setCategory(categories[0]?.slug || '')
    }
  }, [product, categories])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      name: { en: nameEn, ar: nameAr },
      description: { en: descriptionEn, ar: descriptionAr },
      image,
      category
    };
    onSubmit(updatedProduct);
  }

  return (
    <Popup isOpen={isOpen} onClose={onCancel} title={product ? 'Edit Product' : 'Add Product'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name (English)
          </label>
          <input
            type="text"
            id="nameEn"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="nameAr" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name (Arabic)
          </label>
          <input
            type="text"
            id="nameAr"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            dir="rtl"
          />
        </div>
        <div>
          <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (English)
          </label>
          <textarea
            id="descriptionEn"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (Arabic)
          </label>
          <textarea
            id="descriptionAr"
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            required
            dir="rtl"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name.en} / {cat.name.ar}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {product ? 'Update' : 'Add'} Product
          </button>
        </div>
      </form>
    </Popup>
  )
}
