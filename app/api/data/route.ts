import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export async function GET() {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'))
    const productsSnapshot = await getDocs(collection(db, 'products'))

    const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ categories, products })
  } catch (error) {
    console.error('Error in GET request:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received data:', JSON.stringify(body, null, 2))

    if (!body.categories || !Array.isArray(body.categories) || !body.products || !Array.isArray(body.products)) {
      throw new Error('Invalid data format')
    }

    // Update categories
    for (const category of body.categories) {
      await setDoc(doc(db, 'categories', category.id.toString()), category)
    }

    // Update products
    for (const product of body.products) {
      await setDoc(doc(db, 'products', product.id.toString()), product)
    }

    // Delete a product
    if (body.action === 'deleteProduct' && body.productId) {
      await deleteDoc(doc(db, 'products', body.productId))
      return NextResponse.json({ message: 'Product deleted successfully' })
    }

    // Toggle product visibility
    if (body.action === 'toggleProductVisibility' && body.productId) {
      const productRef = doc(db, 'products', body.productId)
      await updateDoc(productRef, { hidden: body.hidden })
      return NextResponse.json({ message: 'Product visibility updated successfully' })
    }

    return NextResponse.json({ message: 'Data saved successfully' })
  } catch (error) {
    console.error('Error in POST request:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to save data' }, { status: 500 })
  }
}

