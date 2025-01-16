'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, setDoc, doc } from 'firebase/firestore'

const dummyCategories = [
  {
    id: '1',
    name: { en: 'Industrial Chemicals', ar: 'الكيماويات الصناعية' },
    image: '/placeholder.svg?height=300&width=400',
    slug: 'industrial-chemicals'
  },
  {
    id: '2',
    name: { en: 'Agricultural Chemicals', ar: 'الكيماويات الزراعية' },
    image: '/placeholder.svg?height=300&width=400',
    slug: 'agricultural-chemicals'
  },
  {
    id: '3',
    name: { en: 'Pharmaceutical Chemicals', ar: 'الكيماويات الصيدلانية' },
    image: '/placeholder.svg?height=300&width=400',
    slug: 'pharmaceutical-chemicals'
  }
]

const dummyProducts = [
  {
    id: '1',
    name: { en: 'Industrial Solvent A', ar: 'المذيب الصناعي أ' },
    description: { 
      en: 'High-quality industrial solvent for various applications',
      ar: 'مذيب صناعي عالي الجودة لتطبيقات متنوعة'
    },
    image: '/placeholder.svg?height=300&width=400',
    category: 'industrial-chemicals'
  },
  {
    id: '2',
    name: { en: 'Fertilizer X', ar: 'السماد س' },
    description: { 
      en: 'Advanced fertilizer for improved crop yield',
      ar: 'سماد متطور لتحسين إنتاجية المحاصيل'
    },
    image: '/placeholder.svg?height=300&width=400',
    category: 'agricultural-chemicals'
  },
  {
    id: '3',
    name: { en: 'Pharmaceutical Grade Chemical', ar: 'مادة كيميائية صيدلانية' },
    description: { 
      en: 'Pure pharmaceutical grade chemical compound',
      ar: 'مركب كيميائي نقي من الدرجة الصيدلانية'
    },
    image: '/placeholder.svg?height=300&width=400',
    category: 'pharmaceutical-chemicals'
  }
]

export default function InsertDummyData() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInsertDummyData = async () => {
    if (!confirm('This will replace all existing data with dummy data. Are you sure?')) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Insert categories
      for (const category of dummyCategories) {
        await setDoc(doc(db, 'categories', category.id), category)
      }

      // Insert products
      for (const product of dummyProducts) {
        await setDoc(doc(db, 'products', product.id), product)
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000) // Clear success message after 3 seconds
    } catch (err) {
      console.error('Error inserting dummy data:', err)
      setError('Failed to insert dummy data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-8">
      <button
        onClick={handleInsertDummyData}
        disabled={isLoading}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? 'Inserting Dummy Data...' : 'Insert Dummy Data'}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-2 text-green-600">
          Dummy data inserted successfully!
        </div>
      )}
    </div>
  )
}

