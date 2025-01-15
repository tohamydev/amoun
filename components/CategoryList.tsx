'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  image: string
}

interface CategoryListProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Slug</th>
            <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{category.name}</td>
              <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{category.slug}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                  title="Edit"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

