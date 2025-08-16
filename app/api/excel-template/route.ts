import { NextResponse } from "next/server"
import * as XLSX from "xlsx"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function GET() {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"))
    const categories = categoriesSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        slug: data.slug,
        name_en: data.name?.en || "",
        name_ar: data.name?.ar || "",
      }
    })

    const templateData = [
      {
        "Name (English)": "Sample Product Name",
        "Name (Arabic)": "اسم المنتج النموذجي",
        "Description (English)": "Sample product description in English",
        "Description (Arabic)": "وصف المنتج النموذجي بالعربية",
        "Category Slug": categories[0]?.slug || "industrial-chemicals",
        "Image URL": "https://example.com/image.jpg",
        "PDF URL (Optional)": "https://example.com/datasheet.pdf",
        "PDF Type (upload/link)": "link",
      },
    ]

    const workbook = XLSX.utils.book_new()

    // Main template sheet
    const templateSheet = XLSX.utils.json_to_sheet(templateData)
    XLSX.utils.book_append_sheet(workbook, templateSheet, "Products Template")

    // Category reference sheet
    const categorySheet = XLSX.utils.json_to_sheet(
      categories.map((cat) => ({
        "Category Slug": cat.slug,
        "English Name": cat.name_en,
        "Arabic Name": cat.name_ar,
      })),
    )
    XLSX.utils.book_append_sheet(workbook, categorySheet, "Category Reference")

    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="products-template.xlsx"',
      },
    })
  } catch (error) {
    console.error("Error generating Excel template:", error)
    return NextResponse.json({ error: "Failed to generate template" }, { status: 500 })
  }
}
