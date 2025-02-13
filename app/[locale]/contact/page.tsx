import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientOnly from '@/components/ClientOnly'

export default function ContactPage() {
  return (
    <ClientOnly>
    <main className="min-h-screen relative">
      <Navbar />
      <div className="pt-20">
     
        <Contact />
      </div>
      <Footer />
    </main>
    </ClientOnly>
  )
}
