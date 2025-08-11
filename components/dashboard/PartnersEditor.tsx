"use client"

import type React from "react"

import { useState } from "react"
import { Save, Plus, Trash2, Edit, Upload } from "lucide-react"

interface PartnerItem {
  id: string
  name: string
  logo: string
}

interface PartnersContent {
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  items: PartnerItem[]
}

interface PartnersEditorProps {
  content: PartnersContent
  onSave: (content: PartnersContent) => void
  saving: boolean
}

export default function PartnersEditor({ content, onSave, saving }: PartnersEditorProps) {
  const [editedContent, setEditedContent] = useState<PartnersContent>(content)
  const [editingPartner, setEditingPartner] = useState<string | null>(null)

  const handleSave = () => {
    onSave(editedContent)
  }

  const addPartner = () => {
    const newPartner: PartnerItem = {
      id: Date.now().toString(),
      name: "",
      logo: "",
    }
    setEditedContent({
      ...editedContent,
      items: [...editedContent.items, newPartner],
    })
    setEditingPartner(newPartner.id)
  }

  const removePartner = (id: string) => {
    setEditedContent({
      ...editedContent,
      items: editedContent.items.filter((item) => item.id !== id),
    })
  }

  const updatePartner = (id: string, updatedPartner: Partial<PartnerItem>) => {
    setEditedContent({
      ...editedContent,
      items: editedContent.items.map((item) => (item.id === id ? { ...item, ...updatedPartner } : item)),
    })
  }

  const handleLogoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updatePartner(id, { logo: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Partners Section</h2>
        <div className="flex space-x-2">
          <button
            onClick={addPartner}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Section Title and Description */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (English)
            </label>
            <input
              type="text"
              value={editedContent.title.en}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  title: { ...editedContent.title, en: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Section Title (Arabic)
            </label>
            <input
              type="text"
              value={editedContent.title.ar}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  title: { ...editedContent.title, ar: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              dir="rtl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (English)
            </label>
            <textarea
              value={editedContent.description.en}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  description: { ...editedContent.description, en: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Arabic)
            </label>
            <textarea
              value={editedContent.description.ar}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  description: { ...editedContent.description, ar: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              dir="rtl"
            />
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Partners</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {editedContent.items.map((partner) => (
            <div key={partner.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800 dark:text-white">{partner.name || "New Partner"}</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingPartner(editingPartner === partner.id ? null : partner.id)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => removePartner(partner.id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Logo Preview */}
              {partner.logo && (
                <div className="mb-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-16 object-contain bg-gray-100 dark:bg-gray-700 rounded"
                  />
                </div>
              )}

              {editingPartner === partner.id && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Partner Name
                    </label>
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => updatePartner(partner.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo URL</label>
                    <input
                      type="url"
                      value={partner.logo}
                      onChange={(e) => updatePartner(partner.id, { logo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Or Upload Logo
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(partner.id, e)}
                        className="hidden"
                        id={`partner-logo-upload-${partner.id}`}
                      />
                      <label
                        htmlFor={`partner-logo-upload-${partner.id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md cursor-pointer flex items-center space-x-2 text-sm dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
