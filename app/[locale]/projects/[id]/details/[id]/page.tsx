'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import RegisterModal from '@/components/RegisterModal';
import ThankYouModal from '@/components/ThankYouModal';
import ContactModal from '@/components/ContactModal';
import LocationModal from '@/components/LocationModal';
import { MapPin } from 'lucide-react';

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
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function UnitDetails() {
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const params = useParams();
  
  const id = params?.unitId;

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const response = await fetch(`http://localhost:8080/unit/getunit/${id}`);
        const data = await response.json();
        setUnit(data.unit);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching unit:', error);
        setLoading(false);
      }
    };

    fetchUnit();
  }, [id]);

  const handleRegistrationSuccess = () => {
    setIsRegisterOpen(false);
    setIsThankYouOpen(true);
  };

  if (loading || !unit) {
    return <div>Loading...</div>;
  }

  return (
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
          {/* Your existing grid content */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={unit.images[activeImage]?.secure_url}
                alt={unit.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto">
              {unit.images.map((image, index) => (
                <button
                  key={image._id}
                  onClick={() => setActiveImage(index)}
                  className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden ${
                    activeImage === index ? 'ring-2 ring-[#AA9554]' : ''
                  }`}
                >
                  <Image
                    src={image.secure_url}
                    alt={`${unit.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Your existing details content */}
          </div>
        </div>

        {/* Register Interest Button */}
        <div className="flex justify-center mt-12 mb-16">
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-white border-2 border-[#20284D] text-[#20284D] hover:bg-[#AA9554] hover:text-white transition-colors duration-300 rounded-[10px] px-8 py-3 text-[20px] font-bold"
          >
            سجل اهتمامك
          </button>
        </div>

        {/* Location and Contact Section */}
        <div className="flex flex-col items-start mb-16">
          <button
            onClick={() => setIsLocationOpen(true)}
            className="bg-white mb-4 px-6 py-3 rounded-lg border-2 border-[#20284D] flex items-center gap-3 hover:bg-gray-50 transition-colors group mr-auto"
          >
            <MapPin className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[#20284D]">عرض الموقع في الخريطة</span>
          </button>

          {/* Contact Section */}
          <Contact />
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
        unitId={unit._id}
        categoryId={unit.type}
      />
      <ThankYouModal 
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />
      <LocationModal 
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}

