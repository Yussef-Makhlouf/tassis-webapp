// import Image from "next/image"

// const features = [
//   {
//     title: "أهدافنا",
//     description: "تقديم مشاريع عقارية متميزة تجمع ما بين التصميم الهندسي الحديث و تصل إلى مستويات الرفاهية في السكن والترفيه",
//     icon: "/curved/medal-star.svg",
//     style: "bg-[#20284D]",
//     styleText: "text-[#AA9554]"
//   },
//   {
//     title: "رؤيتنا",
//     description: "أن نكون رواداً في صناعة التطوير العقاري من خلال تقديم خدمات تتوافق مع المعايير المحلي والدولي",
//     icon: "/curved/Vector.svg"
//   },
//   {
//     title: "طموحنا",
//     description: "نسعى إلى أن نكون الخيار الأول للتطوير العقاري في كل مستوى من مستويات المجتمع وأحواله",
//     icon: "/curved/status-up.svg"
//   },
// ]

// export default function FeatureCards() {
//   return (
//     <div className="relative z-10 -mt-32">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
//           {features.map((feature, index) => (
//             <div 
//               key={feature.title}
//               className="bg-white rounded-2xl p-10 
//                          shadow-lg text-center 
//                          w-full max-w-[380px]
//                          min-h-[400px] flex flex-col
//                          hover:transform hover:-translate-y-1 
//                          transition-all duration-300"
//             >
//               {/* Icon Container */}
//               <div className="mb-8 flex justify-center">
//                 <Image 
//                   src={feature.icon} 
//                   alt={feature.title}
//                   width={80} 
//                   height={80}
//                   className="w-20 h-20"
//                 />
//               </div>

//               {/* Title */}
//               <h3 className="text-3xl font-bold text-[#20284D] mb-6">
//                 {feature.title}
//               </h3>

//               {/* Description */}
//               <p className="text-[#20284D]/80 text-xl leading-[1.8] max-w-[280px] mx-auto flex-grow">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import Image from "next/image"
import { useTranslations } from 'next-intl'

const features = [
  {
    key: "goals",
    icon: "/curved/medal-star.svg",
    style: "bg-[#20284D]",
    styleText: "text-[#AA9554]"
  },
  {
    key: "vision",
    icon: "/shield-tick.png"
  },
  {
    key: "mission",
    icon: "/curved/status-up.svg"
  },
]

export default function FeatureCards() {
  const t = useTranslations('features')

  return (
    <div className="relative z-10 -mt-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {features.map((feature) => (
            <div 
              key={feature.key}
              className="bg-white rounded-2xl p-10 
                         shadow-lg text-center 
                         w-full max-w-[380px]
                         min-h-[400px] flex flex-col
                         hover:transform hover:-translate-y-1 
                         transition-all duration-300"
            >
              <div className="mb-8 flex justify-center">
                <Image 
                  src={feature.icon} 
                  alt={t(`${feature.key}.title`)}
                  width={80} 
                  height={80}
                  className="w-20 h-20"
                />
              </div>

              <h3 className="text-3xl font-bold text-[#20284D] mb-6">
                {t(`${feature.key}.title`)}
              </h3>

              <p className="text-[#20284D]/80 text-xl leading-[1.8] max-w-[280px] mx-auto flex-grow">
                {t(`${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
