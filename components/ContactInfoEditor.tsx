"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MessageCircle, Mail, MapPin, Clock, Info, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getContactInfo, saveContactInfo, type ContactInfo } from "@/lib/firebase-collections"

export default function ContactInfoEditor() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    whatsapp: "",
    email: "",
    address: { en: "", ar: "" },
    workingHours: { en: "", ar: "" },
    lastUpdated: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    try {
      const data = await getContactInfo()
      if (data) {
        setContactInfo(data)
      }
    } catch (error) {
      setMessage("Error loading contact information. Please check your permissions.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const success = await saveContactInfo(contactInfo)
      if (success) {
        setMessage("Contact information saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Error saving contact information. Please try again.")
      }
    } catch (error) {
      setMessage("Error saving contact information. Please check your permissions.")
    } finally {
      setSaving(false)
    }
  }

  const updateContactInfo = (field: string, value: string | { en: string; ar: string }) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateEmail = (email: string): boolean => {
    if (!email) return true
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true
    const phoneRegex = /^\+?[\d\s\-$$$$]+$/
    return phoneRegex.test(phone)
  }

  const formatWhatsAppUrl = (number: string): string => {
    const cleanNumber = number.replace(/\D/g, "")
    return `https://wa.me/${cleanNumber}`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
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
          <Phone className="h-5 w-5" />
          Contact Information
        </CardTitle>
        <CardDescription>
          Manage your company's contact details. This information will be displayed on your website's contact page and
          footer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert className={message.includes("Error") ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <Info className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              Phone Number
              <Info className="h-4 w-4 text-gray-400" title="Main business phone number" />
            </Label>
            <Input
              id="phone"
              value={contactInfo.phone}
              onChange={(e) => updateContactInfo("phone", e.target.value)}
              placeholder="+20 123 456 7890"
              className={!validatePhone(contactInfo.phone) ? "border-red-300 focus:border-red-500" : ""}
            />
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium">EN:</span> Main business phone number for customer inquiries
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">AR:</span> رقم الهاتف الرئيسي للشركة لاستفسارات العملاء
              </p>
              {!validatePhone(contactInfo.phone) && contactInfo.phone && (
                <p className="text-sm text-red-600">Please enter a valid phone number</p>
              )}
            </div>
          </div>

          {/* WhatsApp Number */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-600" />
              WhatsApp Number
              <Info className="h-4 w-4 text-gray-400" title="WhatsApp business number" />
            </Label>
            <div className="flex gap-2">
              <Input
                id="whatsapp"
                value={contactInfo.whatsapp}
                onChange={(e) => updateContactInfo("whatsapp", e.target.value)}
                placeholder="+20 123 456 7890"
                className={!validatePhone(contactInfo.whatsapp) ? "border-red-300 focus:border-red-500" : ""}
              />
              {contactInfo.whatsapp && validatePhone(contactInfo.whatsapp) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(formatWhatsAppUrl(contactInfo.whatsapp), "_blank")}
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Test
                </Button>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium">EN:</span> WhatsApp number for quick customer support
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">AR:</span> رقم الواتساب للدعم السريع للعملاء
              </p>
              {!validatePhone(contactInfo.whatsapp) && contactInfo.whatsapp && (
                <p className="text-sm text-red-600">Please enter a valid WhatsApp number</p>
              )}
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-red-600" />
            Email Address
            <Info className="h-4 w-4 text-gray-400" title="Main business email address" />
          </Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => updateContactInfo("email", e.target.value)}
            placeholder="info@amounchemicals.com"
            className={!validateEmail(contactInfo.email) ? "border-red-300 focus:border-red-500" : ""}
          />
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              <span className="font-medium">EN:</span> Main business email for customer inquiries and support
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">AR:</span> البريد الإلكتروني الرئيسي للشركة للاستفسارات والدعم
            </p>
            {!validateEmail(contactInfo.email) && contactInfo.email && (
              <p className="text-sm text-red-600">Please enter a valid email address</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            Business Address
            <Info className="h-4 w-4 text-gray-400" title="Company physical address" />
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address-en">Address (English)</Label>
              <Textarea
                id="address-en"
                value={contactInfo.address.en}
                onChange={(e) =>
                  updateContactInfo("address", {
                    ...contactInfo.address,
                    en: e.target.value,
                  })
                }
                placeholder="123 Business Street, Cairo, Egypt"
                rows={3}
              />
              <p className="text-sm text-gray-500">Complete business address in English</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address-ar">Address (Arabic)</Label>
              <Textarea
                id="address-ar"
                value={contactInfo.address.ar}
                onChange={(e) =>
                  updateContactInfo("address", {
                    ...contactInfo.address,
                    ar: e.target.value,
                  })
                }
                placeholder="123 شارع الأعمال، القاهرة، مصر"
                rows={3}
                dir="rtl"
              />
              <p className="text-sm text-gray-500">عنوان الشركة الكامل باللغة العربية</p>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-600" />
            Working Hours
            <Info className="h-4 w-4 text-gray-400" title="Business operating hours" />
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hours-en">Working Hours (English)</Label>
              <Textarea
                id="hours-en"
                value={contactInfo.workingHours.en}
                onChange={(e) =>
                  updateContactInfo("workingHours", {
                    ...contactInfo.workingHours,
                    en: e.target.value,
                  })
                }
                placeholder="Sunday - Thursday: 9:00 AM - 6:00 PM&#10;Friday: 9:00 AM - 2:00 PM&#10;Saturday: Closed"
                rows={3}
              />
              <p className="text-sm text-gray-500">Business operating hours in English</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours-ar">Working Hours (Arabic)</Label>
              <Textarea
                id="hours-ar"
                value={contactInfo.workingHours.ar}
                onChange={(e) =>
                  updateContactInfo("workingHours", {
                    ...contactInfo.workingHours,
                    ar: e.target.value,
                  })
                }
                placeholder="الأحد - الخميس: 9:00 ص - 6:00 م&#10;الجمعة: 9:00 ص - 2:00 م&#10;السبت: مغلق"
                rows={3}
                dir="rtl"
              />
              <p className="text-sm text-gray-500">ساعات العمل باللغة العربية</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-medium text-green-900">Contact Information Tips</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Use international format for phone numbers (+20 for Egypt)</li>
                <li>• WhatsApp number should include country code</li>
                <li>• Provide both English and Arabic versions for better accessibility</li>
                <li>• Test WhatsApp link to ensure it opens correctly</li>
              </ul>
              <div className="mt-3 text-sm">
                <p className="text-green-800">
                  <span className="font-medium">AR:</span> نصائح معلومات الاتصال
                </p>
                <ul className="text-green-700 space-y-1 mt-1">
                  <li>• استخدم الصيغة الدولية لأرقام الهواتف (+20 لمصر)</li>
                  <li>• يجب أن يتضمن رقم الواتساب رمز البلد</li>
                  <li>• قدم النسختين الإنجليزية والعربية لسهولة الوصول</li>
                  <li>• اختبر رابط الواتساب للتأكد من فتحه بشكل صحيح</li>
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
