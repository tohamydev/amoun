import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'data.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2))
    return NextResponse.json({ message: 'Data saved successfully' })
  } catch (error) {
    console.error('Error writing data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}

