import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import Partners from './components/Partners'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Home />
        <AboutUs />
        <Services />
        <Partners />
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}

