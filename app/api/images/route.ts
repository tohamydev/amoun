import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const images = await prisma.image.findMany()
  return NextResponse.json(images)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get('image') as File

  // Here you would upload the image file to your file storage
  // and get back a URL. For this example, we'll use a placeholder.
  const imageUrl = '/placeholder.svg'

  const newImage = await prisma.image.create({
    data: { name: image.name, url: imageUrl }
  })

  return NextResponse.json(newImage)
}

