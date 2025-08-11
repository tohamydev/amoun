import { Suspense } from 'react'
import ProductsClient from './ProductsClient'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsClient />
    </Suspense>
  )
}
