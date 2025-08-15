import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (type === "pdf" && !file.type.includes("pdf")) {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    // Limit file size to 10MB for PDFs
    const maxSize = type === "pdf" ? 10 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File size too large. Maximum ${type === "pdf" ? "10MB" : "5MB"} allowed`,
        },
        { status: 400 },
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir =
      type === "pdf"
        ? path.join(process.cwd(), "public", "uploads", "pdfs")
        : path.join(process.cwd(), "public", "uploads")

    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, ignore error
    }

    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const uniqueFileName = `${timestamp}_${sanitizedName}`

    const filePath = path.join(uploadDir, uniqueFileName)
    await writeFile(filePath, buffer)

    const fileUrl = type === "pdf" ? `/uploads/pdfs/${uniqueFileName}` : `/uploads/${uniqueFileName}`

    return NextResponse.json({
      url: fileUrl,
      originalName: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
