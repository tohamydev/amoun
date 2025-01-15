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

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const products = await getProducts()
  const newProduct = await request.json()
  newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
  products.push(newProduct)
  await saveProducts(products)
  return NextResponse.json(newProduct)
}

