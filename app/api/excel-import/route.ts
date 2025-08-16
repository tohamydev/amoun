import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { validateExcelData, formatValidationErrors } from "@/lib/excel-validator"

export async function POST(request: Request) {
  try {
    const { products } = await request.json()

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: "Invalid data format. Expected array of products." }, { status: 400 })
    }

    const validationResult = await validateExcelData(products)

    if (!validationResult.isValid) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: formatValidationErrors(validationResult.errors),
          validCount: validationResult.validProducts.length,
          totalCount: validationResult.totalRows,
        },
        { status: 400 },
      )
    }

    const importResults = []
    for (const product of validationResult.validProducts) {
      try {
        const docRef = await addDoc(collection(db, "products"), product)
        importResults.push({ id: docRef.id, success: true })
      } catch (error) {
        console.error("Error adding product:", error)
        importResults.push({ error: error instanceof Error ? error.message : "Unknown error", success: false })
      }
    }

    const successCount = importResults.filter((result) => result.success).length
    const failureCount = importResults.length - successCount

    return NextResponse.json({
      message: `Import completed. ${successCount} products imported successfully.`,
      successCount,
      failureCount,
      totalProcessed: importResults.length,
      details: failureCount > 0 ? importResults.filter((result) => !result.success) : undefined,
    })
  } catch (error) {
    console.error("Error in Excel import:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to import products" },
      { status: 500 },
    )
  }
}
