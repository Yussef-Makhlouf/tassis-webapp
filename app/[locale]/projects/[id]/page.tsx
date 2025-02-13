// 'use client';
// import Image from "next/image";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import FeatureSection from "@/components/FeatureSection";
// import { MapPinIcon, RulerIcon, BedDoubleIcon, BathIcon, CarIcon } from "lucide-react";

// export default function ProjectDetails() {
//   return (
//     <main className="min-h-screen bg-white">
//       <Navbar />
      
//       <div className="container max-w-[1312px] mx-auto px-4 pt-32">
//         {/* Title Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-[#20284D] text-[40px] font-bold">
//             تفاصيل المشروع
//           </h1>
//           <div className="w-[224px] h-1 bg-[#AA9554] mx-auto mt-4" />
//         </div>

//         {/* Project Location & Contact */}
//         <div className="flex justify-between items-center mb-8">
//           {/* Contact Button */}
//           <button className="flex items-center gap-2 border-2 border-[#20284D] 
//             rounded-[10px] px-5 py-2 text-[#20284D] font-bold text-[20px] 
//             hover:bg-[#20284D] hover:text-white transition-colors">
//             <MapPinIcon className="w-6 h-6 text-[#AA9554] group-hover:text-white" />
//             تواصل معنا
//           </button>

//           {/* Location & Project ID */}
//           <div className="flex items-center gap-6 text-[#20284D] text-[18px]">
//             <span>الرياض - حي النخيل</span>
//             <span className="flex items-center gap-2">
//               <i className="fas fa-user text-[20px]"></i> مساحة المشروع: 250M²
//             </span>
//           </div>
//         </div>

//         {/* Project Summary */}
//         <div className="w-full bg-white border-2 border-[#20284D] rounded-[20px] p-6 shadow-lg mb-16">
//           <h2 className="text-[#20284D] text-[20px] font-bold mb-2">
//             نبذة عن المشروع
//           </h2>
//           <p className="text-[#20284D] text-[18px] leading-[32px] text-right">
//             ترتكز استراتيجية أعمالنا على الابتكار والقدرة على التكيف. انطلاقاً من الرياض، نركّز جهودنا بشكل 
//             استراتيجي على مجموعة متنوعة من المشاريع، بما في ذلك المشاريع السكنية والتجارية، والضيافة، 
//             وتجارة التجزئة، والوجهات السياحية، والمشاريع العامة، مما يعكس الطبيعة المتعددة لعلامتنا التجارية.
//           </p>
//         </div>

//         {/* Project Listings */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//           {Array.from({ length: 9 }).map((_, index) => (
//             <div
//               key={index}
//               className="bg-white border-2 border-[#20284D] rounded-[20px] shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
//             >
//               {/* Project Image */}
//               <div className="relative h-[322px] border-b-2 border-[#20284D]">
//                 <Image
//                   src="/project.jpg"
//                   alt="صورة المشروع"
//                   fill
//                   className="object-cover hover:scale-110 transition-transform duration-500"
//                 />
//                 {/* Status Labels */}
//                 <div className={`absolute top-4 left-4 px-6 py-2 rounded-md font-bold text-[20px]
//                   ${index % 3 === 0 ? 'bg-[#54AA61] text-white' : 
//                     index % 3 === 1 ? 'bg-[#AA9554] text-white' : 
//                     'border-2 border-[#EC260F] text-[#EC260F]'}`}>
//                   {index % 3 === 0 ? 'متاحة للبيع' : 
//                    index % 3 === 1 ? 'للايجار' : 'تم البيع'}
//                 </div>
//               </div>

//               {/* Project Info */}
//               <div className="p-6">
//                 <h2 className="text-[#20284D] text-[25px] font-bold text-center mb-6">
//                   مشروع العزبة
//                 </h2>

//                 {/* Icons */}
//                 <div className="flex justify-center gap-8 mb-6">
//                   <RulerIcon className="w-6 h-6 text-[#20284D]" />
//                   <BedDoubleIcon className="w-6 h-6 text-[#20284D]" />
//                   <BathIcon className="w-6 h-6 text-[#20284D]" />
//                   <CarIcon className="w-6 h-6 text-[#20284D]" />
//                 </div>

//                 {/* Specs */}
//                 <div className="flex justify-between text-[#20284D] text-[16px] mb-6">
//                   <span>250m</span>
//                   <span>3</span>
//                   <span>4</span>
//                   <span>2</span>
//                 </div>

//                 {/* Price and Button Container */}
//                 <div className="flex items-center justify-between gap-4">
//                   <div className="flex items-center gap-2">
//                     <span className="text-[#20284D] text-[24px] font-bold">550</span>
//                     <span className="text-[#20284D] text-[16px]">ريال</span>
//                   </div>
                  
//                   <button className="flex-1 py-4 border-2 border-[#AA9554] text-[#AA9554] 
//                                    font-bold text-[20px] rounded-xl hover:bg-[#AA9554] 
//                                    hover:text-white transition-colors duration-300">
//                     تفاصيل المشروع
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <FeatureSection />
//       <Footer />
//     </main>
//   );
// }
'use client';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  const params = useParams();
  const [units, setUnits] = useState<Unit[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const categoryId = params?.id as string;

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
    return <div>Loading...</div>;
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Available for sale':
        return 'bg-[#54AA61] text-white';
      case 'available for rent':
        return 'bg-[#AA9554] text-white';
      case 'Reserved':
        return 'bg-[#F59E0B] text-white';
      case 'Rented/Leased':
        return 'bg-[#AA9554] text-white';
      case 'Sold':
        return 'border-2 border-[#EC260F] text-[#EC260F]';
      case 'Unavailable':
        return 'bg-[#6B7280] text-white';
      default:
        return 'bg-[#54AA61] text-white';
    }
  };
  

  return (
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
              <Image src="/sizes/location1.png" alt="location" width={20} height={20} />
              <span>{category?.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/sizes/location2.png" alt="area" width={20} height={20} />
              <span>مساحة المشروع: {category?.area}M²</span>
            </div>
          </div>

          <div className="text-[#20284D] text-[18px] max-w-xl">
            <p>{category?.description}</p>
          </div>
        </div>

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
                <div className={`absolute top-4 left-4 px-6 py-2 rounded-md font-bold text-[20px] ${getStatusStyle(unit.status)}`}>
                  {unit.status}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-[#20284D] text-[25px] font-bold text-center mb-6">
                  {unit.title} - {unit.type}
                </h2>

                <div className="flex justify-center gap-12 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <Image src="/sizes/size3.png" alt="area" width={32} height={32} />
                    <span className="text-[#20284D] text-[16px]">{unit.area}m</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Image src="/sizes/size2.png" alt="rooms" width={32} height={32} />
                    <span className="text-[#20284D] text-[16px]">{unit.rooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Image src="/sizes/size1.png" alt="bathrooms" width={32} height={32} />
                    <span className="text-[#20284D] text-[16px]">{unit.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Image src="/sizes/size4.png" alt="parking" width={32} height={32} />
                    <span className="text-[#20284D] text-[16px]">{unit.parking}</span>
                  </div>
                </div>
                
                <div className="flex flex-row-reverse items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#20284D] text-[24px] font-bold">{unit.price}</span>
                    <span className="text-[#20284D] text-[16px]">ريال</span>
                  </div>
                  <Link
                    href={`projects/${unit._id}`}
                    className="flex-1 py-4 border-2 border-[#AA9554] text-[#AA9554] font-bold text-[20px] rounded-xl hover:bg-[#AA9554] hover:text-white transition-colors duration-300 text-center"
                  >
                    تفاصيل المشروع
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
  );
}
