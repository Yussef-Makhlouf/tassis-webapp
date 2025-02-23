import Image from "next/image"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import ClientOnly from "./ClientOnly"

export default function Hero() {
  const t = useTranslations()
  
  return (
    <ClientOnly>
    <div className="relative h-[85vh] lg:h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="/image1.png"
        >
          <source src="/tasis.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <Image
            src="/image1.png"
            alt="Modern building"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={100}
          />
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[rgba(32,39,71,0.80)] to-[rgba(32,39,71,0.95)]">
        <div className="container mx-auto px-6 h-full flex items-center justify-center">
          <div className="max-w-4xl text-center space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                         font-bold text-white 
                         leading-[1.4] tracking-wide
                         drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <span className=" mb-4">{t('hero.title')} </span>
              <span className=" text-[#AA9554]">{t('hero.subtitle')}</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl 
                       text-white/90
                       leading-[1.8] tracking-wide
                       max-w-3xl mx-auto">
              {t('hero.description')}
            </p>

            {/* CTA Button */}
            {/* <div className="pt-8 flex justify-center">
              <Link 
                href="/contact"
                className="inline-block bg-[#AA9554] text-white
                         px-12 py-4 rounded-xl
                         text-xl font-semibold
                         transform transition-all duration-300
                         hover:bg-[#20284D] hover:scale-105
                         shadow-lg"
              >
                {t('nav.contact')}
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </ClientOnly>
  )
}
