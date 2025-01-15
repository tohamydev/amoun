import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Partners', href: '#partners' },
  { name: 'Contact Us', href: '#contact' },
]

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: LinkedIn },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-01-bPhj0Lyyp5K5vtMtuSd7vclZPOCzHj.png"
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
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Amoun Chemicals. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

