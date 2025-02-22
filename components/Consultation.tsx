'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import ClientOnly from './ClientOnly'

const ConsultationModal = dynamic(() => import('./ConsultationModal'), {
  ssr: false
})

export default function Consultation() {
  const t = useTranslations('consultation')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ClientOnly>
    <>
   
      <div className="relative w-full px-4 ">
        <div className="max-w-[1306px] mx-auto bg-[#20284D]/90 rounded-[25px] md:rounded-[50px]  ">
          <div className="flex flex-col items-center justify-center text-center px-4 py-16">
            <h3 className="text-xl md:text-2xl lg:text-[25px] font-bold text-white mb-4 md:mb-6 lg:mb-8">
              {t('title')}
            </h3>
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-white mb-8 md:mb-10 lg:mb-12 max-w-[669px] leading-normal md:leading-relaxed">
              {t('question')}
            </h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 bg-white border-2 border-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 group"
            >
              <span className="text-xl md:text-2xl lg:text-[30px] font-bold text-[#20284D] group-hover:text-[#AA9554] transition-colors">
                {t('cta')}
              </span>
            </button>
          </div>
        </div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    </>
    </ClientOnly>
  )
}
