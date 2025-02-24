'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import ClientOnly from './ClientOnly'

const services = [
  { id: 1, key: 'rental' },
  { id: 2, key: 'communication' },
  { id: 3, key: 'maintenance' },

]

export default function Services() {
  const t = useTranslations('services')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ClientOnly>
    <section >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#20284D] leading-tight mb-4 max-w-[588px] mx-auto">
            {t('afterSaleTitle')}
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {services.map((service) => (
            <div key={service.id} className="relative pt-12 flex flex-col items-center group">
              <div className="absolute -top-6 w-16 h-16 md:w-20 md:h-20 lg:w-[92px] lg:h-[91px] bg-[#20284D] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#AA9554] transition-colors duration-300">
                <span className="font-bold text-3xl md:text-4xl lg:text-[60px] text-white">
                  {service.id}
                </span>
              </div>

              <div className="w-full bg-white border-2 border-[#20284D] rounded-[20px] shadow-lg p-6 md:p-8 lg:p-10 min-h-[180px] flex items-center justify-center group-hover:border-[#AA9554] transition-colors duration-300">
                <p className="font-bold text-lg md:text-xl lg:text-[20px] text-center text-[#20284D] group-hover:text-[#AA9554] transition-colors duration-300">
                  {t(`items.${service.key}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </ClientOnly>
  )
}
