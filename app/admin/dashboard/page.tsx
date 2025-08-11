"use client"

import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import LoadingSpinner from "@/components/LoadingSpinner"
import HeroEditor from "@/components/dashboard/HeroEditor"
import AboutEditor from "@/components/dashboard/AboutEditor"
import ServicesEditor from "@/components/dashboard/ServicesEditor"
import PartnersEditor from "@/components/dashboard/PartnersEditor"
import LogoEditor from "@/components/LogoEditor"
import SocialMediaEditor from "@/components/SocialMediaEditor"
import ContactInfoEditor from "@/components/ContactInfoEditor"
import {
  Home,
  Info,
  Settings,
  Users,
  AlertTriangle,
  RefreshCw,
  Upload,
  MessageCircle,
  Phone,
  Palette,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HomeContent {
  hero: {
    title: { en: string; ar: string }
    subtitle: { en: string; ar: string }
    backgroundImage: string
  }
  about: {
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
  services: {
    title: { en: string; ar: string }
    items: Array<{
      id: string
      title: { en: string; ar: string }
      description: { en: string; ar: string }
      icon: string
    }>
  }
  partners: {
    title: { en: string; ar: string }
    description: { en: string; ar: string }
    items: Array<{
      id: string
      name: string
      logo: string
    }>
  }
}

const defaultContent: HomeContent = {
  hero: {
    title: { en: "Make the Best Deal with Us", ar: "احصل على أفضل صفقة معنا" },
    subtitle: { en: "Your trusted partner in chemical solutions", ar: "شريكك الموثوق في الحلول الكيميائية" },
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg.jpg-u7eZt243hcDjppOlhhCsC3G6bocY03.jpeg",
  },
  about: {
    title: { en: "About Us", ar: "من نحن" },
    mission: {
      title: { en: "Our Mission", ar: "مهمتنا" },
      description: {
        en: "At Amoun Chemicals, we strive to provide innovative and sustainable chemical solutions to meet the evolving needs of industries worldwide.",
        ar: "في أمون للكيماويات، نسعى جاهدين لتقديم حلول كيميائية مبتكرة ومستدامة لتلبية الاحتياجات المتطورة للصناعات في جميع أنحاء العالم.",
      },
    },
    values: {
      title: { en: "Our Values", ar: "قيمنا" },
      items: {
        en: [
          "Commitment to quality and safety",
          "Innovation and continuous improvement",
          "Environmental responsibility",
          "Customer-centric approach",
          "Integrity and transparency",
        ],
        ar: [
          "الالتزام بالجودة والسلامة",
          "الابتكار والتحسين المستمر",
          "المسؤولية البيئية",
          "نهج يركز على العملاء",
          "النزاهة والشفافية",
        ],
      },
    },
    experience: {
      en: "With over 20 years of experience in the chemical industry, Amoun Chemicals has established itself as a leader in providing cutting-edge solutions.",
      ar: "مع أكثر من 20 عامًا من الخبرة في صناعة الكيماويات، رسخت أمون للكيماويات نفسها كشركة رائدة في تقديم الحلول المتطورة.",
    },
  },
  services: {
    title: { en: "Our Services", ar: "خدماتنا" },
    items: [
      {
        id: "1",
        title: { en: "Chemical Manufacturing", ar: "تصنيع المواد الكيميائية" },
        description: {
          en: "State-of-the-art facilities producing high-quality chemicals for various industries.",
          ar: "مرافق حديثة لإنتاج مواد كيميائية عالية الجودة لمختلف الصناعات.",
        },
        icon: "Beaker",
      },
      {
        id: "2",
        title: { en: "Supply Chain Solutions", ar: "حلول سلسلة التوريد" },
        description: {
          en: "Efficient and reliable distribution network ensuring timely delivery of products.",
          ar: "شبكة توزيع فعالة وموثوقة تضمن التسليم في الوقت المناسب للمنتجات.",
        },
        icon: "Truck",
      },
      {
        id: "3",
        title: { en: "Custom Formulations", ar: "تركيبات مخصصة" },
        description: {
          en: "Tailored chemical solutions to meet your specific requirements and challenges.",
          ar: "حلول كيميائية مخصصة لتلبية متطلباتك وتحدياتك المحددة.",
        },
        icon: "Flask",
      },
    ],
  },
  partners: {
    title: { en: "Our Partners", ar: "شركاؤنا" },
    description: {
      en: "We collaborate with industry leaders to deliver exceptional chemical solutions and drive innovation in various sectors.",
      ar: "نتعاون مع الشركات الرائدة في الصناعة لتقديم حلول كيميائية استثنائية ودفع الابتكار في مختلف القطاعات.",
    },
    items: [
      {
        id: "1",
        name: "Partner 1",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Jatjj6qpZgwhdx9Q9SkiUnL7GrEfjk.svg",
      },
      {
        id: "2",
        name: "Partner 2",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-iI0WS0PBkZiCixHcfUnGBduTFJCEVZ.svg",
      },
    ],
  },
}

export default function DashboardPage() {
  const [content, setContent] = useState<HomeContent>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [permissionError, setPermissionError] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      setError(null)
      setPermissionError(false)

      const docRef = doc(db, "homeContent", "main")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data() as HomeContent
        setContent({ ...defaultContent, ...data })
      } else {
        // Initialize with default content
        console.log("No document found, initializing with default content...")
        await initializeDefaultContent()
      }
    } catch (error: any) {
      console.error("Error fetching content:", error)
      if (error.code === "permission-denied") {
        setPermissionError(true)
        setError("Permission denied. Please check Firestore security rules.")
      } else {
        setError("Failed to load content. Please try refreshing the page.")
      }
    } finally {
      setLoading(false)
    }
  }

  const initializeDefaultContent = async () => {
    try {
      const docRef = doc(db, "homeContent", "main")
      await setDoc(docRef, defaultContent)
      setContent(defaultContent)
      console.log("Default content initialized successfully")
    } catch (error: any) {
      console.error("Error initializing default content:", error)
      if (error.code === "permission-denied") {
        setPermissionError(true)
      }
      throw error
    }
  }

  const saveContent = async (updatedContent: HomeContent) => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(null)
      setPermissionError(false)

      console.log("Attempting to save content:", updatedContent)

      const docRef = doc(db, "homeContent", "main")
      await setDoc(docRef, updatedContent, { merge: true })

      setContent(updatedContent)
      setSuccess("Content saved successfully!")
      setTimeout(() => setSuccess(null), 3000)

      console.log("Content saved successfully")
    } catch (error: any) {
      console.error("Error saving content:", error)

      if (error.code === "permission-denied") {
        setPermissionError(true)
        setError(
          "Permission denied. Please check your Firestore security rules. You need to allow write access to the 'homeContent' collection.",
        )
      } else if (error.code === "unavailable") {
        setError("Firebase is currently unavailable. Please try again in a moment.")
      } else if (error.code === "failed-precondition") {
        setError("Database operation failed. Please refresh the page and try again.")
      } else {
        setError(`Failed to save content: ${error.message || "Unknown error"}`)
      }
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3, description: "Dashboard overview and statistics" },
    { id: "hero", name: "Hero Section", icon: Home, description: "Main banner and hero content" },
    { id: "about", name: "About Us", icon: Info, description: "Company information and values" },
    { id: "services", name: "Services", icon: Settings, description: "Service offerings and descriptions" },
    { id: "partners", name: "Partners", icon: Users, description: "Partner logos and information" },
    { id: "logos", name: "Logo Management", icon: Upload, description: "Company and partner logos" },
    { id: "social", name: "Social Media", icon: MessageCircle, description: "Social media links and profiles" },
    { id: "contact", name: "Contact Info", icon: Phone, description: "Contact details and WhatsApp" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage your website content, settings, and information</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>

        {permissionError && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800 mb-2">Firestore Permission Error</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    You need to update your Firestore security rules to allow write access.
                  </p>
                  <div className="bg-yellow-100 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 mb-2">Run this command to get the correct security rules:</p>
                    <code className="bg-yellow-200 px-2 py-1 rounded text-xs font-mono">
                      npm run setup-enhanced-firestore-rules
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
                <button
                  onClick={fetchContent}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {success && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-green-800 font-medium">{success}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader className="border-b bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Content Management</CardTitle>
                <CardDescription>Edit and manage all aspects of your website content</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {tabs.find((tab) => tab.id === activeTab)?.name}
              </div>
            </div>
          </CardHeader>

          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <nav className="flex overflow-x-auto px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-4 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  title={tab.description}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <CardContent className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Welcome to your admin dashboard. Use the tabs above to manage different sections of your website.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tabs.slice(1).map((tab) => (
                    <Card
                      key={tab.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <tab.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{tab.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tab.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Getting Started</h3>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <li>
                          • <strong>Hero Section:</strong> Update your main banner and call-to-action
                        </li>
                        <li>
                          • <strong>Logo Management:</strong> Upload and manage company and partner logos
                        </li>
                        <li>
                          • <strong>Contact Info:</strong> Set up phone numbers, WhatsApp, and business hours
                        </li>
                        <li>
                          • <strong>Social Media:</strong> Connect your social media profiles
                        </li>
                      </ul>
                      <div className="mt-4 text-sm">
                        <p className="text-blue-800 dark:text-blue-200">
                          <strong>AR:</strong> البدء - ابدأ بتحديث القسم الرئيسي وإعداد معلومات الاتصال
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hero" && (
              <HeroEditor
                content={content.hero}
                onSave={(heroContent) => saveContent({ ...content, hero: heroContent })}
                saving={saving}
              />
            )}
            {activeTab === "about" && (
              <AboutEditor
                content={content.about}
                onSave={(aboutContent) => saveContent({ ...content, about: aboutContent })}
                saving={saving}
              />
            )}
            {activeTab === "services" && (
              <ServicesEditor
                content={content.services}
                onSave={(servicesContent) => saveContent({ ...content, services: servicesContent })}
                saving={saving}
              />
            )}
            {activeTab === "partners" && (
              <PartnersEditor
                content={content.partners}
                onSave={(partnersContent) => saveContent({ ...content, partners: partnersContent })}
                saving={saving}
              />
            )}
            {activeTab === "logos" && <LogoEditor />}
            {activeTab === "social" && <SocialMediaEditor />}
            {activeTab === "contact" && <ContactInfoEditor />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
