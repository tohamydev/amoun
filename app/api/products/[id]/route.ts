import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) }
  })
  return NextResponse.json(product)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  const product = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data
  })
  return NextResponse.json(product)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({
    where: { id: parseInt(params.id) }
  })
  return NextResponse.json({ message: 'Product deleted' })
}

