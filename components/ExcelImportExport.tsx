"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Download, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import * as XLSX from "xlsx"

interface ExcelImportExportProps {
  onImportComplete: (products: any[]) => void
}

interface ImportProgress {
  stage: "parsing" | "validating" | "importing" | "complete"
  progress: number
  message: string
}

export default function ExcelImportExport({ onImportComplete }: ExcelImportExportProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(null)
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null
    message: string
    details?: string
  }>({ type: null, message: "" })

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch("/api/excel-template")
      if (!response.ok) throw new Error("Failed to download template")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "products-template.xlsx"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Failed to download template. Please try again.",
      })
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadStatus({ type: null, message: "" })
    setImportProgress({ stage: "parsing", progress: 10, message: "Reading Excel file..." })

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      setImportProgress({ stage: "validating", progress: 30, message: "Validating product data..." })

      const response = await fetch("/api/excel-import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: jsonData }),
      })

      setImportProgress({ stage: "importing", progress: 70, message: "Importing products to database..." })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.details || result.error || "Import failed")
      }

      setImportProgress({ stage: "complete", progress: 100, message: "Import completed successfully!" })

      setUploadStatus({
        type: "success",
        message: result.message,
        details: result.failureCount > 0 ? `${result.failureCount} products failed to import` : undefined,
      })

      // Trigger refresh of products list
      onImportComplete([])
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Import failed",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsUploading(false)
      setImportProgress(null)
      // Reset file input
      event.target.value = ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Excel Import/Export
        </CardTitle>
        <CardDescription>
          Download template with category enums or upload Excel file to bulk import products
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleDownloadTemplate} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download Template
          </Button>

          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="flex-1"
            />
            <Button disabled={isUploading} className="flex items-center gap-2">
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {isUploading ? "Processing..." : "Import"}
            </Button>
          </div>
        </div>

        {importProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="capitalize">{importProgress.stage}</span>
              <span>{importProgress.progress}%</span>
            </div>
            <Progress value={importProgress.progress} className="w-full" />
            <p className="text-sm text-gray-600">{importProgress.message}</p>
          </div>
        )}

        {uploadStatus.type && (
          <Alert
            className={uploadStatus.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
          >
            {uploadStatus.type === "error" ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription className={uploadStatus.type === "error" ? "text-red-800" : "text-green-800"}>
              <div>{uploadStatus.message}</div>
              {uploadStatus.details && (
                <details className="mt-2">
                  <summary className="cursor-pointer font-medium">Details</summary>
                  <pre className="mt-1 text-xs whitespace-pre-wrap bg-white/50 p-2 rounded border">
                    {uploadStatus.details}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Instructions:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Download the template to see the required format and available category slugs</li>
            <li>Fill in your product data using the exact column names</li>
            <li>Use only the category slugs from the "Category Reference" sheet</li>
            <li>Required fields: Name (English), Description (English), Category Slug</li>
            <li>Upload the completed Excel file to bulk import products</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
