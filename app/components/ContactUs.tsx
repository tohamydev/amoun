"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react"
import { getContactInfo, type ContactInfo } from "@/lib/firebase-collections"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await getContactInfo()
        setContactInfo(data)
      } catch (error) {
        console.error("Error loading contact info:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContactInfo()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    if (contactMethod === "whatsapp") {
      const message = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      )
      const whatsappNumber = contactInfo?.whatsapp || "+2010044724510"
      const cleanNumber = whatsappNumber.replace(/\D/g, "")
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank")
      setSubmitMessage("WhatsApp opened with your message.")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("Thank you for your message. We will get back to you soon!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        console.error("Error response:", result)
        setSubmitMessage(`There was an error sending your message: ${result.error || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitMessage("There was an error sending your message. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayPhone = contactInfo?.phone || "+201004724510"
  const displayEmail = contactInfo?.email || "info@amounchemicals.com"
  const displayAddress = contactInfo?.address?.en || "123 Chemical Street, Cairo, Egypt"
  const displayWorkingHours = contactInfo?.workingHours?.en || "Sunday - Thursday: 9:00 AM - 6:00 PM"

  return (
    <section id="contact" className="bg-gray-100 dark:bg-gray-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Method
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="contactMethod"
                      value="email"
                      checked={contactMethod === "email"}
                      onChange={() => setContactMethod("email")}
                    />
                    <span className="ml-2">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={contactMethod === "whatsapp"}
                      onChange={() => setContactMethod("whatsapp")}
                    />
                    <span className="ml-2">WhatsApp</span>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-500 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : `Send Message via ${contactMethod === "email" ? "Email" : "WhatsApp"}`}
                </button>
              </div>
              {submitMessage && (
                <div className={`text-center ${submitMessage.includes("error") ? "text-red-600" : "text-green-600"}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-6 h-6 bg-gray-300 rounded animate-pulse mr-4 flex-shrink-0"></div>
                    <div className="h-4 bg-gray-300 rounded animate-pulse flex-1"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{displayAddress}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
                  <a
                    href={`tel:${displayPhone}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {displayPhone}
                  </a>
                </div>
                {contactInfo?.whatsapp && (
                  <div className="flex items-center">
                    <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-4 flex-shrink-0" />
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {contactInfo.whatsapp} (WhatsApp)
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
                  <a
                    href={`mailto:${displayEmail}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {displayEmail}
                  </a>
                </div>
                {contactInfo?.workingHours?.en && (
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0 mt-0.5" />
                    <div className="text-gray-700 dark:text-gray-300">
                      <p className="font-medium mb-1">Working Hours:</p>
                      <p className="text-sm whitespace-pre-line">{displayWorkingHours}</p>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="w-full h-0 pb-[56.25%] relative mt-6">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6661216416897!2d${contactInfo?.longitude || 31.233367215114705}!3d${contactInfo?.latitude || 30.044437981885595}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(`${contactInfo?.latitude || 30.044437981885595},${contactInfo?.longitude || 31.233367215114705}`)}!5e0!3m2!1sen!2sus!4v1623345678901!5m2!1sen!2sus`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
