// 'use client';
// import Image from 'next/image';
// import { z } from 'zod';
// import { useState, FormEvent } from 'react';

// const contactSchema = z.object({
//   senderName: z.string().min(2, 'الاسم مطلوب').max(50, 'الاسم طويل جداً'),
//   senderEmail: z.string().email('البريد الإلكتروني غير صحيح'),
//   phone: z.string().regex(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, 'رقم الجوال غير صحيح'),
//   messageContent: z.string().min(1, 'الرسالة مطلوبة').max(500, 'الرسالة طويلة جداً')
// });

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     senderName: '',
//     senderEmail: '',
//     phone: '',
//     messageContent: ''
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrors({});
//     setSubmitStatus(null);

//     try {
//       const validatedData = contactSchema.parse(formData);
//       const response = await fetch('http://localhost:8080/message/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(validatedData)
//       });

//       if (!response.ok) throw new Error('Failed to submit');
      
//       setFormData({
//         senderName: '',
//         senderEmail: '',
//         phone: '',
//         messageContent: ''
//       });
//       setSubmitStatus('success');
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const formattedErrors: Record<string, string> = {};
//         error.errors.forEach(err => {
//           if (err.path) formattedErrors[err.path[0]] = err.message;
//         });
//         setErrors(formattedErrors);
//       } else {
//         setSubmitStatus('error');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <section className="py-24 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-[40px] font-bold text-[#20284D] leading-[75px] mb-4">
//             تواصل معنا
//           </h2>
//           <div className="w-[224px] h-1 bg-[#AA9554] mx-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1400px] mx-auto">
//         <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#20284D]">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7960960420257!2d46.6893654!3d24.7136225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNix2YrYp9i2INin2YTYs9i52YjYr9mK2Kk!5e0!3m2!1sar!2ssa!4v1709917391044!5m2!1sar!2ssa"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen={true}
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           />
//         </div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="flex flex-col">
//               <label className="text-[#20284D] text-right mb-2">
//                 الاسم
//               </label>
//               <input
//                 type="text"
//                 name="senderName"
//                 value={formData.senderName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-[#20284D] rounded-lg text-right ${
//                   errors.senderName ? 'border-red-500' : ''
//                 }`}
//               />
//               {errors.senderName && (
//                 <span className="text-red-500 text-sm text-right mt-1">{errors.senderName}</span>
//               )}
//             </div>

//             <div className="flex flex-col">
//               <label className="text-[#20284D] text-right mb-2">
//                 رقم الجوال
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-[#20284D] rounded-lg text-right ${
//                   errors.phone ? 'border-red-500' : ''
//                 }`}
//               />
//               {errors.phone && (
//                 <span className="text-red-500 text-sm text-right mt-1">{errors.phone}</span>
//               )}
//             </div>

//             <div className="flex flex-col">
//               <label className="text-[#20284D] text-right mb-2">
//                 البريد الالكتروني
//               </label>
//               <input
//                 type="email"
//                 name="senderEmail"
//                 value={formData.senderEmail}
//                 onChange={handleChange}
//                 className={`w-full p-3 border border-[#20284D] rounded-lg text-right ${
//                   errors.senderEmail ? 'border-red-500' : ''
//                 }`}
//               />
//               {errors.senderEmail && (
//                 <span className="text-red-500 text-sm text-right mt-1">{errors.senderEmail}</span>
//               )}
//             </div>

//             <div className="flex flex-col">
//               <label className="text-[#20284D] text-right mb-2">
//                 الرسالة
//               </label>
//               <textarea
//                 name="messageContent"
//                 value={formData.messageContent}
//                 onChange={handleChange}
//                 rows={4}
//                 className={`w-full p-3 border border-[#20284D] rounded-lg text-right resize-none ${
//                   errors.messageContent ? 'border-red-500' : ''
//                 }`}
//               />
//               {errors.messageContent && (
//                 <span className="text-red-500 text-sm text-right mt-1">{errors.messageContent}</span>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-[#20284D] text-white py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
//             >
//               {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
//             </button>

//             {submitStatus === 'success' && (
//               <p className="text-green-500 text-center">تم إرسال رسالتك بنجاح</p>
//             )}
//             {submitStatus === 'error' && (
//               <p className="text-red-500 text-center">حدث خطأ أثناء إرسال رسالتك</p>
//             )}
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';
import Image from 'next/image';
import { z } from 'zod';
import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const contactSchema = z.object({
  senderName: z.string().min(2).max(50),
  senderEmail: z.string().email(),
  phone: z.string().regex(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/),
  messageContent: z.string().min(1).max(500)
});

export default function Contact() {
  const locale = useLocale();
  const t = useTranslations('contact');
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    phone: '',
    messageContent: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);

    try {
      const validatedData = contactSchema.parse(formData);
      const response = await fetch('http://localhost:8080/message/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData)
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setFormData({
        senderName: '',
        senderEmail: '',
        phone: '',
        messageContent: ''
      });
      setSubmitStatus('success');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) formattedErrors[err.path[0]] = t(`validation.${err.path[0]}`);
        });
        setErrors(formattedErrors);
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white">
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7960960420257!2d46.6893654!3d24.7136225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2z2KfZhNix2YrYp9i2INin2YTYs9i52YjYr9mK2Kk!5e0!3m2!1sar!2ssa!4v1709917391044!5m2!1sar!2ssa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <div className="flex flex-col">
              <label className={`text-[#20284D] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('name')}
              </label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={(e) => setFormData(prev => ({ ...prev, senderName: e.target.value }))}
                className={`w-full p-3 border border-[#20284D] rounded-lg ${
                  locale === 'ar' ? 'text-right' : 'text-left'
                } ${errors.senderName ? 'border-red-500' : ''}`}
              />
              {errors.senderName && (
                <span className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {errors.senderName}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className={`text-[#20284D] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full p-3 border border-[#20284D] rounded-lg ${
                  locale === 'ar' ? 'text-right' : 'text-left'
                } ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <span className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className={`text-[#20284D] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('email')}
              </label>
              <input
                type="email"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, senderEmail: e.target.value }))}
                className={`w-full p-3 border border-[#20284D] rounded-lg ${
                  locale === 'ar' ? 'text-right' : 'text-left'
                } ${errors.senderEmail ? 'border-red-500' : ''}`}
              />
              {errors.senderEmail && (
                <span className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {errors.senderEmail}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className={`text-[#20284D] mb-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('message')}
              </label>
              <textarea
                name="messageContent"
                value={formData.messageContent}
                onChange={(e) => setFormData(prev => ({ ...prev, messageContent: e.target.value }))}
                rows={4}
                className={`w-full p-3 border border-[#20284D] rounded-lg resize-none ${
                  locale === 'ar' ? 'text-right' : 'text-left'
                } ${errors.messageContent ? 'border-red-500' : ''}`}
              />
              {errors.messageContent && (
                <span className={`text-red-500 text-sm mt-1 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  {errors.messageContent}
                </span>
              )}
            </div>

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
  );
}
