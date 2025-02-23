// 'use clint'
// import Image from 'next/image';
// import { useState, useEffect, useRef } from 'react';
// const Counter = ({ end, duration = 2000 }) => {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           let start = 0;
//           const step = end / (duration / 16);
//           const timer = setInterval(() => {
//             start += step;
//             if (start > end) {
//               setCount(end);
//               clearInterval(timer);
//             } else {
//               setCount(Math.floor(start));
//             }
//           }, 16);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.5 }
//     );

//     if (countRef.current) {
//       observer.observe(countRef.current);
//     }

//     return () => observer.disconnect();
//   }, [end, duration]);

//   return <span ref={countRef}>{count}</span>;
// };

// const statistics = [
//   {
//     number: '+888',
//     label: 'مساحات الراضي'
//   },
//   {
//     number: '+100',
//     label: 'مشروع'
//   },
//   {
//     number: '+8788',
//     label: 'عدد الوحدات السكنية'
//   },
//   {
//     number: '+98787',
//     label: 'مساحات الراضي'
//   }
// ];

// export default function AboutUs() {
//   return (
//     <section className="py-12 md:py-20  bg-white">
//       <div className="container mx-auto px-4">
//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row-reverse items-start gap-8 lg:gap-16 mb-16 lg:mb-24">
//           {/* Image Section */}
//           <div className="w-full lg:w-1/2">
//             <div className="relative w-full aspect-[4/3] lg:h-[423px] rounded-[20px] md:rounded-[41px] overflow-hidden shadow-lg">
//               <Image
//                 src="/about.png"
//                 alt="Riyadh Skyline"
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               />
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="w-full lg:w-1/2 text-right">
//             <h2 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-[#20284D] leading-tight lg:leading-[94px] mb-6 lg:mb-8 relative">
//               من نحن
//               <div className="absolute -bottom-4 right-0 w-[60px] h-1 bg-[#AA9554]" />
//             </h2>
//             <p className="text-lg md:text-xl lg:text-[25px] leading-relaxed lg:leading-[40px] text-black">
//               نحن في شركة تأسيس البناء للتطوير العقاري نسعى إلى تقديم حلول عقارية مبتكرة تجمع بين الجودة والشفافية لتلبية احتياجات عملائنا. تأسست شركتنا على أساس القيم الراسخة والخبرة الممتدة في مجال التطوير العقاري، لنكون شريككم الأمثل في تحقيق أحلامكم السكنية والاستثمارية.
//             </p>
//           </div>
//         </div>

// {/* Statistics Section */}
// <div className="mt-16 lg:mt-24">
//   <h2 className="text-center text-3xl md:text-4xl lg:text-[40px] font-bold text-[#20284D] mb-12 lg:mb-16 relative">
//     الاحصائيات
//     <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#AA9554]" />
//   </h2>
  
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
//     {statistics.map((stat, index) => (
//       <div 
//         key={index}
//         className="relative p-6 md:p-8 rounded-[15px] border-2 border-[#20284D] text-center hover:bg-[#20284D]/5 transition-colors duration-300"
//       >
//         <h3 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-[#20284D] mb-2 font-cairo">
//           <Counter end={parseInt(stat.number)} duration={2000} />
//           {stat.number.includes('+') && '+'}
//         </h3>
//         <p className="text-base md:text-lg lg:text-[20px] text-[#20284D]">
//           {stat.label}
//         </p>
//       </div>
//     ))}
//   </div>
// </div>
//       </div>
//     </section>
//   );
// } 

'use client'
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import ClientOnly from './ClientOnly';

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start > end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count}</span>;
};

const statistics = [
  {
    key: 'landArea',
    number: '+888',
  },
  {
    key: 'projects',
    number: '+100',
  },
  {
    key: 'housingUnits',
    number: '+8788',
  },
  {
    key: 'totalArea',
    number: '+98787',
  }
];

export default function AboutUs() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <ClientOnly>
    <section className=" bg-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col lg:flex-row${isRTL ? '-reverse' : ''} items-start gap-8 lg:gap-16 mb-16 lg:mb-24`}>
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] lg:h-[423px] rounded-[20px] md:rounded-[41px] overflow-hidden shadow-lg">
              <Image
                src="/about.png"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className={`w-full lg:w-1/2 text-${isRTL ? 'right' : 'left'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-[#20284D] leading-tight lg:leading-[94px] mb-6 lg:mb-8 relative">
              {t('title')}
              <div className={`absolute -bottom-4 ${isRTL ? 'right-0' : 'left-0'} w-[60px] h-1 bg-[#AA9554]`} />
            </h2>
            <p className="text-lg md:text-xl lg:text-[25px] leading-relaxed lg:leading-[40px] text-black">
              {t('description')}
            </p>
          </div>
        </div>


        <div className="mt-16 lg:mt-24">
          <h2 className="text-center text-3xl md:text-4xl lg:text-[40px] font-bold text-[#20284D] mb-12 lg:mb-16 relative">
            {t('statistics.title')}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[60px] h-1 bg-[#AA9554]" />
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {statistics.map((stat) => (
              <div 
                key={stat.key}
                className="relative p-6 md:p-8 rounded-[15px] border-2 border-[#20284D] text-center hover:bg-[#20284D]/5 transition-colors duration-300"
              >
                <h3 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-[#20284D] mb-2 font-cairo">
                  <Counter end={parseInt(stat.number)} duration={2000} />
                  {stat.number.includes('+') && '+'}
                </h3>
                <p className="text-base md:text-lg lg:text-[20px] text-[#20284D]">
                  {t(`statistics.${stat.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </ClientOnly>
  );
}
