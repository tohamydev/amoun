'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch('/api/admin/products')
    const data = await response.json()
    setProducts(data)
  }

  const handleAddProduct = () => {
    router.push('/admin/products/add')
  }

  const handleEditProduct = (id) => {
    router.push(`/admin/products/edit/${id}`)
  }

  const handleDeleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      fetchProducts()
    }
  }

  const handleToggleVisibility = async (id, isVisible) => {
    await fetch(`/api/admin/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVisible: !isVisible })
    })
    fetchProducts()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add New Product
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Visibility</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">
                {product.name}
                {!product.isVisible && (
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                    Hidden
                  </span>
                )}
              </td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleToggleVisibility(product.id, product.isVisible)}
                  className={`px-2 py-1 rounded ${
                    product.isVisible ? 'bg-green-500' : 'bg-red-500'
                  } text-white`}
                >
                  {product.isVisible ? 'Visible' : 'Hidden'}
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

