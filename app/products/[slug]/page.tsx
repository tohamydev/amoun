import { Suspense } from 'react'
import CategoryClient from './CategoryClient'
import LoadingSpinner from '@/components/LoadingSpinner'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
}

async function getProductsByCategory(category: string): Promise<Product[]> {
  const productsRef = collection(db, 'products')
  const q = query(productsRef, where('category', '==', category))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
}

async function getCategoryName(slug: string): Promise<{ en: string; ar: string }> {
  const categoriesRef = collection(db, 'categories')
  const q = query(categoriesRef, where('slug', '==', slug))
  const querySnapshot = await getDocs(q)
  const category = querySnapshot.docs[0]?.data()
  return category?.name || { en: 'Products', ar: 'المنتجات' }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [products, categoryName] = await Promise.all([
    getProductsByCategory(params.slug),
    getCategoryName(params.slug)
  ])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryClient products={products} categoryName={categoryName} slug={params.slug} />
    </Suspense>
  )
}
