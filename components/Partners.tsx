
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const partners1 = [
  { id: 1, image: '/jotun.png', key: 'jotun' },
  { id: 2, image: '/image-1.png', key: 'partner2' },
  { id: 3, image: '/sabk.png', key: 'sabic' },
  { id: 4, image: '/image-2.png', key: 'rajhiSteel' },
  { id: 5, image: '/image-3.png', key: 'elevators' },
  { id: 6, image: '/image-1.png', key: 'grohe' },
  { id: 7, image: '/image-8.png', key: 'partner7' },
  { id: 1, image: '/jotun.png', key: 'jotun' },
  { id: 8, image: '/image-6.png', key: 'tamweel' },
  { id: 9, image: '/image-7.png', key: 'dalton' },
  { id: 10, image: '/image-1.png', key: 'realEstate' },
  { id: 11, image: '/image-9.png', key: 'partner11' },
  { id: 12, image: '/image-10.png', key: 'realty' },
  { id: 13, image: '/image.png', key: 'partner13' },
];

const partners2 = [
  { id: 8, image: '/image-6.png', key: 'tamweel' },
  { id: 9, image: '/image-7.png', key: 'dalton' },
  { id: 10, image: '/image-1.png', key: 'realEstate' },
  { id: 11, image: '/image-9.png', key: 'partner11' },
  { id: 12, image: '/image-10.png', key: 'realty' },
  { id: 13, image: '/image-8.png', key: 'partner13' },
  { id: 1, image: '/jotun.png', key: 'jotun' },
  { id: 2, image: '/image-1.png', key: 'partner2' },
  { id: 3, image: '/sabk.png', key: 'sabic' },
  { id: 4, image: '/image-2.png', key: 'rajhiSteel' },
  { id: 5, image: '/image-8.png', key: 'elevators' },
  { id: 6, image: '/image-1.png', key: 'grohe' },
  { id: 7, image: '/image-3.png', key: 'partner7' },
];

export default function Partners() {
  const t = useTranslations('partners');

  return (
    <section className="overflow-hidden bg-white" dir="ltr">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" dir="rtl">
          <h2 className="text-4xl font-bold text-[#20284D] mb-4">{t('title')}</h2>
          <div className="w-[224px] h-1 bg-[#AA9554] mx-auto shadow-md" />
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex">
            <div className="animate-marquee flex">
              {[...partners1, ...partners1].map((partner, idx) => (
                <div key={`${partner.id}-${idx}`} className=" mx-8 flex-shrink-0">
                  <Image
                    src={partner.image}
                    alt={t(`partners.${partner.key}`)}
                    width={150}
                    height={100}
                    className="object-cover"
                    style={{  border: '1px solid gray', borderRadius: '10px',padding: '4px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}  
                    loading='lazy'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-full mt-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex">
            <div className="animate-marquee-reverse flex">
              {[...partners2, ...partners2].map((partner, idx) => (
                <div key={`${partner.id}-${idx}`} className=" mx-8 flex-shrink-0">
                  <Image
                    src={partner.image}
                    alt={t(`partners.${partner.key}`)}
                    width={150}
                    height={100}
                    className="object-cover  mx-auto my-auto block max-w-full max-h-full" 
                    style={{  border: '1px solid gray', borderRadius: '10px',padding: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}  
                    loading='lazy'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
