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
import { useRef, useEffect, useState } from 'react';

interface Category {
  _id: string;
  title: string;
  Image: {
    secure_url: string;
    public_id: string;
  };
}

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [categories, setCategories] = useState<Category[]>([]);
  
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = locale === 'ar'
          ? 'https://tasis-al-bina.onrender.com/category/getAllCategoryTitleImageAR/?size=6'
          : 'https://tasis-al-bina.onrender.com/category/getAllCategoryTitleImageEN/?size=6';

        const response = await fetch(apiUrl);
        const data = await response.json();
        setCategories(data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [locale]);

  return (
    <section className="  bg-white overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#20284D] mb-3 sm:mb-4">
            {t('sectionTitle')}
          </h2>
          <div className="w-24 sm:w-32 md:w-[224px] h-0.5 bg-[#AA9554] mx-auto mb-6 sm:mb-8" />
          <p className="text-base sm:text-lg md:text-xl text-[#666] max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
            {t('sectionDescription')}
          </p>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Navigation Buttons - Larger screens */}
          <div className="hidden lg:block">
            <button
              ref={prevRef}
              className="absolute -left-8 xl:-left-12 top-1/2 transform -translate-y-1/2 w-14 h-14 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-[#20284D] hover:text-white transition-colors duration-300 z-10 shadow-lg group"
            >
              {isRTL ? 
                <ChevronRight className="w-7 h-7 text-[#20284D] group-hover:text-white transition-colors duration-300" /> : 
                <ChevronLeft className="w-7 h-7 text-[#20284D] group-hover:text-white transition-colors duration-300" />
              }
            </button>
            <button
              ref={nextRef}
              className="absolute -right-8 xl:-right-12 top-1/2 transform -translate-y-1/2 w-14 h-14 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-[#20284D] hover:text-white transition-colors duration-300 z-10 shadow-lg group"
            >
              {isRTL ? 
                <ChevronLeft className="w-7 h-7 text-[#20284D] group-hover:text-white transition-colors duration-300" /> : 
                <ChevronRight className="w-7 h-7 text-[#20284D] group-hover:text-white transition-colors duration-300" />
              }
            </button>
          </div>

          {/* Slider Container */}
          <div className="px-0 sm:px-4 md:px-6 lg:px-0">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
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
                480: { slidesPerView: 1.5, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              onInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="!pb-12"
            >
              {categories.map((category) => (
                <SwiperSlide key={category._id}>
                  <div className="group">
                    <div className="relative overflow-hidden rounded-2xl aspect-[0.8] h-[280px] sm:h-[380px] md:h-[450px] lg:h-[500px] shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]">
                      <Image
                        src={category.Image.secure_url}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 480px) 85vw, (max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/80" />
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-8 text-right transform transition-transform duration-500">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                          {category.title}
                        </h3>
                        <Link 
                          href={`/projects/${category._id}`}
                          className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-[#AA9554] text-[#AA9554] rounded-full text-base sm:text-lg font-medium hover:bg-[#AA9554] hover:text-white transition-all duration-300 transform hover:scale-105 group-hover:bg-[#AA9554] group-hover:text-white"
                        >
                          {t('viewProject')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Buttons - Mobile */}
          <div className="lg:hidden flex justify-center gap-4 mt-6">
            <button
              ref={prevRef}
              className="w-12 h-12 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-[#20284D] hover:text-white transition-colors duration-300 shadow-md group"
            >
              {isRTL ? 
                <ChevronRight className="w-6 h-6 text-[#20284D] group-hover:text-white transition-colors duration-300" /> : 
                <ChevronLeft className="w-6 h-6 text-[#20284D] group-hover:text-white transition-colors duration-300" />
              }
            </button>
            <button
              ref={nextRef}
              className="w-12 h-12 border-2 border-[#20284D] rounded-full flex items-center justify-center bg-white hover:bg-[#20284D] hover:text-white transition-colors duration-300 shadow-md group"
            >
              {isRTL ? 
                <ChevronLeft className="w-6 h-6 text-[#20284D] group-hover:text-white transition-colors duration-300" /> : 
                <ChevronRight className="w-6 h-6 text-[#20284D] group-hover:text-white transition-colors duration-300" />
              }
            </button>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16 md:mt-20">
          <Link 
            href="/projects"
            className="inline-flex items-center px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-[#20284D] border-2 border-[#20284D] rounded-xl text-xl sm:text-2xl md:text-3xl font-bold hover:bg-[#20284D] hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            {t('viewMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
