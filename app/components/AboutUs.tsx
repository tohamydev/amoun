import { useTranslation } from 'react-i18next'

export default function AboutUs() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('about.title')}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('about.mission.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.mission.description')}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('about.values.title')}</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {t('about.values.items', { returnObjects: true }).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {t('about.experience')}
          </p>
        </div>
      </div>
    </section>
  )
}

