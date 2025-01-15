'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductEditorProps {
  categories: Category[]
  products: Product[]
  onSave: (categories: Category[], products: Product[]) => void
  isSaving: boolean
}

export default function ProductEditor({ categories, products, onSave, isSaving }: ProductEditorProps) {
  const [editedProducts, setEditedProducts] = useState<Product[]>(products)

  useEffect(() => {
    setEditedProducts(products)
  }, [products])

  const handleChange = (index: number, field: keyof Product, value: string) => {
    const updatedProducts = [...editedProducts]
    updatedProducts[index] = { ...updatedProducts[index], [field]: value }
    setEditedProducts(updatedProducts)
  }

  const handleAdd = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      description: '',
      image: '',
      category: categories[0]?.slug || ''
    }
    setEditedProducts([...editedProducts, newProduct])
  }

  const handleDelete = (index: number) => {
    const updatedProducts = editedProducts.filter((_, i) => i !== index)
    setEditedProducts(updatedProducts)
  }

  const handleSave = () => {
    console.log('Saving products:', editedProducts)
    onSave(categories, editedProducts)
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {editedProducts.map((product, index) => (
        <div key={product.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Product Name"
          />
          <textarea
            value={product.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Description"
          />
          <input
            type="text"
            value={product.image}
            onChange={(e) => handleChange(index, 'image', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Image URL"
          />
          <select
            value={product.category}
            onChange={(e) => handleChange(index, 'category', e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
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
        Add Product
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

