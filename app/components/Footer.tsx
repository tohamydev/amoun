"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram, Youtube } from "lucide-react"
import { getSocialMedia, getLogos, type SocialMedia, type Logos } from "@/lib/firebase-collections"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Partners", href: "#partners" },
  { name: "Contact Us", href: "#contact" },
]

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return Facebook
    case "twitter":
      return Twitter
    case "linkedin":
      return LinkedIn
    case "instagram":
      return Instagram
    case "youtube":
      return Youtube
    default:
      return Facebook
  }
}

export default function Footer() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia | null>(null)
  const [logos, setLogos] = useState<Logos | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [socialData, logoData] = await Promise.all([getSocialMedia(), getLogos()])
        setSocialMedia(socialData)
        setLogos(logoData)
      } catch (error) {
        console.error("Error loading footer data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const socialLinks = socialMedia
    ? [
        { name: "Facebook", href: socialMedia.facebook, platform: "facebook" },
        { name: "Twitter", href: socialMedia.twitter, platform: "twitter" },
        { name: "LinkedIn", href: socialMedia.linkedin, platform: "linkedin" },
        { name: "Instagram", href: socialMedia.instagram, platform: "instagram" },
        { name: "YouTube", href: socialMedia.youtube, platform: "youtube" },
      ].filter((link) => link.href && link.href.trim() !== "")
    : []

  const logoSrc =
    logos?.mainLogo ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-01-bPhj0Lyyp5K5vtMtuSd7vclZPOCzHj.png"

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="Amoun Chemicals Logo"
            width={180}
            height={50}
            className="mb-4 md:mb-0 invert"
          />
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-blue-400">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-4">
            {!loading && socialLinks.length > 0 ? (
              socialLinks.map((link) => {
                const IconComponent = getSocialIcon(link.platform)
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{link.name}</span>
                    <IconComponent className="h-6 w-6" />
                  </a>
                )
              })
            ) : loading ? (
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 bg-gray-600 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              // Fallback social links if no data available
              <div className="text-gray-500 text-sm">Social links not configured</div>
            )}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Amoun Chemicals. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
