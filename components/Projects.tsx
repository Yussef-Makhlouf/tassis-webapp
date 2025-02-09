// 'use client'
// import Image from 'next/image';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { useRef } from 'react';

// const projects = [
//   {
//     id: 1,
//     title: 'مجالات 67 -حي الرمال',
//     image: '/build1.png',
//   },
//   {
//     id: 2,
//     title: 'مجالات 62 -حي المنار',
//     image: '/build2.png',
//   },
//   {
//     id: 3,
//     title: 'مجالات 55 -حي حطين',
//     image: '/build3.png',
//   },
//   {
//     id: 4,
//     title: 'مجالات 48 -حي النرجس',
//     image: '/build1.png',
//   },
//   {
//     id: 5,
//     title: 'مجالات 43 -حي الياسمين',
//     image: '/build2.png',
//   },
//   {
//     id: 6,
//     title: 'مجالات 39 -حي الملقا',
//     image: '/build3.png',
//   }
// ];

// export default function Projects() {
//   const prevRef = useRef<HTMLButtonElement>(null);
//   const nextRef = useRef<HTMLButtonElement>(null);

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4 md:px-8">
//         {/* Title Section */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-[40px] font-bold text-[#20284D] mb-4">
//             مشاريعنا
//           </h2>
//           <div className="w-32 md:w-[224px] h-[2px] bg-[#AA9554] mx-auto mb-6" />
//           <p className="text-lg md:text-xl text-[#666] max-w-3xl mx-auto leading-relaxed">
//             ترتكز استراتيجية اعمالنا على الابتكار والقدرة على التكيف، انطلاقا من الرياض نركز جهودنا بشكل استراتيجي على مجموعة متنوعة من المشاريع، بما في ذلك المشاريع السكنية والتجارية والضيافة، وتجارة التجزئة، والوجهات السياحية والمشاريع العامة، مما يعكس الطبيعة المتعددة لعلامتنا التجارية
//           </p>
//         </div>

//         {/* Projects Slider */}
//         <div className="relative max-w-[1400px] mx-auto">
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             spaceBetween={32}
//             slidesPerView={1}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             autoplay={{
//               delay: 5000,
//               disableOnInteraction: false,
//             }}
//             loop={true}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//                 spaceBetween: 24,
//               },
//               1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 32,
//               },
//             }}
//             onInit={(swiper) => {
//               // @ts-ignore
//               swiper.params.navigation.prevEl = prevRef.current;
//               // @ts-ignore
//               swiper.params.navigation.nextEl = nextRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//             }}
//             className="!pb-8"
//           >
//             {projects.map((project) => (
//               <SwiperSlide key={project.id}>
//                 <div className="relative group overflow-hidden rounded-2xl aspect-[0.8] h-[500px]">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
//                   <div className="absolute bottom-0 right-0 p-8 w-full text-right">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
//                       {project.title}
//                     </h3>
//                     <Link 
//                       href={`/projects/${project.id}`}
//                       className="px-8 py-2.5 bg-transparent border border-[#AA9554] text-[#AA9554] rounded-full text-lg hover:bg-[#AA9554] hover:text-white transition-all duration-300 transform hover:scale-105"
//                     >
//                       عرض المشروع
//                     </Link>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Navigation Buttons */}
//           <button
//             ref={prevRef}
//             className="absolute left-4 lg:-left-12 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 z-10 shadow-lg"
//           >
//             <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-[#20284D]" />
//           </button>
//           <button
//             ref={nextRef}
//             className="absolute right-4 lg:-right-12 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 z-10 shadow-lg"
//           >
//             <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#20284D]" />
//           </button>
//         </div>

//         {/* View More Button */}
//         <div className="text-center mt-16">
//           <Link 
//             href="/projects"
//             className="px-12 py-3 text-[#20284D] border-2 border-[#20284D] rounded-xl text-2xl md:text-3xl font-bold hover:bg-[#20284D] hover:text-white transition-all duration-300 transform hover:scale-105"
//           >
//             عرض المزيد
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// } 

'use client'
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    key: 'project1',
    image: '/build1.png',
  },
  {
    id: 2,
    key: 'project2',
    image: '/build2.png',
  },
  {
    id: 3,
    key: 'project3',
    image: '/build3.png',
  },
  {
    id: 4,
    key: 'project4',
    image: '/build1.png',
  },
  {
    id: 5,
    key: 'project5',
    image: '/build2.png',
  },
  {
    id: 6,
    key: 'project6',
    image: '/build3.png',
  }
];

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-20 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#20284D] mb-4">
            {t('sectionTitle')}
          </h2>
          <div className="w-32 md:w-[224px] h-[2px] bg-[#AA9554] mx-auto mb-6" />
          <p className="text-lg md:text-xl text-[#666] max-w-3xl mx-auto leading-relaxed">
            {t('sectionDescription')}
          </p>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            dir={isRTL ? 'rtl' : 'ltr'}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="!pb-8"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="relative group overflow-hidden rounded-2xl aspect-[0.8] h-[500px]">
                  <Image
                    src={project.image}
                    alt={t(`${project.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                  <div className="absolute bottom-0 right-0 p-8 w-full text-right">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {t(`${project.key}.title`)}
                    </h3>
                    <Link 
                      href={`/projects/${project.id}`}
                      className="px-8 py-2.5 bg-transparent border border-[#AA9554] text-[#AA9554] rounded-full text-lg hover:bg-[#AA9554] hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {t('viewProject')}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className="absolute left-4 lg:-left-12 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 z-10 shadow-lg"
          >
            {isRTL ? <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#20284D]" /> : <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-[#20284D]" />}
          </button>
          <button
            ref={nextRef}
            className="absolute right-4 lg:-right-12 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-gray-50 transition-all duration-300 z-10 shadow-lg"
          >
            {isRTL ? <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-[#20284D]" /> : <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-[#20284D]" />}
          </button>
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/projects"
            className="px-12 py-3 text-[#20284D] border-2 border-[#20284D] rounded-xl text-2xl md:text-3xl font-bold hover:bg-[#20284D] hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            {t('viewMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
