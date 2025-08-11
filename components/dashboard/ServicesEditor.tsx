"use client"

import { useState } from "react"
import { Save, Plus, Trash2, Edit } from "lucide-react"

interface ServiceItem {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  icon: string
}

interface ServicesContent {
  title: { en: string; ar: string }
  items: ServiceItem[]
}

interface ServicesEditorProps {
  content: ServicesContent
  onSave: (content: ServicesContent) => void
  saving: boolean
}

const availableIcons = ["Beaker", "Truck", "Flask", "Settings", "Wrench", "Cog", "Package", "Shield", "Zap", "Globe"]

export default function ServicesEditor({ content, onSave, saving }: ServicesEditorProps) {
  const [editedContent, setEditedContent] = useState<ServicesContent>(content)
  const [editingService, setEditingService] = useState<string | null>(null)

  const handleSave = () => {
    onSave(editedContent)
  }

  const addService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      icon: "Settings",
    }
    setEditedContent({
      ...editedContent,
      items: [...editedContent.items, newService],
    })
    setEditingService(newService.id)
  }

  const removeService = (id: string) => {
    setEditedContent({
      ...editedContent,
      items: editedContent.items.filter((item) => item.id !== id),
    })
  }

  const updateService = (id: string, updatedService: Partial<ServiceItem>) => {
    setEditedContent({
      ...editedContent,
      items: editedContent.items.map((item) => (item.id === id ? { ...item, ...updatedService } : item)),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Services Section</h2>
        <div className="flex space-x-2">
          <button
            onClick={addService}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
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

      {/* Section Title */}
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

      {/* Services List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Services</h3>
        {editedContent.items.map((service) => (
          <div key={service.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-800 dark:text-white">{service.title.en || "New Service"}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingService(editingService === service.id ? null : service.id)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => removeService(service.id)} className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {editingService === service.id && (
              <div className="space-y-4">
                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon</label>
                  <select
                    value={service.icon}
                    onChange={(e) => updateService(service.id, { icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                {/* English Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title (English)
                      </label>
                      <input
                        type="text"
                        value={service.title.en}
                        onChange={(e) =>
                          updateService(service.id, {
                            title: { ...service.title, en: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description (English)
                      </label>
                      <textarea
                        value={service.description.en}
                        onChange={(e) =>
                          updateService(service.id, {
                            description: { ...service.description, en: e.target.value },
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Arabic Content */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title (Arabic)
                      </label>
                      <input
                        type="text"
                        value={service.title.ar}
                        onChange={(e) =>
                          updateService(service.id, {
                            title: { ...service.title, ar: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description (Arabic)
                      </label>
                      <textarea
                        value={service.description.ar}
                        onChange={(e) =>
                          updateService(service.id, {
                            description: { ...service.description, ar: e.target.value },
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
