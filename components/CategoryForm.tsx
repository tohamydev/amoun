'use client'

import { useState, useEffect } from 'react'
import Popup from './Popup'

interface Category {
  id: string
  name: {
    en: string;
    ar: string;
  };
  slug: string
  image: string
}

interface CategoryFormProps {
  category?: Category
  onSubmit: (category: Omit<Category, 'id'>) => void
  onCancel: () => void
  isOpen: boolean
}

export default function CategoryForm({ category, onSubmit, onCancel, isOpen }: CategoryFormProps) {
  const [nameEn, setNameEn] = useState(category?.name?.en || '')
  const [nameAr, setNameAr] = useState(category?.name?.ar || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [image, setImage] = useState(category?.image || '')

  useEffect(() => {
    if (category) {
      setNameEn(category.name.en)
      setNameAr(category.name.ar)
      setSlug(category.slug)
      setImage(category.image)
    } else {
      setNameEn('')
      setNameAr('')
      setSlug('')
      setImage('')
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCategory = category 
      ? { ...category, name: { en: nameEn, ar: nameAr }, slug, image }
      : { name: { en: nameEn, ar: nameAr }, slug, image };
    onSubmit(updatedCategory);
  };

  return (
    <Popup isOpen={isOpen} onClose={onCancel} title={category ? 'Edit Category' : 'Add Category'}>
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
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
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
            {category ? 'Update' : 'Add'} Category
          </button>
        </div>
      </form>
    </Popup>
  )
}
