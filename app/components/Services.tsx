import { Beaker, Truck, FlaskRoundIcon as Flask } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Services() {
  const { t } = useTranslation()

  const services = [
    {
      title: t('services.manufacturing.title'),
      description: t('services.manufacturing.description'),
      icon: Beaker,
    },
    {
      title: t('services.supplyChain.title'),
      description: t('services.supplyChain.description'),
      icon: Truck,
    },
    {
      title: t('services.customFormulations.title'),
      description: t('services.customFormulations.description'),
      icon: Flask,
    },
  ]

  return (
    <section id="services" className="bg-gray-100 dark:bg-gray-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('services.title')}</h2>
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

