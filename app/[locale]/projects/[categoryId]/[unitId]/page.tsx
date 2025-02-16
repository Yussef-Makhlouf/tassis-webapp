'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import ThankYouModal from '@/components/ThankYouModal';
import ContactModal from '@/components/ContactModal';
import LocationModal from '@/components/LocationModal';
import Contact from '@/components/Contact';
import ClientOnly from '@/components/ClientOnly';
import { useTranslations } from 'next-intl';
import { ArrowBigLeftIcon, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

interface Unit {
  _id: string;
  title: string;
  type: string;
  area: number;
  price: number;
  description: string;
  rooms: number;
  elevators: number;
  images: {
    secure_url: string;
    public_id: string;
    _id: string;
  }[];
  bathrooms: number;
  parking: number;
  guard: number;
  livingrooms: number;
  waterTank: number;
  maidRoom: number;
  status: string;
  cameras: number;
  nearbyPlaces: {
    place: string;
    timeInMinutes: number;
    _id: string;
  }[];
  location: string;
  floor: number;
  categoryId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
// Add this interface at the top with other interfaces



const ProjectPage = ({ params }: { params: { unitId: string } }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const t = useTranslations('unitDetails');

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const response = await fetch(`http://localhost:8080/unit/getunit/${params.unitId}`);

        const data = await response.json();
        const { latitude, longitude } = data.returnedData.unit.coordinates;
        const googleMapsLink = `https://www.google.com/maps/place/${latitude},${longitude}`;

        console.log(data);
        setUnit(data.returnedData.unit);

        console.log("categoryId", data.unit.categoryId);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching unit:', error);
        setLoading(false);
      }
    };


    fetchUnit();
  }, [params.unitId]);

  const handleImageChange = (direction: 'next' | 'prev'): void => {
    if (!unit?.images.length) return;

    if (direction === 'next') {
      setCurrentImage((prev) => (prev + 1) % unit.images.length);
    } else {
      setCurrentImage((prev) => (prev - 1 + unit.images.length) % unit.images.length);
    }
  };



  const handleRegistrationSuccess = () => {
    setIsRegisterOpen(false);
    setIsThankYouOpen(true);
  };




  if (loading || !unit) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>


      </div>
    )
  }


  const features = [
    { icon: "/project/image-4.png", label: t('features.guard'), value: unit.guard.toString() },
    { icon: "/project/image-3.png", label: t('features.maidRoom'), value: unit.maidRoom.toString() },
    { icon: "/project/image-1.png", label: t('features.bathrooms'), value: unit.bathrooms.toString() },
    { icon: "/project/image-9.png", label: t('features.rooms'), value: unit.rooms.toString() },
    { icon: "/project/image.png", label: t('features.area'), value: `${unit.area} ${t('features.areaUnit')}` },
    { icon: "/project/image-5.png", label: t('features.cameras'), value: unit.cameras.toString() },
    { icon: "/project/image-8.png", label: t('features.elevator'), value: unit.elevators.toString() },
    { icon: "/project/image-7.png", label: t('features.parking'), value: unit.parking.toString() },
    { icon: "/project/image-6.png", label: t('features.waterTank'), value: unit.waterTank.toString() },
    { icon: "/project/image-2.png", label: t('features.livingRoom'), value: unit.livingrooms.toString() },
  ];

  return (
    <ClientOnly>
      <main className="min-h-screen bg-white font-Cairo">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1314px]">
          <div className="relative text-center mb-8 sm:mb-12">
            <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[#20284D] leading-normal md:leading-[75px] mt-[100px] sm:mt-[150px] md:mt-[223px]">
              {unit.title}
            </h1>
            <div className="w-[200px] sm:w-[300px] md:w-[368px] h-[4px] bg-[#AA9554] mx-auto mt-[10px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[487px_759px] gap-6 lg:gap-[68px] mb-8 sm:mb-12">
            <div className="flex flex-col gap-4 order-2 lg:order-1">
              <div className="bg-white rounded-[10px] p-4 sm:p-6 border-2 border-[#20284D]">
                <p className="text-[18px] sm:text-[22px] md:text-[25px] leading-relaxed md:leading-[47px] text-right font-semibold mb-6 sm:mb-8 text-[#20284D]">
                  {unit.description}
                </p>

                <div className="w-full h-[2px] bg-[#AA9554] my-6 sm:my-8" />

                <div className="flex justify-between items-center flex-wrap gap-4">
                  {unit.nearbyPlaces.slice(0, 3).map((place, index) => (
                    <div key={index} className="text-center flex-1 min-w-[100px]">
                      <span className="block text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#20284D] leading-tight">
                 {place.timeInMinutes} دقائق
                      </span>
                      <span className="text-[14px] sm:text-[16px] font-bold text-[#20284D]">
                        {place.place}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-full h-[2px] bg-[#AA9554] my-6 sm:my-8" />

                <div className="text-center">
                  <p className="text-[24px] sm:text-[28px] md:text-[30px] font-bold text-[#20284D] leading-tight">
                    {t('price')}: {unit.price} {t('currency')}
                  </p>
                </div>
              </div>



              <div className="bg-white rounded-[10px] p-4 sm:p-8 border-2 border-[#20284D] order-1 lg:order-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-3 sm:gap-x-4 gap-y-8 sm:gap-y-16">
                  {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-[90px] h-[90px] mb-[10px]">
                        <Image
                          src={feature.icon}
                          alt={feature.label}
                          width={90}
                          height={90}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[16px] font-bold text-[#20284D] leading-[30px]">{feature.label}</span>
                      {feature.value && (
                        <span className="text-[16px] font-bold text-[#20284D] leading-[30px]">{feature.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image gallery section */}
            <div className="text-center mb-8 sm:mb-16">
              <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[#20284D] leading-normal md:leading-[75px]">
                 {t('projectImages')}
              </h2>
              <div className="w-[150px] sm:w-[200px] md:w-[231px] h-[4px] bg-[#AA9554] mx-auto mb-8" />

              <div className="relative mb-6">
                <div className="relative px-4 sm:px-[50px]">
                  <Image
                    src={unit.images[currentImage].secure_url}
                    alt="Project Image"
                    width={1314}
                    height={596}
                    className="rounded-[20px] sm:rounded-[30px]"
                  />
                  <button
                    onClick={() => handleImageChange('prev')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <ArrowLeftCircle />

                  </button>
                  <button
                    onClick={() => handleImageChange('next')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
                  >
                    <ArrowRightCircle />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
                {unit.images.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-[15px] sm:rounded-[30px] cursor-pointer overflow-hidden border ${currentImage === index ? 'border-[#AA9554]' : 'border-[#20284D]'
                      }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <Image
                      src={image.secure_url}
                      alt={`Thumbnail ${index + 1}`}
                      width={202}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* After the image gallery section */}
            <div className="flex justify-center mt-12 mb-16">
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="bg-white border-2 border-[#20284D] text-[#20284D] hover:bg-[#AA9554] hover:text-white transition-colors duration-300 rounded-[10px] px-8 py-3 text-[20px] font-bold"
              >
                 {t('registerInterest')}
              </button>
            </div>

            <div className="flex flex-col items-start mb-16">
              <button
                onClick={() => setIsLocationOpen(true)}
                className="bg-white mb-4 px-6 py-3 rounded-lg border-2 border-[#20284D] flex items-center gap-3 hover:bg-gray-50 transition-colors group mr-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20284D" className="w-6 h-6 group-hover:scale-110 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="font-bold text-[#20284D]">عرض الموقع في الخريطة</span>
              </button>

              <div className="w-full bg-white rounded-[10px] p-6 border-2 border-[#20284D]">
                <h2 className="text-2xl font-bold text-[#20284D] mb-6">تواصل معنا</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <a
                    href="tel:0558880867"
                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-[#20284D] hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#20284D]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20284D" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#20284D]"> {t('callUs')}</h4>
                      <p className="text-gray-600">0558880867</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/966558880867"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-[#20284D] hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#20284D]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#20284D" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#20284D]">{t('whatsapp')}</h4>
                      <p className="text-gray-600">0558880867</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@tasisalbina.com"
                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-[#20284D] hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#20284D]/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#20284D" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#20284D]"> {t('email')}</h4>
                      <p className="text-gray-600">info@tasisalbina.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
     </div>
          </div>
          <Contact />
          <Footer />

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onSuccess={handleRegistrationSuccess}
            unitId={params.unitId}
            categoryId={unit?.categoryId || ''}
          />

          <ThankYouModal
            isOpen={isThankYouOpen}
            onClose={() => setIsThankYouOpen(false)}
          />

          <LocationModal unitId={params.unitId} isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} />
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>
    </ClientOnly>
  );
};

export default ProjectPage;