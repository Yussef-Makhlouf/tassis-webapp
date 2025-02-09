// 'use client'
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import { useRef, useState, useEffect } from 'react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import Image from 'next/image';

// interface Review {
//   _id: string;
//   name: string;
//   description: string;
//   country: string;
//   rate: number;
//   Image: {
//     secure_url: string;
//     public_id: string;
//   };
// }

// interface ReviewResponse {
//   message: string;
//   reviews: Review[];
// }

// export default function Testimonials() {
//   const prevRef = useRef<HTMLButtonElement>(null);
//   const nextRef = useRef<HTMLButtonElement>(null);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/review/');
//         const data: ReviewResponse = await response.json();
//         setReviews(data.reviews);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   if (loading) {
//     return (
//       <section className="relative py-24">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16 ">Loading...</div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative py-24">
//       <div className="container mx-auto px-4">
//         {/* Section Title */}
//         <div className="text-center mb-16">
//           <h2 className="text-[40px] font-bold text-[#20284D] leading-[75px] mb-4">
//             اراء عملاءنا
//             <div className="w-[224px] h-1 bg-[#AA9554] mx-auto mt-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
//           </h2>
//         </div>

//         {/* Testimonials Slider */}
//         <div className="relative max-w-[1400px] mx-auto">
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             spaceBetween={30}
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
//               640: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 },
//             }}
//             onInit={(swiper) => {
//               // @ts-ignore
//               swiper.params.navigation.prevEl = prevRef.current;
//               // @ts-ignore
//               swiper.params.navigation.nextEl = nextRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//             }}
//           >
// {reviews.map((review) => (
//   <SwiperSlide key={review._id}>
//     <div className="bg-white border-2 border-[#20284D] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-8 flex flex-col h-[513px]">
//       {/* Image Container */}
//       <div className="flex-shrink-0 flex justify-center items-center mb-8">
//         <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#AA9554]">
//           <Image
//             src={review.Image.secure_url}
//             alt={review.name}
//             fill
//             className="object-cover"
//           />
//         </div>
//       </div>

//       {/* Stars */}
//       <div className="flex justify-center gap-[3px] mb-8">
//         {[...Array(review.rate)].map((_, i) => (
//           <div key={i} className="w-[42px] h-[42px] flex items-center justify-center">
//             <Star className="w-6 h-6 text-[#FFA500] fill-current" />
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="flex-grow flex flex-col justify-end">
//         <p className="text-[25px] leading-[48px] text-[#20284D] text-center mb-6">
//           {review.description}
//         </p>
//         <div className="text-center">
//           <p className="text-[25px] leading-[47px] text-[#20284D] font-normal">
//             {review.name}
//           </p>
//           <p className="text-[20px] text-[#AA9554]">
//             {review.country}
//           </p>
//         </div>
//       </div>
//     </div>
//   </SwiperSlide>
// ))}
//           </Swiper>

//           {/* Navigation Buttons */}
//           <button
//             ref={prevRef}
//             className="absolute left-[-45px] top-1/2 transform -translate-y-1/2 w-[69px] h-[68px] border-3 border-[#20284D] rounded-full flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-white hover:bg-gray-50 transition-colors z-10"
//           >
//             <ChevronLeft className="w-10 h-10 text-[#001A72]" />
//           </button>
//           <button
//             ref={nextRef}
//             className="absolute right-[-45px] top-1/2 transform -translate-y-1/2 w-[69px] h-[68px] border-3 border-[#20284D] rounded-full flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-white hover:bg-gray-50 transition-colors z-10"
//           >
//             <ChevronRight className="w-10 h-10 text-[#001A72]" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

interface Review {
  _id: string;
  name: string;
  description: string;
  country: string;
  rate: number;
  Image: {
    secure_url: string;
    public_id: string;
  };
}

interface ReviewResponse {
  message: string;
  reviews: Review[];
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:8080/review/');
        const data: ReviewResponse = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">{t('loading')}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#20284D] leading-[75px] mb-4">
            {t('title')}
            <div className="w-[224px] h-1 bg-[#AA9554] mx-auto mt-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
          </h2>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
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
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="bg-white border-2 border-[#20284D] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-8 flex flex-col h-[513px]">
                  <div className="flex-shrink-0 flex justify-center items-center mb-8">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#AA9554]">
                      <Image
                        src={review.Image.secure_url}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center gap-[3px] mb-8">
                    {[...Array(review.rate)].map((_, i) => (
                      <div key={i} className="w-[42px] h-[42px] flex items-center justify-center">
                        <Star className="w-6 h-6 text-[#FFA500] fill-current" />
                      </div>
                    ))}
                  </div>

                  <div className="flex-grow flex flex-col justify-end">
                    <p className="text-[25px] leading-[48px] text-[#20284D] text-center mb-6">
                      {review.description}
                    </p>
                    <div className="text-center">
                      <p className="text-[25px] leading-[47px] text-[#20284D] font-normal">
                        {review.name}
                      </p>
                      <p className="text-[20px] text-[#AA9554]">
                        {review.country}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className="absolute left-[-45px] top-1/2 transform -translate-y-1/2 w-[69px] h-[68px] border-3 border-[#20284D] rounded-full flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-white hover:bg-gray-50 transition-colors z-10"
          >
            {isRTL ? <ChevronRight className="w-10 h-10 text-[#001A72]" /> : <ChevronLeft className="w-10 h-10 text-[#001A72]" />}
          </button>
          <button
            ref={nextRef}
            className="absolute right-[-45px] top-1/2 transform -translate-y-1/2 w-[69px] h-[68px] border-3 border-[#20284D] rounded-full flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-white hover:bg-gray-50 transition-colors z-10"
          >
            {isRTL ? <ChevronLeft className="w-10 h-10 text-[#001A72]" /> : <ChevronRight className="w-10 h-10 text-[#001A72]" />}
          </button>
        </div>
      </div>
    </section>
  );
}
