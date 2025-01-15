import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const logo = await prisma.logo.findFirst()
  return NextResponse.json(logo)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const logo = formData.get('logo') as File

  // Here you would upload the logo file to your file storage
  // and get back a URL. For this example, we'll use a placeholder.
  const logoUrl = '/placeholder.svg'

  const newLogo = await prisma.logo.upsert({
    where: { id: 1 },
    update: { url: logoUrl },
    create: { url: logoUrl }
  })

  return NextResponse.json(newLogo)
}

