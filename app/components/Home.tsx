import Link from 'next/link'

export default function Home() {
  return (
    <section id="home" className="relative bg-blue-600 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg.jpg-u7eZt243hcDjppOlhhCsC3G6bocY03.jpeg')",
          filter: "brightness(0.6)"
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Make the Best Deal with Us
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your trusted partner in chemical solutions
          </p>
          <div className="space-x-4">
            <Link
              href="#services"
              className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-100 transition duration-300"
              scroll={true}
            >
              Explore Services
            </Link>
            <Link
              href="#contact"
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-400 transition duration-300"
              scroll={true}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

