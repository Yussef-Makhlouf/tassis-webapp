// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import Image from 'next/image'
// import Partners from '@/components/Partners'
// import Contact from '@/components/Contact'

// export default function AboutPage() {
//   return (
//     <main className="min-h-screen bg-white">
      
//       {/* Navbar - Completely Separate */}
//       <header className="bg-white  top-0 left-0 right-0 shadow-md">
//         <Navbar />
//       </header>

//       {/* Hero Section - Starts Below Navbar */}
//       <section className="relative mt-[90px] h-[285px] bg-[url('/about-hero.jpg')] bg-cover bg-center">
//         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//           <h1 className="text-4xl md:text-5xl font-bold text-white">من نحن</h1>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-20 px-4 md:px-0">
//         <div className="container mx-auto">

//           {/* Section 1 - About Us */}
//           <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-24">
//             <div className="w-full md:w-1/2">
//               <Image 
//                 src="/about1.jpg" 
//                 alt="عن الشركة"
//                 width={657} 
//                 height={430} 
//                 className="rounded-[30px] shadow-lg   transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//             <div className="w-full md:w-1/2 text-right">
//               <h2 className="text-[30px] md:text-[35px] font-bold text-[#20284D] mb-2">من نحن</h2>
//               <div className="w-[115px] h-[4px] bg-[#AA9554] mb-6"></div>
//               <p className="text-[22px] md:text-[25px] leading-[35px] md:leading-[40px] text-gray-700">
//                 نحن في شركة تأسيس البناء للتطوير العقاري نسعى إلى تقديم حلول عقارية مبتكرة تجمع بين الجودة 
//                 والشفافية لتلبية احتياجات عملائنا. تأسست شركتنا على أساس القيم الراسخة والخبرة الممتدة في مجال 
//                 التطوير العقاري، لنكون شريككم الأمثل في تحقيق أحلامكم السكنية والاستثمارية.
//               </p>
//             </div>
//           </div>

//           {/* Section 2 - Our Vision */}
//           <div className="flex flex-col md:flex-row items-center gap-10 mb-24">
//             <div className="w-full md:w-1/2">
//               <Image 
//                 src="/about2.jpg" 
//                 alt="رؤيتنا"
//                 width={666} 
//                 height={430} 
//                 className="rounded-[30px] shadow-lg   transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//             <div className="w-full md:w-1/2 text-right">
//               <h2 className="text-[30px] md:text-[35px] font-bold text-[#20284D] mb-2">رؤيتنا</h2>
//               <div className="w-[83px] h-[4px] bg-[#AA9554] mb-6"></div>
//               <p className="text-[22px] md:text-[25px] leading-[35px] md:leading-[40px] text-gray-700">
//                 نحن نؤمن بأن العقارات ليست مجرد مبانٍ، بل هي أساس حياة متوازنة ومستدامة. 
//                 نعمل على تقديم مشاريع ذات قيمة عالية وتصميمات مميزة تلبي طموحات عملائنا.
//               </p>
//             </div>
//           </div>

//           {/* Section 3 - Our Mission */}
//           <div className="flex flex-col md:flex-row-reverse items-center gap-10">
//             <div className="w-full md:w-1/2">
//               <Image 
//                 src="/about3.jpg" 
//                 alt="مهمتنا"
//                 width={667} 
//                 height={430} 
//                 className="rounded-[30px] shadow-lg   transition-transform duration-300 hover:scale-105"
//               />
//             </div>
//             <div className="w-full md:w-1/2 text-right">
//               <h2 className="text-[30px] md:text-[35px] font-bold text-[#20284D] mb-2">مهمتنا</h2>
//               <div className="w-[112px] h-[4px] bg-[#AA9554] mb-6"></div>
//               <p className="text-[22px] md:text-[25px] leading-[35px] md:leading-[40px] text-gray-700">
//                 أن نصبح الاسم الأول في سوق العقارات، معتمدين على التميز في الخدمة، الابتكار في التصميم، 
//                 والالتزام الكامل بتوقعات العملاء.
//               </p>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* Partners Section */}
//       <section className="bg-gray-100 py-20">
//         <div className="container mx-auto">
//           <Partners />
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-20">
//         <div className="container mx-auto">
//           <Contact />
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </main>
//   )
// }
'use client';
import ClientOnly from '@/components/ClientOnly';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import { useTranslations, useLocale } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('aboutPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <ClientOnly>
      <main className="min-h-screen bg-white">
        <header className="bg-white top-0 left-0 right-0 shadow-md">
          <Navbar />
        </header>

        <section className="relative mt-[90px] h-[285px] bg-[url('/aboutHeader.png')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className={`text-4xl md:text-5xl font-bold text-white ${isRTL ? 'font-cairo' : ''}`}>
              {t('hero.title')}
            </h1>
          </div>
        </section>

        <section className="py-20 px-4 md:px-0">
          <div className="container mx-auto">
            {/* Section 1 - About Us */}
            <div className={`flex flex-col ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 mb-24`}>
              <div className="w-full md:w-1/2">
                <Image
                  src="/about.png"
                  alt={t('section1.imageAlt')}
                  width={657}
                  height={430}
                  className="rounded-[30px] transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className={`w-full md:w-1/2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex flex-col ${isRTL ? 'items-start' : 'items-start'}`}>
                  <h2 className={`text-[30px] md:text-[35px] font-bold text-[#20284D] mb-2 ${isRTL ? 'font-cairo' : ''}`}>
                    {t('section1.title')}
                  </h2>
                  <div className="w-[115px] h-[4px] bg-[#AA9554] mb-6"></div>
                </div>
                <p className={`text-[22px] md:text-[25px] leading-[35px] md:leading-[40px] text-gray-700 ${isRTL ? 'font-cairo' : ''}`}>
                  {t('section1.description')}
                </p>
              </div>
            </div>

            {/* Section 2 - Our Vision */}
            <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 mb-24`}>
              <div className="w-full md:w-1/2">
                <Image
                  src="/about2.png"
                  alt={t('section2.imageAlt')}
                  width={666}
                  height={430}
                  className="rounded-[30px] transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className={`w-full md:w-1/2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex flex-col ${isRTL ? 'items-start' : 'items-start'}`}>
                  <h2 className={`text-[30px] md:text-[35px] font-bold text-[#20284D] mb-2 ${isRTL ? 'font-cairo text-right' : ''}`}>
                    {t('section2.title')}
                  </h2>
                  <div className="w-[83px] h-[4px] bg-[#AA9554] mb-6"></div>
                </div>
                <p className={`text-[22px] md:text-[25px] leading-[35px] md:leading-[40px] text-gray-700 ${isRTL ? 'font-cairo' : ''}`}>
                  {t('section2.description')}
                </p>
              </div>
            </div>

            {/* Section 3 - Our Mission */}
            <div className={`flex flex-col ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10`}>
              <div className="w-full md:w-1/2">
                <Image
                  src="/about3.png"
                  alt={t('section3.imageAlt')}
                  width={667}
                  height={430}
                  className="rounded-[30px] transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className={`w-full md:w-1/2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`flex flex-col ${isRTL ? 'items-start' : 'items-start'}`}>
                  <h2 className={`text-[30px] md:text-[35px] font-bold text-[#20284D] mb-2 ${isRTL ? 'font-cairo text-right' : 'font-cairo'}`}>
                    {t('section3.title')}
                  </h2>
                  <div className="w-[112px] h-[4px] bg-[#AA9554] mb-6"></div>
                </div>
                <p className={`text-[22px] md:text-[25px] leading-[35px] md:leading-[40px] text-gray-700 ${isRTL ? 'font-cairo ' : ''}`}>
                  {t('section3.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto">
            <Partners />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto">
            <Contact />
          </div>
        </section>

        <Footer />
      </main>
    </ClientOnly>
  );
}
