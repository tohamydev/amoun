import Image from 'next/image'

const partners = [
  { name: 'TechChem Inc.', logo: '/placeholder.svg' },
  { name: 'GreenSolutions', logo: '/placeholder.svg' },
  { name: 'PharmaLink', logo: '/placeholder.svg' },
  { name: 'AgriChem Co.', logo: '/placeholder.svg' },
]

export default function Partners() {
  return (
    <section id="partners" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Partners</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                width={150}
                height={150}
                className="mb-4"
              />
              <p className="text-lg font-semibold text-gray-800">{partner.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700">
            We collaborate with industry leaders to deliver exceptional chemical solutions and drive innovation in various sectors.
          </p>
        </div>
      </div>
    </section>
  )
}

