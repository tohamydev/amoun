"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Popup from "./Popup"
import { Upload, LinkIcon, FileText } from "lucide-react"

interface Category {
  id: string
  name: { en: string; ar: string }
  slug: string
}

interface Product {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  image: string
  category: string
  pdfUrl?: string
  pdfType?: "upload" | "link"
}

interface ProductFormProps {
  product?: Product
  categories: Category[]
  onSubmit: (product: Omit<Product, "id"> | Product) => void
  onCancel: () => void
  isOpen: boolean
}

export default function ProductForm({ product, categories, onSubmit, onCancel, isOpen }: ProductFormProps) {
  const [nameEn, setNameEn] = useState("")
  const [nameAr, setNameAr] = useState("")
  const [descriptionEn, setDescriptionEn] = useState("")
  const [descriptionAr, setDescriptionAr] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [pdfType, setPdfType] = useState<"upload" | "link">("link")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (product) {
      setNameEn(product.name?.en || "")
      setNameAr(product.name?.ar || "")
      setDescriptionEn(product.description?.en || "")
      setDescriptionAr(product.description?.ar || "")
      setImage(product.image || "")
      setCategory(product.category || "")
      setPdfUrl(product.pdfUrl || "")
      setPdfType(product.pdfType || "link")
    } else {
      setNameEn("")
      setNameAr("")
      setDescriptionEn("")
      setDescriptionAr("")
      setImage("")
      setCategory(categories[0]?.slug || "")
      setPdfUrl("")
      setPdfType("link")
      setPdfFile(null)
    }
  }, [product, categories])

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes("pdf")) {
      alert("Please select a PDF file")
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "pdf")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setPdfUrl(data.url)
        setPdfType("upload")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to upload PDF. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !nameEn.trim() ||
      !nameAr.trim() ||
      !descriptionEn.trim() ||
      !descriptionAr.trim() ||
      !image.trim() ||
      !category.trim()
    ) {
      alert("Please fill in all required fields")
      return
    }

    const productData = {
      name: { en: nameEn.trim(), ar: nameAr.trim() },
      description: { en: descriptionEn.trim(), ar: descriptionAr.trim() },
      image: image.trim(),
      category: category.trim(),
      pdfUrl: pdfUrl.trim() || undefined,
      pdfType: pdfUrl.trim() ? pdfType : undefined,
    }

    if (product) {
      onSubmit({ ...productData, id: product.id })
    } else {
      onSubmit(productData)
    }

    if (!product) {
      setNameEn("")
      setNameAr("")
      setDescriptionEn("")
      setDescriptionAr("")
      setImage("")
      setCategory(categories[0]?.slug || "")
      setPdfUrl("")
      setPdfType("link")
      setPdfFile(null)
    }
  }

  return (
    <Popup isOpen={isOpen} onClose={onCancel} title={product ? "Edit Product" : "Add Product"}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <label htmlFor="nameEn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name (English) *
          </label>
          <input
            type="text"
            id="nameEn"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="nameAr" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name (Arabic) *
          </label>
          <input
            type="text"
            id="nameAr"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            dir="rtl"
          />
        </div>
        <div>
          <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (English) *
          </label>
          <textarea
            id="descriptionEn"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (Arabic) *
          </label>
          <textarea
            id="descriptionAr"
            value={descriptionAr}
            onChange={(e) => setDescriptionAr(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            required
            dir="rtl"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL *
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name.en} / {cat.name.ar}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Product Details PDF (Optional)
          </h3>

          <div className="space-y-3">
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="link"
                  checked={pdfType === "link"}
                  onChange={(e) => setPdfType(e.target.value as "link")}
                  className="mr-2"
                />
                <LinkIcon className="w-4 h-4 mr-1" />
                PDF Link
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="upload"
                  checked={pdfType === "upload"}
                  onChange={(e) => setPdfType(e.target.value as "upload")}
                  className="mr-2"
                />
                <Upload className="w-4 h-4 mr-1" />
                Upload PDF
              </label>
            </div>

            {pdfType === "link" ? (
              <div>
                <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  PDF URL
                </label>
                <input
                  type="url"
                  id="pdfUrl"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="https://example.com/product-details.pdf"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload PDF File
                </label>
                <input
                  type="file"
                  id="pdfFile"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setPdfFile(file)
                      handleFileUpload(file)
                    }
                  }}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                  disabled={isUploading}
                />
                {isUploading && <p className="mt-1 text-sm text-blue-600">Uploading PDF...</p>}
                {pdfUrl && pdfType === "upload" && (
                  <p className="mt-1 text-sm text-green-600">PDF uploaded successfully!</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {product ? "Update" : "Add"} Product
          </button>
        </div>
      </form>
    </Popup>
  )
}
