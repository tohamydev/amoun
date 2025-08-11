"use client"

import { useState } from "react"
import { Save, Plus, Trash2, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AboutContent {
  title: { en: string; ar: string }
  mission: {
    title: { en: string; ar: string }
    description: { en: string; ar: string }
  }
  values: {
    title: { en: string; ar: string }
    items: { en: string[]; ar: string[] }
  }
  experience: { en: string; ar: string }
}

interface AboutEditorProps {
  content: AboutContent
  onSave: (content: AboutContent) => void
  saving: boolean
}

export default function AboutEditor({ content, onSave, saving }: AboutEditorProps) {
  const [editedContent, setEditedContent] = useState<AboutContent>(content)

  const handleSave = () => {
    onSave(editedContent)
  }

  const addValueItem = () => {
    setEditedContent({
      ...editedContent,
      values: {
        ...editedContent.values,
        items: {
          en: [...editedContent.values.items.en, ""],
          ar: [...editedContent.values.items.ar, ""],
        },
      },
    })
  }

  const removeValueItem = (index: number) => {
    setEditedContent({
      ...editedContent,
      values: {
        ...editedContent.values,
        items: {
          en: editedContent.values.items.en.filter((_, i) => i !== index),
          ar: editedContent.values.items.ar.filter((_, i) => i !== index),
        },
      },
    })
  }

  const updateValueItem = (index: number, lang: "en" | "ar", value: string) => {
    const newItems = { ...editedContent.values.items }
    newItems[lang][index] = value
    setEditedContent({
      ...editedContent,
      values: {
        ...editedContent.values,
        items: newItems,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">About Us Section</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            EN: Tell your company story and build trust with visitors | AR: احك قصة شركتك وابن الثقة مع الزوار
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <Alert className="bg-green-50 border-green-200">
        <Info className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-2">
            <p>
              <strong>EN:</strong> The About Us section builds credibility. Include your mission, values, and experience
              to establish trust.
            </p>
            <p>
              <strong>AR:</strong> قسم "من نحن" يبني المصداقية. اشمل مهمتك وقيمك وخبرتك لترسيخ الثقة.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Section Title */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            Section Title (English)
            <Info className="h-4 w-4 text-gray-400" title="Main heading for the About Us section" />
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
            placeholder="About Us"
          />
          <p className="text-xs text-gray-500 mt-1">
            EN: Keep it simple and clear (e.g., "About Us", "Our Story") | AR: اجعله بسيطاً وواضحاً
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            Section Title (Arabic)
            <Info className="h-4 w-4 text-gray-400" title="العنوان الرئيسي لقسم من نحن" />
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
            placeholder="من نحن"
          />
          <p className="text-xs text-gray-500 mt-1" dir="rtl">
            AR: اجعله بسيطاً وواضحاً (مثل "من نحن"، "قصتنا") | EN: Keep it simple and clear
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          Mission
          <Info className="h-4 w-4 text-gray-400" title="Your company's purpose and goals" />
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                Mission Title (English)
                <Info className="h-4 w-4 text-gray-400" title="Heading for your mission statement" />
              </label>
              <input
                type="text"
                value={editedContent.mission.title.en}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    mission: {
                      ...editedContent.mission,
                      title: { ...editedContent.mission.title, en: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Our Mission"
              />
              <p className="text-xs text-gray-500 mt-1">
                EN: Usually "Our Mission", "Our Purpose", or "What We Do" | AR: عادة "مهمتنا" أو "هدفنا"
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                Mission Description (English)
                <Info
                  className="h-4 w-4 text-gray-400"
                  title="Explain your company's purpose and what you aim to achieve"
                />
              </label>
              <textarea
                value={editedContent.mission.description.en}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    mission: {
                      ...editedContent.mission,
                      description: { ...editedContent.mission.description, en: e.target.value },
                    },
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="At [Company Name], we strive to..."
              />
              <p className="text-xs text-gray-500 mt-1">
                EN: Explain why your company exists and what you aim to achieve | AR: اشرح لماذا توجد شركتك وما تهدف إلى
                تحقيقه
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                Mission Title (Arabic)
                <Info className="h-4 w-4 text-gray-400" title="عنوان بيان مهمتك" />
              </label>
              <input
                type="text"
                value={editedContent.mission.title.ar}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    mission: {
                      ...editedContent.mission,
                      title: { ...editedContent.mission.title, ar: e.target.value },
                    },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                dir="rtl"
                placeholder="مهمتنا"
              />
              <p className="text-xs text-gray-500 mt-1" dir="rtl">
                AR: عادة "مهمتنا" أو "هدفنا" أو "ما نفعله" | EN: Usually "Our Mission" or "Our Purpose"
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                Mission Description (Arabic)
                <Info className="h-4 w-4 text-gray-400" title="اشرح هدف شركتك وما تسعى لتحقيقه" />
              </label>
              <textarea
                value={editedContent.mission.description.ar}
                onChange={(e) =>
                  setEditedContent({
                    ...editedContent,
                    mission: {
                      ...editedContent.mission,
                      description: { ...editedContent.mission.description, ar: e.target.value },
                    },
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                dir="rtl"
                placeholder="في [اسم الشركة]، نسعى جاهدين إلى..."
              />
              <p className="text-xs text-gray-500 mt-1" dir="rtl">
                AR: اشرح لماذا توجد شركتك وما تهدف إلى تحقيقه | EN: Explain why your company exists and what you aim to
                achieve
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            Values
            <Info className="h-4 w-4 text-gray-400" title="Core principles that guide your business" />
          </h3>
          <button
            onClick={addValueItem}
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center space-x-1 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Value</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Values Title (English)
              <Info className="h-4 w-4 text-gray-400" title="Heading for your company values" />
            </label>
            <input
              type="text"
              value={editedContent.values.title.en}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  values: {
                    ...editedContent.values,
                    title: { ...editedContent.values.title, en: e.target.value },
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Our Values"
            />
            <p className="text-xs text-gray-500 mt-1">
              EN: Usually "Our Values", "Core Values", or "What We Believe" | AR: عادة "قيمنا" أو "قيمنا الأساسية"
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Values Title (Arabic)
              <Info className="h-4 w-4 text-gray-400" title="عنوان قيم شركتك" />
            </label>
            <input
              type="text"
              value={editedContent.values.title.ar}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  values: {
                    ...editedContent.values,
                    title: { ...editedContent.values.title, ar: e.target.value },
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              dir="rtl"
              placeholder="قيمنا"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              AR: عادة "قيمنا" أو "قيمنا الأساسية" أو "ما نؤمن به" | EN: Usually "Our Values" or "Core Values"
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            EN: List 3-7 core values that define your company culture | AR: اذكر 3-7 قيم أساسية تحدد ثقافة شركتك
          </p>
          {editedContent.values.items.en.map((_, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              <div>
                <input
                  type="text"
                  value={editedContent.values.items.en[index]}
                  onChange={(e) => updateValueItem(index, "en", e.target.value)}
                  placeholder={`Value ${index + 1} (English) - e.g., "Quality & Safety"`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  EN: Keep it concise (2-4 words) | AR: اجعله مختصراً (2-4 كلمات)
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={editedContent.values.items.ar[index]}
                    onChange={(e) => updateValueItem(index, "ar", e.target.value)}
                    placeholder={`القيمة ${index + 1} (عربي) - مثل "الجودة والسلامة"`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    dir="rtl"
                  />
                  <p className="text-xs text-gray-500 mt-1" dir="rtl">
                    AR: اجعله مختصراً (2-4 كلمات) | EN: Keep it concise (2-4 words)
                  </p>
                </div>
                <button onClick={() => removeValueItem(index)} className="text-red-600 hover:text-red-800 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
          Experience
          <Info className="h-4 w-4 text-gray-400" title="Highlight your company's experience and achievements" />
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Experience Text (English)
              <Info className="h-4 w-4 text-gray-400" title="Mention years in business, achievements, or expertise" />
            </label>
            <textarea
              value={editedContent.experience.en}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  experience: { ...editedContent.experience, en: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="With over X years of experience..."
            />
            <p className="text-xs text-gray-500 mt-1">
              EN: Include years in business, key achievements, or industry expertise | AR: اشمل سنوات العمل والإنجازات
              الرئيسية
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Experience Text (Arabic)
              <Info className="h-4 w-4 text-gray-400" title="اذكر سنوات العمل والإنجازات أو الخبرة" />
            </label>
            <textarea
              value={editedContent.experience.ar}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  experience: { ...editedContent.experience, ar: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              dir="rtl"
              placeholder="مع أكثر من X سنوات من الخبرة..."
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              AR: اشمل سنوات العمل والإنجازات الرئيسية أو الخبرة في المجال | EN: Include years in business and key
              achievements
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
