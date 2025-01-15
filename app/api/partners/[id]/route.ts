import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const pris

ma = new PrismaClient()

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.partner.delete({
    where: { id: parseInt(params.id) }
  })
  return NextResponse.json({ message: 'Partner deleted' })
}

