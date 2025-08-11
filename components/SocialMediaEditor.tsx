"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, ExternalLink, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSocialMedia, saveSocialMedia, type SocialMedia } from "@/lib/firebase-collections"

export default function SocialMediaEditor() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    lastUpdated: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadSocialMedia()
  }, [])

  const loadSocialMedia = async () => {
    try {
      const data = await getSocialMedia()
      if (data) {
        setSocialMedia(data)
      }
    } catch (error) {
      setMessage("Error loading social media links. Please check your permissions.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const success = await saveSocialMedia(socialMedia)
      if (success) {
        setMessage("Social media links saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Error saving social media links. Please try again.")
      }
    } catch (error) {
      setMessage("Error saving social media links. Please check your permissions.")
    } finally {
      setSaving(false)
    }
  }

  const updateSocialMedia = (platform: keyof SocialMedia, value: string) => {
    if (platform === "lastUpdated") return
    setSocialMedia((prev) => ({
      ...prev,
      [platform]: value,
    }))
  }

  const validateUrl = (url: string): boolean => {
    if (!url) return true // Empty URLs are allowed
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const socialPlatforms = [
    {
      key: "facebook" as keyof SocialMedia,
      name: "Facebook",
      icon: Facebook,
      placeholder: "https://facebook.com/yourcompany",
      description: {
        en: "Your company's Facebook page URL",
        ar: "رابط صفحة شركتك على فيسبوك",
      },
      color: "text-blue-600",
    },
    {
      key: "instagram" as keyof SocialMedia,
      name: "Instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/yourcompany",
      description: {
        en: "Your company's Instagram profile URL",
        ar: "رابط ملف شركتك الشخصي على إنستغرام",
      },
      color: "text-pink-600",
    },
    {
      key: "linkedin" as keyof SocialMedia,
      name: "LinkedIn",
      icon: Linkedin,
      placeholder: "https://linkedin.com/company/yourcompany",
      description: {
        en: "Your company's LinkedIn page URL",
        ar: "رابط صفحة شركتك على لينكد إن",
      },
      color: "text-blue-700",
    },
    {
      key: "twitter" as keyof SocialMedia,
      name: "Twitter/X",
      icon: Twitter,
      placeholder: "https://twitter.com/yourcompany",
      description: {
        en: "Your company's Twitter/X profile URL",
        ar: "رابط ملف شركتك الشخصي على تويتر/إكس",
      },
      color: "text-gray-900",
    },
    {
      key: "youtube" as keyof SocialMedia,
      name: "YouTube",
      icon: Youtube,
      placeholder: "https://youtube.com/@yourcompany",
      description: {
        en: "Your company's YouTube channel URL",
        ar: "رابط قناة شركتك على يوتيوب",
      },
      color: "text-red-600",
    },
  ]

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Facebook className="h-5 w-5" />
          Social Media Links
        </CardTitle>
        <CardDescription>
          Manage your company's social media presence. These links will appear in your website footer and contact
          sections.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert className={message.includes("Error") ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <Info className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon
            const currentValue = socialMedia[platform.key] as string
            const isValidUrl = validateUrl(currentValue)

            return (
              <div key={platform.key} className="space-y-3">
                <Label htmlFor={platform.key} className="flex items-center gap-2">
                  <IconComponent className={`h-5 w-5 ${platform.color}`} />
                  {platform.name}
                  <Info
                    className="h-4 w-4 text-gray-400"
                    title={`${platform.description.en} | ${platform.description.ar}`}
                  />
                </Label>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id={platform.key}
                      value={currentValue}
                      onChange={(e) => updateSocialMedia(platform.key, e.target.value)}
                      placeholder={platform.placeholder}
                      className={!isValidUrl ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {currentValue && isValidUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(currentValue, "_blank")}
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Test
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">EN:</span> {platform.description.en}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">AR:</span> {platform.description.ar}
                    </p>
                    {!isValidUrl && currentValue && (
                      <p className="text-sm text-red-600">Please enter a valid URL starting with https://</p>
                    )}
                  </div>
                </div>

                {currentValue && isValidUrl && (
                  <div className="ml-7 p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <IconComponent className={`h-4 w-4 ${platform.color}`} />
                      <span className="font-medium">Preview:</span>
                      <a
                        href={currentValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline break-all"
                      >
                        {currentValue}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">Tips for Social Media Links</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Leave fields empty if you don't have that social media account</li>
                <li>• Use complete URLs including https://</li>
                <li>• Test links using the "Test" button to ensure they work</li>
                <li>• Links will appear in your website footer and contact sections</li>
              </ul>
              <div className="mt-3 text-sm">
                <p className="text-blue-800">
                  <span className="font-medium">AR:</span> نصائح لروابط وسائل التواصل الاجتماعي
                </p>
                <ul className="text-blue-700 space-y-1 mt-1">
                  <li>• اترك الحقول فارغة إذا لم يكن لديك حساب على تلك المنصة</li>
                  <li>• استخدم روابط كاملة تتضمن https://</li>
                  <li>• اختبر الروابط باستخدام زر "اختبار" للتأكد من عملها</li>
                  <li>• ستظهر الروابط في تذييل موقعك وأقسام الاتصال</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
