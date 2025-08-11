"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, ExternalLink, Upload, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getLogos, saveLogos, type Logos, type PartnerLogo } from "@/lib/firebase-collections"

export default function LogoEditor() {
  const [logos, setLogos] = useState<Logos>({
    mainLogo: "",
    darkLogo: "",
    favicon: "",
    partnerLogos: [],
    lastUpdated: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadLogos()
  }, [])

  const loadLogos = async () => {
    try {
      const data = await getLogos()
      if (data) {
        setLogos(data)
      }
    } catch (error) {
      setMessage("Error loading logos. Please check your permissions.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    try {
      const success = await saveLogos(logos)
      if (success) {
        setMessage("Logos saved successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Error saving logos. Please try again.")
      }
    } catch (error) {
      setMessage("Error saving logos. Please check your permissions.")
    } finally {
      setSaving(false)
    }
  }

  const addPartnerLogo = () => {
    const newPartner: PartnerLogo = {
      id: Date.now().toString(),
      name: "",
      logo: "",
      url: "",
    }
    setLogos((prev) => ({
      ...prev,
      partnerLogos: [...prev.partnerLogos, newPartner],
    }))
  }

  const updatePartnerLogo = (id: string, field: keyof PartnerLogo, value: string) => {
    setLogos((prev) => ({
      ...prev,
      partnerLogos: prev.partnerLogos.map((partner) => (partner.id === id ? { ...partner, [field]: value } : partner)),
    }))
  }

  const removePartnerLogo = (id: string) => {
    setLogos((prev) => ({
      ...prev,
      partnerLogos: prev.partnerLogos.filter((partner) => partner.id !== id),
    }))
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Logo Management</CardTitle>
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Logo Management
          </CardTitle>
          <CardDescription>Manage your company logos and partner logos displayed on the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <Alert className={message.includes("Error") ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
              <Info className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {/* Main Company Logos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Logos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainLogo" className="flex items-center gap-2">
                  Main Logo (Light Theme)
                  <Info className="h-4 w-4 text-gray-400" title="Logo displayed on light backgrounds" />
                </Label>
                <Input
                  id="mainLogo"
                  value={logos.mainLogo}
                  onChange={(e) => setLogos((prev) => ({ ...prev, mainLogo: e.target.value }))}
                  placeholder="https://example.com/logo.png or /images/logo.png"
                />
                <p className="text-sm text-gray-500">
                  EN: Logo shown on light backgrounds | AR: الشعار المعروض على الخلفيات الفاتحة
                </p>
                {logos.mainLogo && (
                  <div className="mt-2 p-2 border rounded-lg bg-white">
                    <img src={logos.mainLogo || "/placeholder.svg"} alt="Main Logo" className="h-12 object-contain" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="darkLogo" className="flex items-center gap-2">
                  Dark Logo (Dark Theme)
                  <Info className="h-4 w-4 text-gray-400" title="Logo displayed on dark backgrounds" />
                </Label>
                <Input
                  id="darkLogo"
                  value={logos.darkLogo}
                  onChange={(e) => setLogos((prev) => ({ ...prev, darkLogo: e.target.value }))}
                  placeholder="https://example.com/logo-dark.png or /images/logo-dark.png"
                />
                <p className="text-sm text-gray-500">
                  EN: Logo shown on dark backgrounds | AR: الشعار المعروض على الخلفيات الداكنة
                </p>
                {logos.darkLogo && (
                  <div className="mt-2 p-2 border rounded-lg bg-gray-900">
                    <img src={logos.darkLogo || "/placeholder.svg"} alt="Dark Logo" className="h-12 object-contain" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="favicon" className="flex items-center gap-2">
                Favicon
                <Info
                  className="h-4 w-4 text-gray-400"
                  title="Small icon shown in browser tabs (32x32px recommended)"
                />
              </Label>
              <Input
                id="favicon"
                value={logos.favicon}
                onChange={(e) => setLogos((prev) => ({ ...prev, favicon: e.target.value }))}
                placeholder="https://example.com/favicon.ico or /favicon.ico"
              />
              <p className="text-sm text-gray-500">
                EN: Small icon in browser tabs (32x32px) | AR: أيقونة صغيرة في علامات تبويب المتصفح (32×32 بكسل)
              </p>
              {logos.favicon && (
                <div className="mt-2 flex items-center gap-2">
                  <img
                    src={logos.favicon || "/placeholder.svg"}
                    alt="Favicon"
                    className="h-8 w-8 object-contain border rounded"
                  />
                  <span className="text-sm text-gray-600">Preview</span>
                </div>
              )}
            </div>
          </div>

          {/* Partner Logos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Partner Logos</h3>
              <Button onClick={addPartnerLogo} size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Partner
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              EN: Logos of your business partners displayed on the website | AR: شعارات شركائك التجاريين المعروضة على
              الموقع
            </p>

            {logos.partnerLogos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No partner logos added yet</p>
                <p className="text-sm">Click "Add Partner" to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {logos.partnerLogos.map((partner) => (
                  <Card key={partner.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Partner Name</Label>
                        <Input
                          value={partner.name}
                          onChange={(e) => updatePartnerLogo(partner.id, "name", e.target.value)}
                          placeholder="Partner Company Name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Logo URL</Label>
                        <Input
                          value={partner.logo}
                          onChange={(e) => updatePartnerLogo(partner.id, "logo", e.target.value)}
                          placeholder="https://example.com/partner-logo.png"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          Website URL
                          <Info className="h-4 w-4 text-gray-400" title="Optional: Partner's website link" />
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            value={partner.url}
                            onChange={(e) => updatePartnerLogo(partner.id, "url", e.target.value)}
                            placeholder="https://partner-website.com (optional)"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removePartnerLogo(partner.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {partner.logo && (
                      <div className="mt-4 flex items-center gap-4">
                        <div className="p-2 border rounded-lg bg-gray-50">
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            className="h-16 object-contain"
                          />
                        </div>
                        {partner.url && (
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Visit Website
                          </a>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
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
    </div>
  )
}
