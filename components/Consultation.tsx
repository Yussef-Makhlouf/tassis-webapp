export default function Consultation() {
  return (
    <div className="relative w-full py-16 md:py-20 lg:py-24 px-4">
      <div 
        className="max-w-[1306px] mx-auto bg-[#20284D]/90 rounded-[25px] md:rounded-[50px] py-12 md:py-16 lg:py-20"
      >
        <div className="flex flex-col items-center justify-center text-center px-4">
          {/* Title */}
          <h3 
            className="text-xl md:text-2xl lg:text-[25px] font-bold text-white mb-4 md:mb-6 lg:mb-8"
          >
            موعد الاستشارة العقارية
          </h3>

          {/* Main Question */}
          <h2 
            className="text-2xl md:text-3xl lg:text-[40px] font-bold text-white mb-8 md:mb-10 lg:mb-12 max-w-[669px] leading-normal md:leading-relaxed"
          >
            هل ترغب في استشارة عقارية عن بعد ؟
          </h2>

          {/* CTA Button */}
          <button 
            className="px-8 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 bg-white border-2 border-white rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 group"
          >
            <span className="text-xl md:text-2xl lg:text-[30px] font-bold text-[#20284D] group-hover:text-[#AA9554] transition-colors">
              لنبدأ
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 