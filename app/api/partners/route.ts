import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const partners = await prisma.partner.findMany()
  return NextResponse.json(partners)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const logo = formData.get('logo') as File

  // Here you would upload the logo file to your file storage
  // and get back a URL. For this example, we'll use a placeholder.
  const logoUrl = '/placeholder.svg'

  const partner = await prisma.partner.create({
    data: { name, logo: logoUrl }
  })

  return NextResponse.json(partner)
}

