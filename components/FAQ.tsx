'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'

interface Question {
  _id: string
  question: string
  answer: string
}

interface QuestionResponse {
  message: string
  questionData: Question[]
}

export default function FAQ() {
  const t = useTranslations('faq')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  
  const [openIndex, setOpenIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const fetchQuestions = async () => {
      try {
        const apiUrl = locale === 'ar' 
          ? 'https://tasis-al-bina.onrender.com/question/ar' 
          : 'https://tasis-al-bina.onrender.com/question/en'
        
        const response = await fetch(apiUrl)
        const data: QuestionResponse = await response.json()
        setQuestions(data.questionData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching questions:', error)
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [locale])

  if (!isClient || loading) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#20284D] mb-4 font-cairo drop-shadow-lg">
            {t('title')}
          </h2>
          <div className="w-[278px] h-1 bg-[#AA9554] mx-auto shadow-md" />
        </div>

        <div className="max-w-[1312px] mx-auto space-y-14">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-white border border-black rounded-[20px] overflow-hidden"
            >
              <div 
                className="relative p-8 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button
                    className={`w-[37px] h-[37px] border ${
                      openIndex === index ? 'bg-[#20284D] border-black' : 'border-[#20284D]'
                    } rounded-full flex items-center justify-center transition-all duration-300`}
                  >
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180 text-white' : 'text-[#20284D]'
                      }`}
                    />
                  </button>
                  <h3 className={`flex-1 text-xl font-bold text-[#20284D] ${isRTL ? 'text-right' : 'text-left'} font-readex`}>
                    {question.question}
                  </h3>
                </div>

                {openIndex === index && (
                  <>
                    <div className="w-full h-[1px] bg-[#AA9554] my-8 shadow-md" />
                    <p className={`text-[#20284D] ${isRTL ? 'text-right' : 'text-left'} text-lg leading-relaxed font-readex`}>
                      {question.answer}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
