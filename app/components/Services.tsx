import { Beaker, Truck, FlaskRoundIcon as Flask } from 'lucide-react'

const services = [
  {
    title: 'Chemical Manufacturing',
    description: 'State-of-the-art facilities producing high-quality chemicals for various industries.',
    icon: Beaker,
  },
  {
    title: 'Supply Chain Solutions',
    description: 'Efficient and reliable distribution network ensuring timely delivery of products.',
    icon: Truck,
  },
  {
    title: 'Custom Formulations',
    description: 'Tailored chemical solutions to meet your specific requirements and challenges.',
    icon: Flask,
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-gray-100 dark:bg-gray-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <service.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

