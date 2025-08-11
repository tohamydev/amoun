'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import I18nProvider from '@/components/I18nProvider'

const navItems = [
  { name: 'home', href: '#home', id: 'home' },
  { name: 'products', href: '/products', id: 'products' },
  { name: 'aboutUs', href: '#about', id: 'about' },
  { name: 'services', href: '#services', id: 'services' },
  { name: 'partners', href: '#partners', id: 'partners' },
  { name: 'contactUs', href: '#contact', id: 'contact' },
]

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.dir = 'rtl'
      document.documentElement.lang = 'ar'
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
    }
  }, [i18n.language])

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 64; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash if present

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const menuPosition = i18n.language === 'ar' ? 'left-4' : 'right-4'

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-01-bPhj0Lyyp5K5vtMtuSd7vclZPOCzHj.png"
                alt="Amoun Chemicals Logo"
                width={180}
                height={50}
                priority
                className="dark:invert"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.id === 'products') {
                      window.location.href = '/products';
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t(`nav.${item.name}`)}
                </a>
              ))}
              <DarkModeToggle />
              <LanguageSwitcher />
            </div>
          </div>
          <div className={`md:hidden flex items-center ${menuPosition}`}>
            <DarkModeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.id === 'products') {
                    window.location.href = '/products';
                  } else {
                    scrollToSection(item.id);
                  }
                }}
              >
                {t(`nav.${item.name}`)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default function Navbar() {
  return (
    <I18nProvider>
      <NavbarContent />
    </I18nProvider>
  )
}
