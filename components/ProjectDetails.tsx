'use client'
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

const projectImages = [
  {
    src: '/project-thumb-1.jpg',
    title: 'عرض المخططات الخارجية',
    description: 'وصف مختصر للمخطط الخارجي'
  },
  {
    src: '/project-thumb-2.jpg',
    title: 'عرض المخططات الداخلية',
    description: 'وصف مختصر للمخطط الداخلي'
  },
  {
    src: '/project-thumb-3.jpg',
    title: 'عرض المخططات الهندسية',
    description: 'وصف مختصر للمخطط الهندسي'
  }
];

export default function ProjectDetails() {
  return (
    <main className="pt-24 bg-white"> {/* Added padding-top for navbar */}
      <div className="container mx-auto px-4 py-8 dir-rtl">
        {/* Main Project Image */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8">
          <Image
            src="/project-main.jpg"
            alt="صورة المشروع الرئيسية"
            fill
            className="object-cover"
          />
        </div>

        {/* Project Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {projectImages.map((image, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold text-[#20284D] mb-2">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[#20284D] mb-6">أفضل فرصة للتملك في الرياض</h2>
            <p className="text-gray-700 leading-relaxed">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي
              {/* Add your text content */}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#20284D] mb-6">مميزات شركة التمليك</h2>
            <p className="text-gray-700 leading-relaxed">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي
              {/* Add your text content */}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#20284D] mb-6">خيارات التمويل</h2>
            <p className="text-gray-700 leading-relaxed">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربي
              {/* Add your text content */}
            </p>
          </section>
        </div>

        {/* Contact Form */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-[#20284D] text-center mb-12">تواصل معنا</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="رقم الجوال"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="ملاحظات"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <button className="w-full bg-[#20284D] text-white py-3 rounded-lg hover:bg-[#2a3461] transition-colors">
                  إرسال
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/map.jpg"
                alt="موقعنا على الخريطة"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 