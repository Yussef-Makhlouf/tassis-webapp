// import { useState } from "react";
import AboutUs from "@/components/AboutUs";
import Blog from "@/components/Blog";
import Consultation from "@/components/Consultation";
import Contact from "@/components/Contact";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FeatureSection from "@/components/FeatureSection";
// import Pagination from "@/components/Pagination";


export default function Home() {
  // const [currentPage, setCurrentPage] = useState(1);

  return (
    <div 
      className="min-h-screen w-full bg-white overflow-x-hidden" 
      style={{ fontFamily: 'Cairo, sans-serif' }}
    >
      <Navbar />
      {/* Hero Section - Full height on mobile */}
      <div className="min-h-[100vh] md:min-h-[90vh]">
        <Hero />
      </div>

      {/* Main Content with Responsive Spacing */}
      <main>
        <div className="space-y-24">
          {/* Cards Grid Section */}
          <section className="py-16">
            <FeatureCards />
          </section>

          {/* Projects Section */}
          <section className="py-16">
            <Projects />
          </section>

          {/* About Section */}
          <section className="py-16">
            <AboutUs />
          </section>

          {/* Consultation Section */}
          <section className="py-16">
            <Consultation />
          </section>

          {/* Services Section */}
          <section className="py-16">
            <Services />
          </section>

          {/* Testimonials Section */}
          <section className="py-16">
            <Testimonials />
          </section>

          {/* Partners Section */}
          <section className="py-16">
            <Partners />
          </section>

          {/* Blog Section */}
          <section className="py-16">
            <Blog />
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <Contact />
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <FAQ />
          </section>
        </div>
        <FeatureSection />
        {/* Footer Section */}
        <Footer />
      </main>
    </div>
  );
}