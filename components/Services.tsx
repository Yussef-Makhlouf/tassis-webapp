// const services = [
//   {
//     id: 1,
//     title: 'إتاحة خدمة تأجير العقار وربطه إلكترونيًا دون تكاليف'
//   },
//   {
//     id: 2,
//     title: 'التواصل المستمر بين السكان والمشرف على المشروع'
//   },
//   {
//     id: 3,
//     title: 'الصيانة الدورية للمصاعد والممرات والإنارة'
//   },
//   {
//     id: 4,
//     title: 'سداد فواتير المياه وصيانة الخزانات'
//   },
//   {
//     id: 5,
//     title: 'سداد رواتب الحراس والعمال بشكل دائم'
//   },
//   {
//     id: 6,
//     title: 'سداد فاتورة الكهرباء (الخدمة) بإلتزام'
//   }
// ];

// export default function Services() {
//   return (
//     <section className="py-16 md:py-20 lg:py-24">
//       <div className="container mx-auto px-4">
//         {/* Headers */}
//         <div className="text-center mb-12 md:mb-16 lg:mb-20">
//           <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#20284D] leading-tight mb-4 max-w-[588px] mx-auto">
//             ابرز الخدمات التي نقدمها بعد البيع
//           </h2>
//           <p className="text-lg md:text-xl lg:text-[20px] text-[#AA9554] max-w-[996px] mx-auto">
//             خدمات مجانية نقدمها للسنة الأولى
//           </p>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
//           {services.map((service) => (
//             <div key={service.id} className="relative pt-12 flex flex-col items-center group">
//               {/* Number Circle */}
//               <div className="absolute -top-6 w-16 h-16 md:w-20 md:h-20 lg:w-[92px] lg:h-[91px] bg-[#20284D] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#AA9554] transition-colors duration-300">
//                 <span className="font-bold text-3xl md:text-4xl lg:text-[60px] text-white">
//                   {service.id}
//                 </span>
//               </div>

//               {/* Service Card */}
//               <div className="w-full bg-white border-2 border-[#20284D] rounded-[20px] shadow-lg p-6 md:p-8 lg:p-10 min-h-[180px] flex items-center justify-center group-hover:border-[#AA9554] transition-colors duration-300">
//                 <p className="font-bold text-lg md:text-xl lg:text-[20px] text-center text-[#20284D] group-hover:text-[#AA9554] transition-colors duration-300">
//                   {service.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// } 


import { useTranslations } from 'next-intl';

const services = [
  { id: 1, key: 'rental' },
  { id: 2, key: 'communication' },
  { id: 3, key: 'maintenance' },
  { id: 4, key: 'water' },
  { id: 5, key: 'staff' },
  { id: 6, key: 'electricity' }
];

export default function Services() {
  const t = useTranslations('services');

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#20284D] leading-tight mb-4 max-w-[588px] mx-auto">
            {t('afterSaleTitle')}
          </h2>
          <p className="text-lg md:text-xl lg:text-[20px] text-[#AA9554] max-w-[996px] mx-auto">
            {t('freeServices')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {services.map((service) => (
            <div key={service.id} className="relative pt-12 flex flex-col items-center group">
              <div className="absolute -top-6 w-16 h-16 md:w-20 md:h-20 lg:w-[92px] lg:h-[91px] bg-[#20284D] rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#AA9554] transition-colors duration-300">
                <span className="font-bold text-3xl md:text-4xl lg:text-[60px] text-white">
                  {service.id}
                </span>
              </div>

              <div className="w-full bg-white border-2 border-[#20284D] rounded-[20px] shadow-lg p-6 md:p-8 lg:p-10 min-h-[180px] flex items-center justify-center group-hover:border-[#AA9554] transition-colors duration-300">
                <p className="font-bold text-lg md:text-xl lg:text-[20px] text-center text-[#20284D] group-hover:text-[#AA9554] transition-colors duration-300">
                  {t(`items.${service.key}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
