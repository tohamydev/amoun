'use client'

import Image from 'next/image'

const partners = [
  { name: 'Partner 1', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-Jatjj6qpZgwhdx9Q9SkiUnL7GrEfjk.svg' },
  { name: 'Partner 2', logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-iI0WS0PBkZiCixHcfUnGBduTFJCEVZ.svg' },
]

export default function Partners() {
  return (
    <section id="partners" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Partners</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="relative w-full overflow-hidden">
          {/* Gradient masks for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-r from-white dark:from-gray-800 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-[100px] z-10 bg-gradient-to-l from-white dark:from-gray-800 to-transparent"></div>
          
          {/* Scrolling container */}
          <div className="flex space-x-12 partners-scroll whitespace-nowrap py-8">
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <div key={`first-${index}`} className="flex-none">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`second-${index}`} className="flex-none">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            We collaborate with industry leaders to deliver exceptional chemical solutions and drive innovation in various sectors.
          </p>
        </div>
      </div>
    </section>
  )
}

