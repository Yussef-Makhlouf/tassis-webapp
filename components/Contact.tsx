'use client'

import { z } from 'zod'
import { useState, FormEvent, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

const contactSchema = z.object({
  senderName: z.string().min(2).max(50),
  senderEmail: z.string().email(),
  phone: z.string().regex(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/),
  messageContent: z.string().min(1).max(500)
})

export default function Contact() {
  const locale = useLocale()
  const t = useTranslations('contact')
  const [isClient, setIsClient] = useState(false)
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    phone: '',
    messageContent: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus(null)

    try {
      const validatedData = contactSchema.parse(formData)
      const response = await fetch('https://tasis-al-bina.onrender.com/message/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      })

      if (!response.ok) throw new Error('Failed to submit')
      
      setFormData({
        senderName: '',
        senderEmail: '',
        phone: '',
        messageContent: ''
      })
      setSubmitStatus('success')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path) formattedErrors[err.path[0]] = t(`validation.${err.path[0]}`)
        })
        setErrors(formattedErrors)
      } else {
        setSubmitStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className=" bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#20284D] leading-[75px] mb-4">
            {t('title')}
          </h2>
          <div className="w-[224px] h-1 bg-[#AA9554] mx-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1400px] mx-auto">
          <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#20284D]">
            <iframe
              src="https://maps.app.goo.gl/uGZiRNRoWJUdbKqu6?g_st=com.google.maps.preview.copy"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {['name', 'phone', 'email', 'message'].map((field) => (
              <div key={field} className="flex flex-col">
                <label className={`text-[#20284D] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {t(field)}
                </label>
                {field === 'message' ? (
                  <textarea
                    name="messageContent"
                    value={formData.messageContent}
                    onChange={(e) => setFormData(prev => ({ ...prev, messageContent: e.target.value }))}
                    rows={4}
                    className={`w-full p-3 border border-[#20284D] rounded-lg resize-none ${
                      locale === 'ar' ? 'text-right' : 'text-left'
                    } ${errors.messageContent ? 'border-red-500' : ''}`}
                  />
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field === 'name' ? 'senderName' : field === 'email' ? 'senderEmail' : 'phone'}
                    value={formData[field === 'name' ? 'senderName' : field === 'email' ? 'senderEmail' : 'phone']}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      [field === 'name' ? 'senderName' : field === 'email' ? 'senderEmail' : 'phone']: e.target.value 
                    }))}
                    className={`w-full p-3 border border-[#20284D] rounded-lg ${
                      locale === 'ar' ? 'text-right' : 'text-left'
                    } ${errors[field === 'name' ? 'senderName' : field === 'email' ? 'senderEmail' : 'phone'] ? 'border-red-500' : ''}`}
                  />
                )}
                {errors[field === 'name' ? 'senderName' : field === 'email' ? 'senderEmail' : field === 'phone' ? 'phone' : 'messageContent'] && (
                  <span className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {errors[field === 'name' ? 'senderName' : field === 'email' ? 'senderEmail' : field === 'phone' ? 'phone' : 'messageContent']}
                  </span>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#20284D] text-white py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? t('sending') : t('send')}
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-500 text-center">{t('successMessage')}</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-500 text-center">{t('errorMessage')}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
