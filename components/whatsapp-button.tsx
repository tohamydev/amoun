"use client"

import { PhoneIcon as WhatsApp } from "lucide-react"
import { useState, useEffect } from "react"
import { getContactInfo, type ContactInfo } from "@/lib/firebase-collections"

export default function WhatsAppButton() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await getContactInfo()
        setContactInfo(data)
      } catch (error) {
        console.error("Error loading contact info:", error)
      }
    }

    loadContactInfo()
  }, [])

  const handleClick = () => {
    const message = encodeURIComponent("Hello! I would like assistance regarding your products.")
    const whatsappNumber = contactInfo?.whatsapp || "+201004724510"
    const cleanNumber = whatsappNumber.replace(/\D/g, "")
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition duration-300"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsApp className="w-6 h-6" />
    </button>
  )
}
