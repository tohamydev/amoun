import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const productsFilePath = path.join(process.cwd(), 'data', 'products.json')

async function getProducts() {
  const jsonData = await fs.readFile(productsFilePath, 'utf8')
  return JSON.parse(jsonData)
}

async function saveProducts(products) {
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2))
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const products = await getProducts()
  const product = products.find(p => p.id === parseInt(params.id))
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const products = await getProducts()
  const productIndex = products.findIndex(p => p.id === parseInt(params.id))
  if (productIndex === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  const updatedProduct = await request.json()
  products[productIndex] = { ...products[productIndex], ...updatedProduct }
  await saveProducts(products)
  return NextResponse.json(products[productIndex])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const products = await getProducts()
  const productIndex = products.findIndex(p => p.id === parseInt(params.id))
  if (productIndex === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  products.splice(productIndex, 1)
  await saveProducts(products)
  return NextResponse.json({ message: 'Product deleted successfully' })
}

