export default function AboutUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">About Us</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              At Amoun Chemicals, we strive to provide innovative and sustainable chemical solutions to meet the evolving needs of industries worldwide. Our mission is to contribute to the growth and success of our clients through high-quality products and exceptional service.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Commitment to quality and safety</li>
              <li>Innovation and continuous improvement</li>
              <li>Environmental responsibility</li>
              <li>Customer-centric approach</li>
              <li>Integrity and transparency</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            With over 20 years of experience in the chemical industry, Amoun Chemicals has established itself as a leader in providing cutting-edge solutions to diverse sectors, including pharmaceuticals, agriculture, and manufacturing.
          </p>
        </div>
      </div>
    </section>
  )
}

