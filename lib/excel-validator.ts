import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export interface ValidationError {
  row: number
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  validProducts: any[]
  totalRows: number
}

export async function validateExcelData(data: any[]): Promise<ValidationResult> {
  const errors: ValidationError[] = []
  const validProducts: any[] = []

  const categoriesSnapshot = await getDocs(collection(db, "categories"))
  const validCategorySlugs = categoriesSnapshot.docs.map((doc) => doc.data().slug)

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const rowNumber = i + 2 // Excel row number (accounting for header)

    // Required field validation
    const requiredFields = [
      { key: "Name (English)", field: "name_en" },
      { key: "Description (English)", field: "description_en" },
      { key: "Category Slug", field: "category" },
    ]

    let hasErrors = false

    for (const { key, field } of requiredFields) {
      if (!row[key] || String(row[key]).trim() === "") {
        errors.push({
          row: rowNumber,
          field: key,
          message: `${key} is required and cannot be empty`,
        })
        hasErrors = true
      }
    }

    // Category slug validation
    if (row["Category Slug"] && !validCategorySlugs.includes(row["Category Slug"])) {
      errors.push({
        row: rowNumber,
        field: "Category Slug",
        message: `Invalid category slug "${row["Category Slug"]}". Valid options: ${validCategorySlugs.join(", ")}`,
      })
      hasErrors = true
    }

    // URL validation for image and PDF
    const urlFields = ["Image URL", "PDF URL (Optional)"]
    for (const field of urlFields) {
      if (row[field] && row[field].trim() !== "") {
        const url = row[field].trim()
        if (!isValidUrl(url)) {
          errors.push({
            row: rowNumber,
            field,
            message: `Invalid URL format: ${url}`,
          })
          hasErrors = true
        }
      }
    }

    // PDF Type validation
    if (row["PDF URL (Optional)"] && row["PDF Type (upload/link)"]) {
      const pdfType = row["PDF Type (upload/link)"]
      if (!["upload", "link"].includes(pdfType)) {
        errors.push({
          row: rowNumber,
          field: "PDF Type (upload/link)",
          message: `PDF Type must be either "upload" or "link", got "${pdfType}"`,
        })
        hasErrors = true
      }
    }

    // Text length validation
    const textFields = [
      { key: "Name (English)", maxLength: 100 },
      { key: "Name (Arabic)", maxLength: 100 },
      { key: "Description (English)", maxLength: 500 },
      { key: "Description (Arabic)", maxLength: 500 },
    ]

    for (const { key, maxLength } of textFields) {
      if (row[key] && String(row[key]).length > maxLength) {
        errors.push({
          row: rowNumber,
          field: key,
          message: `${key} exceeds maximum length of ${maxLength} characters`,
        })
        hasErrors = true
      }
    }

    // If no errors for this row, add to valid products
    if (!hasErrors) {
      const product = {
        name: {
          en: String(row["Name (English)"]).trim(),
          ar: row["Name (Arabic)"] ? String(row["Name (Arabic)"]).trim() : String(row["Name (English)"]).trim(),
        },
        description: {
          en: String(row["Description (English)"]).trim(),
          ar: row["Description (Arabic)"]
            ? String(row["Description (Arabic)"]).trim()
            : String(row["Description (English)"]).trim(),
        },
        category: String(row["Category Slug"]).trim(),
        image: row["Image URL"] ? String(row["Image URL"]).trim() : "/placeholder.svg?height=300&width=400",
        pdfUrl: row["PDF URL (Optional)"] ? String(row["PDF URL (Optional)"]).trim() : undefined,
        pdfType: row["PDF Type (upload/link)"] === "upload" ? "upload" : "link",
      }

      validProducts.push(product)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    validProducts,
    totalRows: data.length,
  }
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export function formatValidationErrors(errors: ValidationError[]): string {
  if (errors.length === 0) return ""

  const groupedErrors = errors.reduce(
    (acc, error) => {
      if (!acc[error.row]) acc[error.row] = []
      acc[error.row].push(`${error.field}: ${error.message}`)
      return acc
    },
    {} as Record<number, string[]>,
  )

  return Object.entries(groupedErrors)
    .map(([row, messages]) => `Row ${row}:\n${messages.map((msg) => `  • ${msg}`).join("\n")}`)
    .join("\n\n")
}
