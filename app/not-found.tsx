import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-8">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/Group.svg"
            alt="تأسيس البناء"
            fill
            className="object-contain"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-[#20284D]">404</h1>
        <h2 className="text-2xl font-semibold text-[#AA9554]">عذراً، الصفحة غير موجودة</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>
        
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-[#20284D] text-[#AA9554] rounded-full font-medium hover:bg-opacity-90 transition-all duration-300"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}
