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
import { MapPinIcon, RulerIcon, BedDoubleIcon, BathIcon, CarIcon } from "lucide-react";
import Link from 'next/link';


export default function ProjectDetails() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container max-w-[1312px] mx-auto px-4 pt-32">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-[#20284D] text-[40px] font-bold">
            تفاصيل المشروع
          </h1>
          <div className="w-[224px] h-1 bg-[#AA9554] mx-auto mt-4" />
        </div>

        {/* Project Location & Contact */}
        <div className="flex justify-between items-start mb-8">
  {/* Location & Project ID */}
  <div className="flex flex-col gap-3 text-[#20284D] text-[18px]">
    <div className="flex items-center gap-2">
      <Image src="/sizes/location1.png" alt="location" width={20} height={20} />
      <span>الرياض - حي النخيل</span>
    </div>
    <div className="flex items-center gap-2">
      <Image src="/sizes/location2.png" alt="area" width={20} height={20} />
      <span>مساحة المشروع: 250M²</span>
    </div>
  </div>

  {/* Contact Button */}
  <button className="flex items-center gap-2 border-2 border-[#20284D] 
    rounded-[10px] px-5 py-2 text-[#20284D] font-bold text-[20px] 
    hover:bg-[#20284D] hover:text-white transition-colors">
    <Image src="/sizes/location3.png" alt="contact" width={24} height={24} />
   عرض المشروع
  </button>
</div>
        {/* Project Summary */}
        <h2 className="text-[#20284D] text-[20px] font-bold mb-4">
          نبذة عن المشروع
        </h2>
        <div className="w-full bg-white border-2 border-[#20284D] rounded-[20px] p-6 shadow-lg mb-16">
          <p className="text-[#20284D] text-[18px] leading-[32px] text-right">
            ترتكز استراتيجية أعمالنا على الابتكار والقدرة على التكيف. انطلاقاً من الرياض، نركّز جهودنا بشكل 
            استراتيجي على مجموعة متنوعة من المشاريع، بما في ذلك المشاريع السكنية والتجارية، والضيافة، 
            وتجارة التجزئة، والوجهات السياحية، والمشاريع العامة، مما يعكس الطبيعة المتعددة لعلامتنا التجارية.
          </p>
        </div>

        {/* Project Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border-2 border-[#20284D] shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Project Image */}
              <div className="relative h-[322px] border-b-2 border-[#20284D]">
                <Image
                  src="/image1.png"
                  alt="صورة المشروع"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
                {/* Status Labels */}
                <div className={`absolute top-4 left-4 px-6 py-2 rounded-md font-bold text-[20px]
                  ${index % 3 === 0 ? 'bg-[#54AA61] text-white' : 
                    index % 3 === 1 ? 'bg-[#AA9554] text-white' : 
                    'border-2 border-[#EC260F] text-[#EC260F]'}`}>
                  {index % 3 === 0 ? 'متاحة للبيع' : 
                   index % 3 === 1 ? 'للايجار' : 'تم البيع'}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h2 className="text-[#20284D] text-[25px] font-bold text-center mb-6">
                  مشروع العزبة
                </h2>

{/* Icons and Specs Container */}
<div className="flex justify-center gap-12 mb-6">
  {/* Area */}
  <div className="flex flex-col items-center gap-2">
    <Image src="/sizes/size3.png" alt="area" width={32} height={32} />
    <span className="text-[#20284D] text-[16px]">250m</span>
  </div>

  {/* Bedrooms */}
  <div className="flex flex-col items-center gap-2">
    <Image src="/sizes/size2.png" alt="bedrooms" width={32} height={32} />
    <span className="text-[#20284D] text-[16px]">3</span>
  </div>

  {/* Bathrooms */}
  <div className="flex flex-col items-center gap-2">
    <Image src="/sizes/size1.png" alt="bathrooms" width={32} height={32} />
    <span className="text-[#20284D] text-[16px]">4</span>
  </div>

  {/* Parking */}
  <div className="flex flex-col items-center gap-2">
    <Image src="/sizes/size4.png" alt="parking" width={32} height={32} />
    <span className="text-[#20284D] text-[16px]">2</span>
  </div>
</div>


                {/* Price and Button Container */}
                <div className="flex flex-row-reverse items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#20284D] text-[24px] font-bold">550</span>
                    <span className="text-[#20284D] text-[16px]">ريال</span>
                  </div>
                  
<Link 
  href={`/projects/${index}/details`}
  className="flex-1 py-4 border-2 border-[#AA9554] text-[#AA9554] 
           font-bold text-[20px] rounded-xl hover:bg-[#AA9554] 
           hover:text-white transition-colors duration-300 text-center"
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
