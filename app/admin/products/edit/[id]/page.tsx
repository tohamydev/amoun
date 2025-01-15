'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    isVisible: true
  })
  const router = useRouter()

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const res = await fetch(`/api/admin/products/${params.id}`)
    if (res.ok) {
      const data = await res.json()
      setProduct(data)
    } else {
      alert('Failed to fetch product')
      router.push('/admin/products')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/admin/products/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    if (res.ok) {
      router.push('/admin/products')
    } else {
      alert('Failed to update product')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">
            <input
              type="checkbox"
              name="isVisible"
              checked={product.isVisible}
              onChange={(e) => setProduct(prev => ({ ...prev, isVisible: e.target.checked }))}
              className="mr-2"
            />
            Visible
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  )
}

