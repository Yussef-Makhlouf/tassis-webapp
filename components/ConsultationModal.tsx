
'use client'
import { useState, useEffect } from 'react'
import { ArrowLeftRight, X } from 'lucide-react'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ClientOnly from './ClientOnly'

const contactSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().regex(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, 'رقم الجوال غير صحيح'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط',
  }),
  acceptMarketing: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على استلام المحتوى التسويقي',
  }),
})

const weekDays = [
  { ar: 'السبت', en: 'saturday' },
  { ar: 'الأحد', en: 'sunday' },
  { ar: 'الاثنين', en: 'monday' },
  { ar: 'الثلاثاء', en: 'tuesday' },
  { ar: 'الأربعاء', en: 'wednesday' },
  { ar: 'الخميس', en: 'thursday' },
  { ar: 'الجمعة', en: 'friday' },
]

const meetingMethods = [
  { name: 'Google Meet', value: 'google_meet' },
  { name: 'Zoom', value: 'zoom' },
  { name: 'مكالمة هاتفية', value: 'phone_call' },
  { name: 'WhatsApp', value: 'whatsapp' },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('consultation')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    meetingMethod: '',
    selectedDay: '',
    email: '',
    phone: '',
    acceptTerms: false,
    acceptMarketing: false,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [step, onClose])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      contactSchema.parse(formData)
      
      const response = await fetch('http://localhost:8080/consultation/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.meetingMethod,
          email: formData.email,
          phone: formData.phone,
          selectedDay: formData.selectedDay,
          acceptTerms: formData.acceptTerms,
          acceptMarketing: formData.acceptMarketing
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to create consultation')
      }
  
      setStep(4)
    } catch (error: any) {
      const validationErrors = error.errors?.reduce((acc: any, err: any) => {
        acc[err.path[0]] = t(`errors.${err.path[0]}`)
        return acc
      }, {}) || { submit: 'Failed to submit consultation' }
      
      setErrors(validationErrors)
    } finally {
      setIsSubmitting(false)
    }
}
  

  const handleNext = () => {
    if (step === 1 && !formData.meetingMethod) {
      setErrors({ ...errors, meetingMethod: t('errors.meetingMethod') })
      return
    }
    if (step === 2 && !formData.selectedDay) {
      setErrors({ ...errors, selectedDay: t('errors.selectedDay') })
      return
    }
    if (step === 3) {
      try {
        contactSchema.parse(formData)
        setStep(prev => prev + 1)
      } catch (error: any) {
        const validationErrors = error.errors.reduce((acc: any, err: any) => {
          acc[err.path[0]] = t(`errors.${err.path[0]}`)
          return acc
        }, {})
        setErrors(validationErrors)
        return
      }
    }
    setStep(prev => prev + 1)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }


  if (!isOpen) return null

  return (
    <ClientOnly>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-0"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        {...fadeIn}
        className="relative w-full max-w-[1392px] min-h-[500px] md:h-[644px] bg-white rounded-[30px] md:rounded-[50px] shadow-2xl"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 z-10"
        >
          <X size={24} className="text-[#20284D]" />
        </motion.button>

        <div className="relative w-full h-full bg-[#20284D]/95 rounded-[25px] md:rounded-[50px] p-6 md:p-12">
          <motion.h3
            {...fadeIn}
            className="text-2xl md:text-3xl font-bold text-white mb-8 font-cairo"
          >
            {t('title')}
          </motion.h3>

          <div className="flex justify-between items-center mb-12 px-4 md:px-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center w-full">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${step >= i ? 'bg-[#AA9554] text-white' : 'bg-white text-[#20284D]'}
                    transition-all duration-300`}
                >
                  {i}
                </motion.div>
                {i < 4 && (
                  <div
                    className={`flex-1 h-[2px] mx-2
                      ${step > i ? 'bg-[#AA9554]' : 'bg-white/30'}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="h-[calc(100%-200px)] overflow-y-auto custom-scrollbar px-4">
            {step === 1 && (
              <motion.div {...fadeIn} className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-cairo">
                  {t('steps.meetingType')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {meetingMethods.map((method) => (
                    <motion.button
                      key={method.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChange('meetingMethod', method.value)}
                      className={`h-[77px] rounded-[25px] font-semibold transition-all duration-300
                        ${
                          formData.meetingMethod === method.value
                            ? 'bg-[#AA9554] text-white'
                            : 'bg-white text-[#20284D] hover:bg-[#AA9554] hover:text-white'
                        }
                        shadow-lg hover:shadow-xl`}
                    >
                      {t(`meetingMethods.${method.value}`)}
                    </motion.button>
                  ))}
                </div>
                {errors.meetingMethod && (
                  <p className="text-red-400 text-sm mt-2">{errors.meetingMethod}</p>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div {...fadeIn} className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-cairo">
                  {t('steps.selectDay')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {weekDays.map((day) => (
                    <motion.button
                      key={day.ar}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChange('selectedDay', day.ar)}
                      className={`h-[77px] rounded-[25px] font-semibold transition-all duration-300
                        ${
                          formData.selectedDay === day.ar
                            ? 'bg-[#AA9554] text-white'
                            : 'bg-white text-[#20284D] hover:bg-[#AA9554] hover:text-white'
                        }
                        shadow-lg hover:shadow-xl`}
                    >
                      {t(`weekDays.${day.en}`)}
                    </motion.button>
                  ))}
                </div>
                {errors.selectedDay && (
                  <p className="text-red-400 text-sm mt-2">{errors.selectedDay}</p>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div {...fadeIn} className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-cairo">
                  {t('steps.contactInfo')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <input
                      type="email"
                      placeholder={t('form.email')}
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full p-4 rounded-2xl border-2 border-transparent focus:border-[#AA9554] text-right outline-none transition-all duration-300"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder={t('form.phone')}
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full p-4 rounded-2xl border-2 border-transparent focus:border-[#AA9554] text-right outline-none transition-all duration-300"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-[#AA9554] rounded border-white focus:ring-[#AA9554]"
                      />
                      <span className="mr-3">{t('form.acceptTerms')}</span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-red-400 text-sm">{errors.acceptTerms}</p>
                    )}

                    <label className="flex items-center space-x-3 text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptMarketing}
                        onChange={(e) => handleChange('acceptMarketing', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-[#AA9554] rounded border-white focus:ring-[#AA9554]"
                      />
                      <span className="mr-3">{t('form.acceptMarketing')}</span>
                    </label>
                    {errors.acceptMarketing && (
                      <p className="text-red-400 text-sm">{errors.acceptMarketing}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#AA9554] text-white rounded-2xl hover:bg-[#8B7B45] transition-all duration-300 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('form.sending') : t('form.submit')}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div {...fadeIn} className="text-center space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-cairo">
                  {t('steps.thankYou')}
                </h2>
                <p className="text-white text-lg leading-relaxed">
                  {t('thankYouMessage.received')}
                  <br />
                  {t('thankYouMessage.browse')}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-white/70"
                >
                  {t('thankYouMessage.autoClose')}
                </motion.div>
              </motion.div>
            )}
          </div>

          {step < 3 && (
                 <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handleNext}
                 className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-[52px] h-[52px] 
                   bg-[#AA9554] rounded-full flex items-center justify-center
                   hover:bg-[#8B7B45] transition-all duration-300 shadow-lg hover:shadow-xl"
               >
                 <ArrowLeftRight size={24} className="text-white" />
               </motion.button>
             )}
           </div>
         </motion.div>
       </motion.div>
       </ClientOnly>
     )

   }
   
