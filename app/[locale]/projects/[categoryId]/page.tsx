// 'use client';
// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import FeatureSection from "@/components/FeatureSection";
// import Link from 'next/link';
// import { useLocale, useTranslations } from 'next-intl';
// import { useParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import ClientOnly from "@/components/ClientOnly";

// interface Category {
//   _id: string;
//   title: string;
//   description: string;
//   Image: {
//     secure_url: string;
//     public_id: string;
//   };
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
//   area: number;
//   location: string;
// }

// interface Unit {
//   _id: string;
//   title: string;
//   description: string;
//   images: {
//     secure_url: string;
//     public_id: string;
//     _id: string;
//   }[];
//   status: string;
//   area: number;
//   rooms: number;
//   bathrooms: number;
//   parking: number;
//   price: number;
//   location: string;
//   type: string;
//   livingrooms: number;
//   customId: string;
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
//   maidRoom: number;
//   cameras: number;
//   waterTank: number;
//   guard: number;
//   nearbyPlaces: [{place: string, timeInMinutes: number}];
// }

// export default function ProjectDetails() {
//   const locale = useLocale();
//   const t = useTranslations('projectDetails');
//   const params = useParams();
//   const [units, setUnits] = useState<Unit[]>([]);
//   const [category, setCategory] = useState<Category | null>(null);
//   const [loading, setLoading] = useState(true);

//   const categoryId = params?.categoryId as string;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [unitsResponse, categoryResponse] = await Promise.all([
//           fetch(locale === 'ar'
//             ? `http://localhost:8080/unit/getAllUnitByCategoryIdAR/${categoryId}`
//             : `http://localhost:8080/unit/getAllUnitByCategoryIdEN/${categoryId}`),
//           fetch(`http://localhost:8080/category/getOne/${categoryId}`)
//         ]);

//         const unitsData = await unitsResponse.json();
//         const categoryData = await categoryResponse.json();

//         setUnits(unitsData.units);
//         setCategory(categoryData.category);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [locale, categoryId]);

//   if(loading) {
//     return <div>{t('loading')}</div>;
//   }

//   function getStatusStyle(status: string) {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <ClientOnly>
//       <main className="min-h-screen bg-white">
//         <Navbar />
        
//         <div className="container max-w-[1312px] mx-auto px-4 pt-32">
//           <div className="text-center mb-8">
//             <h1 className="text-[#20284D] text-[40px] font-bold">
//               {category?.title}
//             </h1>
//             <div className="w-[224px] h-1 bg-[#AA9554] mx-auto mt-4" />
//           </div>

//           <div className="flex justify-between items-start mb-8">
//             <div className="flex flex-col gap-3 text-[#20284D] text-[18px]">
//               <div className="flex items-center gap-2">
//                 <Image src="/sizes/location1.png" alt={t('location')} width={20} height={20} />
//                 <span>{category?.location}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Image src="/sizes/location2.png" alt={t('area')} width={20} height={20} />
//                 <span>{t('area')} {category?.area} {t('areaUnit')}</span>
//               </div>
//             </div>

//             <div className="text-[#20284D] text-[18px] max-w-xl">
//               <p>{category?.description}</p>
//             </div>
//           </div>

//           {/* Units Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//             {units.map((unit) => (
//               <div key={unit._id} className="bg-white border-2 border-[#20284D] shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
//                 <div className="relative h-[322px] border-b-2 border-[#20284D]">
//                   <Image
//                     src={unit.images[0].secure_url}
//                     alt={unit.title}
//                     fill
//                     className="object-cover hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className={`absolute top-4 left-4 px-6 py-2 rounded-md font-bold text-[20px] ${getStatusStyle(unit.status)}`}>
//                     {t(`status.${unit.status}`)}
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <h2 className="text-[#20284D] text-[25px] font-bold text-center mb-6">
//                     {unit.title} - {t(`types.${unit.type}`)}
//                   </h2>

//                   <div className="flex justify-center gap-12 mb-6">
//                     <div className="flex flex-col items-center gap-2">
//                       <Image src="/sizes/size3.png" alt={t('area')} width={32} height={32} />
//                       <span className="text-[#20284D] text-[16px]">{unit.area}{t('areaUnit')}</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-2">
//                       <Image src="/sizes/size2.png" alt={t('rooms')} width={32} height={32} />
//                       <span className="text-[#20284D] text-[16px]">{unit.rooms}</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-2">
//                       <Image src="/sizes/size1.png" alt={t('bathrooms')} width={32} height={32} />
//                       <span className="text-[#20284D] text-[16px]">{unit.bathrooms}</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-2">
//                       <Image src="/sizes/size4.png" alt={t('parking')} width={32} height={32} />
//                       <span className="text-[#20284D] text-[16px]">{unit.parking}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-row-reverse items-center justify-between gap-4">
//                     <div className="flex items-center gap-2">
//                       <span className="text-[#20284D] text-[24px] font-bold">{unit.price}</span>
//                       <span className="text-[#20284D] text-[16px]">{t('currency')}</span>
//                     </div>
//                     <Link
//                       href={`projects/${unit._id}`}
//                       className="flex-1 py-4 border-2 border-[#AA9554] text-[#AA9554] font-bold text-[20px] rounded-xl hover:bg-[#AA9554] hover:text-white transition-colors duration-300 text-center"
//                     >
//                       {t('viewDetails')}
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <FeatureSection />
//         <Footer />
//       </main>
//     </ClientOnly>
//   );
// }
'use client';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ClientOnly from "@/components/ClientOnly";

interface Category {
  _id: string;
  title: string;
  description: string;
  Image: {
    secure_url: string;
    public_id: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  area: number;
  location: string;
}

interface Unit {
  _id: string;
  title: string;
  description: string;
  images: {
    secure_url: string;
    public_id: string;
    _id: string;
  }[];
  status: string;
  area: number;
  rooms: number;
  bathrooms: number;
  parking: number;
  price: number;
  location: string;
  type: string;
  livingrooms: number;
  customId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  maidRoom: number;
  cameras: number;
  waterTank: number;
  guard: number;
  nearbyPlaces: [{place: string, timeInMinutes: number}];
}

export default function ProjectDetails() {
  const locale = useLocale();
  const t = useTranslations('projectDetails');
  const params = useParams();
  const [units, setUnits] = useState<Unit[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const categoryId = params?.categoryId as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitsResponse, categoryResponse] = await Promise.all([
          fetch(locale === 'ar'
            ? `http://localhost:8080/unit/getAllUnitByCategoryIdAR/${categoryId}`
            : `http://localhost:8080/unit/getAllUnitByCategoryIdEN/${categoryId}`),
          fetch(`http://localhost:8080/category/getOne/${categoryId}`)
        ]);

        const unitsData = await unitsResponse.json();
        const categoryData = await categoryResponse.json();

        setUnits(unitsData.units);
        setCategory(categoryData.category);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [locale, categoryId]);

  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#AA9554]"></div>
      </div>
    );
  }


  return (
    <ClientOnly>
      <main className="min-h-screen bg-white">
        <Navbar />
        
        <div className="container max-w-[1312px] mx-auto px-4 pt-32">
          <div className="text-center mb-8">
            <h1 className="text-[#20284D] text-[40px] font-bold">
              {category?.title}
            </h1>
            <div className="w-[224px] h-1 bg-[#AA9554] mx-auto mt-4" />
          </div>

          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col gap-3 text-[#20284D] text-[18px]">
              <div className="flex items-center gap-2">
                <Image src="/sizes/location1.png" alt={t('location')} width={20} height={20} />
                <span>{category?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/sizes/location2.png" alt={t('area')} width={20} height={20} />
                <span>{t('area')} {category?.area} {t('areaUnit')}</span>
              </div>
            </div>

            <div className="text-[#20284D] text-[18px] max-w-xl">
              <p>{category?.description}</p>
            </div>
          </div>

          {/* Units Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {units.map((unit) => (
              <div key={unit._id} className="bg-white border-2 border-[#20284D] shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="relative h-[322px] border-b-2 border-[#20284D]">
                  <Image
                    src={unit.images[0].secure_url}
                    alt={unit.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 left-4 px-6 py-2 rounded-md font-bold text-[20px] ${(unit.status)}`}>
                    {t(`status.${unit.status}`)}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-[#20284D] text-[25px] font-bold text-center mb-6">
                    {/*  - {t(`types.${unit.type}`)} */}{unit.title}
                  </h2>

                  <div className="flex justify-center gap-12 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/sizes/size3.png" alt={t('area')} width={32} height={32} />
                      <span className="text-[#20284D] text-[16px]">{unit.area}{t('areaUnit')}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/sizes/size2.png" alt={t('rooms')} width={32} height={32} />
                      <span className="text-[#20284D] text-[16px]">{unit.rooms}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/sizes/size1.png" alt={t('bathrooms')} width={32} height={32} />
                      <span className="text-[#20284D] text-[16px]">{unit.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/sizes/size4.png" alt={t('parking')} width={32} height={32} />
                      <span className="text-[#20284D] text-[16px]">{unit.parking}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row-reverse items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#20284D] text-[24px] font-bold">{unit.price}</span>
                      <span className="text-[#20284D] text-[16px]">{t('currency')}</span>
                    </div>
                    <Link
                      href={`projects/${unit._id}`}
                      className="flex-1 py-4 border-2 border-[#AA9554] text-[#AA9554] font-bold text-[20px] rounded-xl hover:bg-[#AA9554] hover:text-white transition-colors duration-300 text-center"
                    >
                      {t('viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FeatureSection />
        <Footer />
      </main>
    </ClientOnly>
  );
}
