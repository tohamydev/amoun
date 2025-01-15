'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '@/components/AdminLogin'
import CategoryEditor from '@/components/CategoryEditor'
import ProductEditor from '@/components/ProductEditor'
import FileUploader from '@/components/FileUploader'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data')
      const data = await response.json()
      setCategories(data.categories)
      setProducts(data.products)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
  }

  const handleSave = async (updatedCategories: any[], updatedProducts: any[]) => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: updatedCategories, products: updatedProducts }),
      })

      if (response.ok) {
        alert('Data saved successfully!')
        fetchData()
      } else {
        throw new Error('Failed to save data')
      }
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Failed to save data. Please try again.')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <CategoryEditor categories={categories} onSave={handleSave} />
      <ProductEditor products={products} categories={categories} onSave={handleSave} />
      <FileUploader />
    </div>
  )
}

