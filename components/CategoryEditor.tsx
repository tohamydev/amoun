'use client'

import { useState, useEffect } from 'react'

interface Category {
  id: string
  name: string
  image: string
  slug: string
}

interface CategoryEditorProps {
  categories: Category[]
  products: any[]
  onSave: (categories: Category[], products: any[]) => void
  isSaving: boolean
}

export default function CategoryEditor({ categories, products, onSave, isSaving }: CategoryEditorProps) {
  const [editedCategories, setEditedCategories] = useState<Category[]>(categories)

  useEffect(() => {
    setEditedCategories(categories)
  }, [categories])

  const handleChange = (index: number, field: keyof Category, value: string) => {
    const updatedCategories = [...editedCategories]
    updatedCategories[index] = { ...updatedCategories[index], [field]: value }
    setEditedCategories(updatedCategories)
  }

  const handleAdd = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
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
    console.log('Saving categories:', editedCategories)
    onSave(editedCategories, products)
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
        disabled={isSaving}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

