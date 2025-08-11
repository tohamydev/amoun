"use client"

import type React from "react"

import { useState } from "react"
import { Save, Upload, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HeroContent {
  title: { en: string; ar: string }
  subtitle: { en: string; ar: string }
  backgroundImage: string
}

interface HeroEditorProps {
  content: HeroContent
  onSave: (content: HeroContent) => void
  saving: boolean
}

export default function HeroEditor({ content, onSave, saving }: HeroEditorProps) {
  const [editedContent, setEditedContent] = useState<HeroContent>(content)

  const handleSave = () => {
    onSave(editedContent)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real implementation, you would upload to Firebase Storage
      // For now, we'll just use a placeholder
      const reader = new FileReader()
      reader.onload = (event) => {
        setEditedContent({
          ...editedContent,
          backgroundImage: event.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Hero Section</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            EN: Main banner displayed at the top of your homepage | AR: البانر الرئيسي المعروض في أعلى الصفحة الرئيسية
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

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="space-y-2">
            <p>
              <strong>EN:</strong> The hero section is the first thing visitors see. Make it compelling with a strong
              title and clear subtitle.
            </p>
            <p>
              <strong>AR:</strong> القسم الرئيسي هو أول ما يراه الزوار. اجعله مقنعاً بعنوان قوي وعنوان فرعي واضح.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* English Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            English Content
            <Info className="h-4 w-4 text-gray-400" title="Content displayed for English-speaking visitors" />
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Title
              <Info
                className="h-4 w-4 text-gray-400"
                title="Main headline - keep it short and impactful (recommended: 5-8 words)"
              />
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
              placeholder="Make the Best Deal with Us"
            />
            <p className="text-xs text-gray-500 mt-1">
              EN: Main headline that grabs attention | AR: العنوان الرئيسي الذي يجذب الانتباه
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Subtitle
              <Info
                className="h-4 w-4 text-gray-400"
                title="Supporting text that explains your value proposition (recommended: 10-15 words)"
              />
            </label>
            <textarea
              value={editedContent.subtitle.en}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  subtitle: { ...editedContent.subtitle, en: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Your trusted partner in chemical solutions"
            />
            <p className="text-xs text-gray-500 mt-1">
              EN: Explains what you do and why visitors should care | AR: يوضح ما تفعله ولماذا يجب أن يهتم الزوار
            </p>
          </div>
        </div>

        {/* Arabic Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            Arabic Content
            <Info className="h-4 w-4 text-gray-400" title="المحتوى المعروض للزوار الناطقين بالعربية" />
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Title (Arabic)
              <Info className="h-4 w-4 text-gray-400" title="العنوان الرئيسي - اجعله قصيراً ومؤثراً (يُنصح: 5-8 كلمات)" />
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
              placeholder="احصل على أفضل صفقة معنا"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              AR: العنوان الرئيسي الذي يجذب الانتباه | EN: Main headline that grabs attention
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Subtitle (Arabic)
              <Info className="h-4 w-4 text-gray-400" title="النص الداعم الذي يوضح قيمتك المضافة (يُنصح: 10-15 كلمة)" />
            </label>
            <textarea
              value={editedContent.subtitle.ar}
              onChange={(e) =>
                setEditedContent({
                  ...editedContent,
                  subtitle: { ...editedContent.subtitle, ar: e.target.value },
                })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              dir="rtl"
              placeholder="شريكك الموثوق في الحلول الكيميائية"
            />
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              AR: يوضح ما تفعله ولماذا يجب أن يهتم الزوار | EN: Explains what you do and why visitors should care
            </p>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          Background Image
          <Info
            className="h-4 w-4 text-gray-400"
            title="High-quality image that represents your business (recommended: 1920x1080px)"
          />
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            Image URL
            <Info className="h-4 w-4 text-gray-400" title="Direct link to your background image" />
          </label>
          <input
            type="url"
            value={editedContent.backgroundImage}
            onChange={(e) =>
              setEditedContent({
                ...editedContent,
                backgroundImage: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">
            EN: Use high-resolution images (1920x1080px recommended) | AR: استخدم صور عالية الدقة (يُنصح 1920×1080 بكسل)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Or Upload New Image</label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="hero-image-upload"
            />
            <label
              htmlFor="hero-image-upload"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer flex items-center space-x-2 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            EN: Supported formats: JPG, PNG, WebP (max 5MB) | AR: الصيغ المدعومة: JPG، PNG، WebP (حد أقصى 5 ميجابايت)
          </p>
        </div>

        {/* Image Preview */}
        {editedContent.backgroundImage && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              Preview:
              <Info className="h-4 w-4 text-gray-400" title="How your background image will appear" />
            </p>
            <div className="relative h-32 w-full bg-gray-200 rounded-md overflow-hidden">
              <img
                src={editedContent.backgroundImage || "/placeholder.svg"}
                alt="Hero background preview"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              EN: Make sure the image looks good and text is readable over it | AR: تأكد من أن الصورة تبدو جيدة والنص
              مقروء عليها
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
