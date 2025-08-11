'use client'

import { PhoneIcon as WhatsApp } from 'lucide-react'

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Hello! I would like assistance regarding your products.')
    window.open(`https://wa.me/201004724510?text=${message}`, '_blank')
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
