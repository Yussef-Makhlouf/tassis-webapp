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
  nearbyPlaces: [{ place: string, timeInMinutes: number }];
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
            ? `https://tasis-al-bina.onrender.com/unit/getAllUnitByCategoryIdAR/${categoryId}`
            : `https://tasis-al-bina.onrender.com/unit/getAllUnitByCategoryIdEN/${categoryId}`),
          fetch(`https://tasis-al-bina.onrender.com/category/getOne/${categoryId}`)
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

  if (loading) {
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

          <div className="flex flex-col md:flex-column justify-between items-start gap-8 mb-12">
            <div className="flex flex-col gap-3 text-[#20284D] text-[18px]">
              <div className="flex items-center gap-2">
                <Image src="/sizes/location1.png" alt={t('location')} width={20} height={20} />
                <span>{category?.location}</span>
              </div>
              <div className="flex items-center gap-2 ">
                <Image src="/sizes/location2.png" alt={t('area')} width={30} height={30} />
                <span className="text-[18px]">{t('area')} {category?.area} {t('areaUnit')}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-[#20284D] text-[18px]">
              <div className="flex items-center gap-2">
                <h5>{t('projectDescription')}:</h5>
              </div>
            </div>
            <div className="text-[#20284D] text-[18px]  p-6 border-2 border-[#20284D] rounded-lg shadow-md w-full">
              <p className="leading-relaxed">{category?.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {units.map((unit) => (
              <div key={unit._id} className={`relative bg-white border-2 border-[#20284D] shadow-lg overflow-hidden transition-transform duration-300 
              ${(unit.status === 'Sold' || unit.status === 'مباع' || unit.status === 'Rented' || unit.status === 'مؤجر' || unit.status === 'Unavailable' || unit.status === 'غير متاح' || unit.status === 'Reserved' || unit.status === 'محجوز')
                  ? 'opacity-90 pointer-events-none'
                  : 'hover:scale-[1.02]'}`}>

                <div className="relative h-[322px] border-b-2 border-[#20284D]">
                  <Image
                    src={unit.images[0].secure_url}
                    alt={unit.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />

                  {(() => {
                    switch (unit.status) {
                      case 'Sold':
                      case 'مباع':
                        return (
                          <>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <Image
                                src="/sizes/sold.png"
                                alt="Sold"
                                width={180}
                                height={180}
                                className="object-contain transform scale-125"
                              />
                            </div>
                          </>
                        );
                      case 'Rented':
                      case 'مؤجر':
                        return (
                          <>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <Image
                                src="/sizes/hagz.png"
                                alt="Rented"
                                width={180}
                                height={180}
                                className="object-contain transform scale-125"
                              />
                            </div>
                          </>
                        );
                      case 'Available for sale':
                      case 'متاح للبيع':
                        return (
                          <div className="absolute top-4 left-4 px-6 py-2  bg-emerald-500  text-white  font-bold text-[18px] shadow-lg">
                        {unit.status}
                          </div>
                        );
                      case 'Available for rent':
                      case 'متاح للإيجار':
                        return (
                          <div className="absolute top-4 left-4 px-6 py-2 -2 bg-[#AA9554]  text-white  font-bold text-[18px] shadow-lg">
                           {unit.status}
                          </div>
                        );
                      case 'Reserved':
                      case 'محجوز':
                        return (
                          <>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                              <Image
                                src="/sizes/hagz.png"
                                alt="Rented"
                                width={180}
                                height={180}
                                className="object-contain transform scale-125"
                              />
                            </div>
                          </>
                        );
                      case 'Unavailable':
                      case 'غير متاح':
                        return (
                          <div className="absolute top-4 left-4 px-6 py-2  bg-[#AA9554]  text-gray-500  font-bold text-[18px] shadow-lg">
                            {unit.status}
                          </div>
                        );
                      default:
                        return (
                          <div className="absolute top-4 left-4 px-6 py-2  bg-emerald-500 text-[#20284D] font-bold text-[18px] shadow-lg">
                            {unit.status}
                          </div>
                        );
                    }
                  })()}
                </div>

                {/* Rest of the card content */}
                <div className="p-6">
                  <h2 className="text-[#20284D] text-[25px] font-bold text-center mb-6">
                    {unit.title}
                  </h2>
                  {/* Features section */}
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

                  {/* Price and CTA section */}
                  <div className="flex flex-row-reverse items-center justify-between gap-4">
                    {!(unit.status === 'Sold' || unit.status === 'مباع') && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#20284D] text-[24px] font-bold">{unit.price}</span>
                        <span className="text-[#20284D] text-[16px]">{t('currency')}</span>
                      </div>
                    )}
                    
                    <Link
                      href={`projects/${unit._id}`}
                      className="flex-1 py-4 border-2 border-[#AA9554] text-[#AA9554] font-bold text-[20px] rounded-xl hover:bg-[#AA9554] hover:text-white transition-colors duration-300 text-center"
                    >
                      {t('viewDetails')}
                    </Link>
                  </div>
                </div>
                <div className="text-[#20284D] text-[14px] italic bg-gray-100 px-2 py-1 rounded-md ml-2">* غير شامل الضريبة</div>

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
