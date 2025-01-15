'use client'

import { useState } from 'react'

interface Category {
  id: number
  name: string
  image: string
  slug: string
}

interface CategoryEditorProps {
  categories: Category[]
  onSave: (categories: Category[], products: any[]) => void
}

export default function CategoryEditor({ categories, onSave }: CategoryEditorProps) {
  const [editedCategories, setEditedCategories] = useState(categories)

  const handleChange = (index: number, field: keyof Category, value: string) => {
    const updatedCategories = [...editedCategories]
    updatedCategories[index] = { ...updatedCategories[index], [field]: value }
    setEditedCategories(updatedCategories)
  }

  const handleAdd = () => {
    const newCategory: Category = {
      id: Math.max(...editedCategories.map(c => c.id), 0) + 1,
      name: '',
      image: '',
      slug: ''
    }
    setEditedCategories([...editedCategories, newCategory])
  }

  const handleDelete = (index: number) => {
    const updatedCategories = editedCategories.filter((_, i) => i !== index)
    setEditedCategories(updatedCategories)
  }

  const handleSave = () => {
    onSave(editedCategories, []) // Pass an empty array for products as we're not editing them here
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      {editedCategories.map((category, index) => (
        <div key={category.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={category.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Category Name"
          />
          <input
            type="text"
            value={category.image}
            onChange={(e) => handleChange(index, 'image', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Image URL"
          />
          <input
            type="text"
            value={category.slug}
            onChange={(e) => handleChange(index, 'slug', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Slug"
          />
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
      >
        Add Category
      </button>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  )
}

