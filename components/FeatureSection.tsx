'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const features = [
  { title: { ar: "قريب من جميع الخدمات", en: "Close to All Services" }, icon: "/service.svg" },
  { title: { ar: "مدخل وخزانات وعدادات وصكوك مستقلة", en: "Independent Entrance, Tanks, Meters & Deeds" }, icon: "/Upgrade.svg" },
  { title: { ar: "كراج سيارة", en: "Car Garage" }, icon: "/TaxiRank.svg" },
  { title: { ar: "حدائق جانبية", en: "Side Gardens" }, icon: "/ParkBench.svg" },
  { title: { ar: "إشراف الأعمال من قبل مهندسين معتمدين", en: "Work Supervision by Certified Engineers" }, icon: "/Engineer.svg" },
  { title: { ar: "مصعد راكب للدور العلوي", en: "Passenger Elevator to Upper Floor" }, icon: "/Elevator.svg" }
]

export default function FeatureSection() {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <section className="relative w-full my-16 lg:my-32">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12 lg:mb-24"
      >
        <div className="bg-white px-6 sm:px-12 py-6 sm:py-8 rounded-full border-2 border-[#20284D] shadow-[0px_4px_14px_rgba(0,0,0,0.25)] max-w-[800px] mx-auto">
          <h2 className={`text-[#20284D] text-xl sm:text-2xl lg:text-[33px] font-bold leading-tight text-center ${isRTL ? 'font-cairo' : 'font-sans'}`}>
            {isRTL ? 'مميزات شركة تاسيس البناء للتطوير العقاري' : 'Features of Tasees Al-Bina Real Estate Development Company'}
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#20284D]">
        <div className="relative h-[300px] lg:h-[846px]">
          <Image
            src="/features.png"
            alt="Location Map"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#20284D]/50" />
        </div>

        <div className={`p-8 lg:p-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <div className="flex flex-col gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: isRTL ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`flex items-center gap-6 group hover:translate-x-2 transition-all duration-300 ${isRTL ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-14 h-14 lg:w-20 lg:h-20 relative flex-shrink-0 bg-[#AA9554]/20 rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#AA9554]/30">
                  <Image
                    src={feature.icon}
                    alt={isRTL ? feature.title.ar : feature.title.en}
                    fill
                    className="object-contain p-2.5 drop-shadow-lg"
                  />
                </div>
                <h3 className={`text-white text-xl lg:text-2xl font-bold leading-relaxed group-hover:text-[#AA9554] transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? feature.title.ar : feature.title.en}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
